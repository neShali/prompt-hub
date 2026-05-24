'use client';

import { memo, UIEvent, useCallback, useEffect, useMemo, useRef } from 'react';

import {
  getPromptSyntaxSegments,
  getPromptSyntaxTypes,
  getVariablesFromPrompt,
  type TPromptSyntaxType,
} from '@/shared/lib/prompt-syntax/promptSyntax';

import styles from './PromptEditor.module.css';

type TPromptEditorProps = {
  id: string;
  label: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
};

const snippets = [
  { label: 'Заголовок', value: '## Heading' },
  { label: 'Переменная', value: '{{variable}}' },
  { label: 'XML-тег', value: '<context></context>' },
  { label: 'Разделитель', value: '—' },
  { label: 'Стрелка', value: '→ следующий шаг' },
  { label: 'Декоратор', value: '+++Format' },
] as const;

const syntaxLabels: Record<TPromptSyntaxType, string> = {
  heading: 'заголовки',
  separator: 'разделители',
  flowArrow: 'стрелки потока',
  xmlTag: 'XML-теги',
  variable: 'переменные',
  capsAccent: 'акценты CAPS',
  metaGlyph: 'MetaGlyph',
  inlineCode: 'инлайн-код',
  jsonPair: 'JSON-пары',
  decorator: 'декораторы',
};

const getSegmentClassName = (type?: TPromptSyntaxType) => {
  if (!type) return undefined;

  return `${styles.syntaxToken} ${styles[type]}`;
};

export const PromptEditor = memo(function PromptEditor({
  id,
  label,
  value,
  error,
  onChange,
}: TPromptEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const highlightRef = useRef<HTMLPreElement | null>(null);
  const nextCursorPositionRef = useRef<number | null>(null);
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;

  const syntaxSegments = useMemo(() => getPromptSyntaxSegments(value), [value]);
  const syntaxTypes = useMemo(() => getPromptSyntaxTypes(value), [value]);
  const variables = useMemo(() => getVariablesFromPrompt(value), [value]);
  const visibleSyntaxTypes = useMemo(() => {
    if (variables.length === 0 || syntaxTypes.includes('variable')) {
      return syntaxTypes;
    }

    return [...syntaxTypes, 'variable'] as TPromptSyntaxType[];
  }, [syntaxTypes, variables.length]);

  useEffect(() => {
    const cursorPosition = nextCursorPositionRef.current;

    if (cursorPosition === null) return;

    textareaRef.current?.focus();
    textareaRef.current?.setSelectionRange(cursorPosition, cursorPosition);
    nextCursorPositionRef.current = null;
  }, [value]);

  const syncScroll = useCallback((event: UIEvent<HTMLTextAreaElement>) => {
    if (!highlightRef.current) return;

    highlightRef.current.scrollTop = event.currentTarget.scrollTop;
    highlightRef.current.scrollLeft = event.currentTarget.scrollLeft;
  }, []);

  const insertSnippet = useCallback(
    (snippet: string) => {
      const textarea = textareaRef.current;
      const selectionStart = textarea?.selectionStart ?? value.length;
      const selectionEnd = textarea?.selectionEnd ?? value.length;
      const beforeSelection = value.slice(0, selectionStart);
      const afterSelection = value.slice(selectionEnd);
      const needsSeparator =
        beforeSelection.length > 0 && !beforeSelection.endsWith('\n');
      const prefix = needsSeparator ? '\n\n' : '';
      const nextValue = `${beforeSelection}${prefix}${snippet}${afterSelection}`;

      nextCursorPositionRef.current =
        selectionStart + prefix.length + snippet.length;
      onChange(nextValue);
    },
    [onChange, value],
  );

  return (
    <div className={styles.editor}>
      <div className={styles.header}>
        <label htmlFor={id}>{label}</label>
        <span>{value.length} символов</span>
      </div>

      <p className={styles.hint} id={hintId}>
        Пишите промпт прямо в редакторе. Заголовки, переменные, XML-теги,
        стрелки, JSON-пары и декораторы подсвечиваются в тексте во время ввода.
      </p>

      <div className={styles.toolbar} aria-label="Быстрые вставки редактора">
        {snippets.map((snippet) => (
          <button
            key={snippet.label}
            type="button"
            onClick={() => insertSnippet(snippet.value)}
          >
            {snippet.label}
          </button>
        ))}
      </div>

      <div className={styles.editorSurface}>
        <pre
          aria-hidden="true"
          className={styles.highlightLayer}
          ref={highlightRef}
        >
          {syntaxSegments.length ? (
            syntaxSegments.map((segment, index) => (
              <span
                className={getSegmentClassName(segment.type)}
                key={`${segment.value}-${index}`}
              >
                {segment.value}
              </span>
            ))
          ) : (
            <span className={styles.placeholder}>
              Опишите роль модели, контекст, задачу и формат ответа
            </span>
          )}
          {'\n'}
        </pre>

        <textarea
          aria-describedby={error ? `${hintId} ${errorId}` : hintId}
          aria-invalid={Boolean(error)}
          className={styles.textarea}
          id={id}
          name={id}
          placeholder="Опишите роль модели, контекст, задачу и формат ответа"
          ref={textareaRef}
          rows={16}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onScroll={syncScroll}
        />
      </div>

      {error ? (
        <p className={styles.error} id={errorId} role="alert">
          {error}
        </p>
      ) : null}

      <aside
        className={styles.analysisCard}
        aria-label="Проверка структуры шаблона"
      >
        <div className={styles.analysisGroup}>
          <strong>Найдены элементы</strong>
          {visibleSyntaxTypes.length > 0 ? (
            <ul>
              {visibleSyntaxTypes.map((type) => (
                <li
                  className={`${styles.analysisChip} ${styles[type]}`}
                  key={type}
                >
                  {syntaxLabels[type]}
                </li>
              ))}
            </ul>
          ) : (
            <p>Добавьте структуру и переменные, чтобы проверить оформление.</p>
          )}
        </div>

        <div className={styles.analysisGroup}>
          <strong>Переменные</strong>
          {variables.length > 0 ? (
            <ul>
              {variables.map((variable) => (
                <li
                  className={`${styles.analysisChip} ${styles.variable}`}
                  key={variable}
                >
                  {`{{${variable}}}`}
                </li>
              ))}
            </ul>
          ) : (
            <p>Переменные пока не указаны.</p>
          )}
        </div>
      </aside>
    </div>
  );
});
