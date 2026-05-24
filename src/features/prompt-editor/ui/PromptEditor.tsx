'use client';

import { memo, useCallback, useEffect, useRef } from 'react';

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

export const PromptEditor = memo(function PromptEditor({
  id,
  label,
  value,
  error,
  onChange,
}: TPromptEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const nextCursorPositionRef = useRef<number | null>(null);

  useEffect(() => {
    const cursorPosition = nextCursorPositionRef.current;

    if (cursorPosition === null) return;

    textareaRef.current?.focus();
    textareaRef.current?.setSelectionRange(cursorPosition, cursorPosition);
    nextCursorPositionRef.current = null;
  }, [value]);

  const insertSnippet = useCallback(
    (snippet: string) => {
      const textarea = textareaRef.current;
      const selectionStart = textarea?.selectionStart ?? value.length;
      const selectionEnd = textarea?.selectionEnd ?? value.length;
      const beforeSelection = value.slice(0, selectionStart);
      const afterSelection = value.slice(selectionEnd);
      const needsSeparator = beforeSelection.length > 0 && !beforeSelection.endsWith('\n');
      const prefix = needsSeparator ? '\n\n' : '';
      const nextValue = `${beforeSelection}${prefix}${snippet}${afterSelection}`;

      nextCursorPositionRef.current = selectionStart + prefix.length + snippet.length;
      onChange(nextValue);
    },
    [onChange, value]
  );

  return (
    <div className={styles.editor}>
      <div className={styles.header}>
        <label htmlFor={id}>{label}</label>
        <span>{value.length} символов</span>
      </div>

      <div className={styles.toolbar} aria-label="Быстрые вставки редактора">
        {snippets.map((snippet) => (
          <button key={snippet.label} type="button" onClick={() => insertSnippet(snippet.value)}>
            {snippet.label}
          </button>
        ))}
      </div>

      <textarea
        aria-describedby={error ? `${id}-error` : undefined}
        aria-invalid={Boolean(error)}
        className={styles.textarea}
        id={id}
        name={id}
        placeholder="Опишите роль модели, контекст, задачу и формат ответа"
        ref={textareaRef}
        rows={14}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />

      {error ? (
        <p className={styles.error} id={`${id}-error`} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
});
