'use client';

import Link from 'next/link';
import { useState } from 'react';

import { TPrompt } from '@/shared/types/prompt';
import { Breadcrumbs } from '@/widgets/Breadcrumbs/Breadcrumbs';

import styles from './PromptDetail.module.css';

type TPromptDetailProps = {
  prompt: TPrompt;
};

export function PromptDetail({ prompt }: TPromptDetailProps) {
  const [copyStatus, setCopyStatus] = useState('');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt.prompt);
      setCopyStatus('Промпт скопирован в буфер обмена');
    } catch {
      setCopyStatus('Не удалось скопировать промпт');
    }
  };

  return (
    <section className="pageSection">
      <div className="container">
        <Breadcrumbs />

        <article className={styles.layout}>
          <div className={styles.content}>
            <span className="badge">{prompt.categoryLabel}</span>
            <h1>{prompt.title}</h1>
            <p className={styles.description}>{prompt.description}</p>

            <div className={styles.tags} aria-label="Теги промпта">
              {prompt.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>

            <div className={styles.promptBlock}>
              <div className={styles.promptHeader}>
                <h2>Текст промпта</h2>
                <button type="button" onClick={handleCopy}>
                  Скопировать
                </button>
              </div>
              <pre>{prompt.prompt}</pre>
              {copyStatus ? (
                <p className={styles.copyStatus} role="status" aria-live="polite">
                  {copyStatus}
                </p>
              ) : null}
            </div>
          </div>

          <aside className={styles.sidebar}>
            <div className={styles.sideCard}>
              <h2>Переменные</h2>
              <p className={styles.sideText}>
                Это поля, которые можно заменить перед использованием шаблона.
                Двойные фигурные скобки помогают быстро найти такие места в тексте.
              </p>
              <ul>
                {prompt.variables.map((variable) => (
                  <li key={variable}>{`{{${variable}}}`}</li>
                ))}
              </ul>
            </div>

            <div className={styles.sideCard}>
              <h2>Следующие шаги</h2>
              <div className={styles.actions}>
                <Link className="primaryLink" href="/profile/templates/new">
                  Создать свой шаблон
                </Link>
                <Link className="secondaryLink" href="/catalog">
                  Вернуться в каталог
                </Link>
              </div>
            </div>
          </aside>
        </article>
      </div>
    </section>
  );
}
