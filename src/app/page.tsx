import Link from 'next/link';

import styles from './page.module.css';

const featureCards = [
  {
    title: 'Каталог промптов',
    description: 'Поиск готовых шаблонов по задачам, категориям и сценариям.',
    href: '/catalog',
  },
  {
    title: 'Редактор промптов',
    description: 'Создание собственных шаблонов с подсветкой структуры.',
    href: '/profile/templates/new',
  },
  {
    title: 'База знаний',
    description: 'Материалы по форматированию, переменным и техникам промптинга.',
    href: '/knowledge',
  },
  {
    title: 'Избранное',
    description: 'Сохранение полезных шаблонов в личном кабинете.',
    href: '/profile/favorites',
  },
];

export default function HomePage() {
  return (
    <section className="pageSection">
      <div className="container">
        <div className={styles.hero}>
          <div className={styles.heroText}>
            <span className="badge">Сервис для работы с языковыми моделями</span>
            <h1>Создавайте, улучшайте и сохраняйте промпты в одном пространстве</h1>
            <p>
              PromptHub помогает изучать техники промпт-инжиниринга, находить
              готовые шаблоны, создавать собственные промпты и возвращаться к
              лучшим решениям в ежедневной работе.
            </p>

            <div className={styles.actions}>
              <Link className="primaryLink" href="/catalog">
                Перейти в каталог
              </Link>
              <Link className="secondaryLink" href="/profile/templates/new">
                Создать шаблон
              </Link>
            </div>
          </div>

          <div className={styles.previewCard}>
            <div className={styles.previewTop}>
              <span>Prompt structure</span>
              <span>Draft</span>
            </div>

            <div className={styles.promptPreview}>
              <p>## Role</p>
              <p>Ты — эксперт по структурированию идей.</p>
              <p>## Task</p>
              <p>Собери промпт для задачи: {'{{goal}}'}</p>
              <p>## Format</p>
              <p>Верни ответ в виде понятного плана.</p>
            </div>
          </div>
        </div>

        <div className={styles.cards}>
          {featureCards.map((card) => (
            <Link className={styles.card} href={card.href} key={card.href}>
              <h2>{card.title}</h2>
              <p>{card.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
