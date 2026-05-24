import Link from 'next/link';

import { PromptCard } from '@/entities/prompt/ui/PromptCard';
import { favoritePrompts } from '@/shared/content/favorites';
import { Breadcrumbs } from '@/widgets/Breadcrumbs/Breadcrumbs';

import styles from './Favorites.module.css';

export function Favorites() {
  return (
    <section>
      <Breadcrumbs />

      <div className={styles.header}>
        <div>
          <span className="badge">Избранное</span>
          <h1>Сохранённые промпты</h1>
          <p>
            Здесь собраны шаблоны, к которым удобно возвращаться при повторяющихся
            задачах. Откройте карточку, чтобы посмотреть текст промпта и переменные.
          </p>
        </div>

        <Link className="primaryLink" href="/catalog">
          Найти новые
        </Link>
      </div>

      {favoritePrompts.length > 0 ? (
        <div className={styles.grid}>
          {favoritePrompts.map((prompt) => (
            <PromptCard key={prompt.id} prompt={prompt} />
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <h2>Пока ничего не сохранено</h2>
          <p>Перейдите в каталог и выберите промпты, которые хотите сохранить.</p>
          <Link className="primaryLink" href="/catalog">
            Открыть каталог
          </Link>
        </div>
      )}
    </section>
  );
}
