import Link from 'next/link';

import { knowledgeArticles } from '@/shared/content/articles';
import { Breadcrumbs } from '@/widgets/Breadcrumbs/Breadcrumbs';

import styles from './knowledge.module.css';

export default function KnowledgePage() {
  return (
    <section className="pageSection">
      <div className="container">
        <Breadcrumbs />

        <div className={styles.hero}>
          <div>
            <span className="badge">База знаний</span>
            <h1>Практические материалы по промптам</h1>
            <p>
              Короткие статьи помогают быстрее разобраться со структурой шаблонов,
              переменными, форматами ответа и проверкой качества промпта.
            </p>
          </div>
          <Link className="primaryLink" href="/profile/templates/new">
            Создать шаблон
          </Link>
        </div>

        <div className={styles.grid}>
          {knowledgeArticles.map((article) => (
            <article className={styles.card} key={article.id}>
              <div className={styles.meta}>
                <span>{article.level}</span>
                <span>{article.readingTime}</span>
              </div>
              <h2>{article.title}</h2>
              <p>{article.description}</p>
              <div className={styles.tags} aria-label="Темы статьи">
                {article.topics.map((topic) => (
                  <span key={topic}>{topic}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
