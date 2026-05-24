import Link from 'next/link';
import { memo } from 'react';

import { TPrompt } from '@/shared/types/prompt';

import styles from './PromptCard.module.css';

type TPromptCardProps = {
  prompt: TPrompt;
};

export const PromptCard = memo(function PromptCard({ prompt }: TPromptCardProps) {
  return (
    <Link
      aria-label={`Открыть шаблон: ${prompt.title}`}
      className={styles.card}
      href={`/catalog/${prompt.slug}`}
    >
      <article className={styles.content}>
        <div className={styles.topLine}>
          <span className={styles.category}>{prompt.categoryLabel}</span>
          {prompt.isFeatured ? <span className={styles.featured}>Рекомендуемый</span> : null}
        </div>

        <h3 className={styles.title}>{prompt.title}</h3>
        <p className={styles.description}>{prompt.description}</p>

        <div className={styles.footer}>
          <div className={styles.tags} aria-label="Теги промпта">
            {prompt.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>

          <span className={styles.cta} aria-hidden="true">
            Открыть шаблон
          </span>
        </div>
      </article>
    </Link>
  );
});
