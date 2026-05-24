import Link from 'next/link';

import { researchNotes } from '@/shared/content/articles';
import { Breadcrumbs } from '@/widgets/Breadcrumbs/Breadcrumbs';

import styles from './research.module.css';

export default function ResearchPage() {
  return (
    <section className="pageSection">
      <div className="container">
        <Breadcrumbs />

        <div className={styles.hero}>
          <span className="badge">Исследования</span>
          <h1>Выводы для ежедневной работы с языковыми моделями</h1>
          <p>
            В этом разделе собраны заметки и практические наблюдения, которые помогают
            создавать более точные и воспроизводимые промпты.
          </p>
        </div>

        <div className={styles.list}>
          {researchNotes.map((note) => (
            <article className={styles.card} key={note.id}>
              <div>
                <h2>{note.title}</h2>
                <p>{note.description}</p>
              </div>
              <div className={styles.aside}>
                <span>{note.source}</span>
                <strong>{note.takeaway}</strong>
                <div className={styles.tags} aria-label="Темы исследования">
                  {note.topics.map((topic) => (
                    <span key={topic}>{topic}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.cta}>
          <h2>Примените выводы в собственном шаблоне</h2>
          <p>
            Сформулируйте роль модели, добавьте контекст и заранее задайте формат ответа.
          </p>
          <Link className="primaryLink" href="/profile/templates/new">
            Создать шаблон
          </Link>
        </div>
      </div>
    </section>
  );
}
