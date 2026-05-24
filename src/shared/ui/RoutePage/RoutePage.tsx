import Link from 'next/link';

import { Breadcrumbs } from '@/widgets/Breadcrumbs/Breadcrumbs';

import styles from './RoutePage.module.css';

type TAction = {
  href: string;
  label: string;
  variant?: 'primary' | 'secondary';
};

type TRoutePageProps = {
  badge?: string;
  title: string;
  description: string;
  contentTitle?: string;
  contentItems?: string[];
  entryPoints?: string[];
  exitPoints?: TAction[];
};

export function RoutePage({
  badge,
  title,
  description,
  contentTitle = 'Основной контент',
  contentItems = [],
  entryPoints = [],
  exitPoints = [],
}: TRoutePageProps) {
  return (
    <section className="pageSection">
      <div className="container">
        <Breadcrumbs />

        <div className={styles.hero}>
          <div className={styles.heroContent}>
            {badge ? <span className="badge">{badge}</span> : null}
            <h1>{title}</h1>
            <p>{description}</p>

            {exitPoints.length > 0 ? (
              <div className={styles.actions}>
                {exitPoints.map((action) => (
                  <Link
                    className={
                      action.variant === 'primary' ? 'primaryLink' : 'secondaryLink'
                    }
                    href={action.href}
                    key={`${action.href}-${action.label}`}
                  >
                    {action.label}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>

          <div className={styles.summaryCard}>
            <p className={styles.summaryLabel}>Статус раздела</p>
            <h2>Каркас страницы готов</h2>
            <p>
              На следующих этапах здесь появятся формы, поиск, редактор,
              избранное, тесты и оптимизация.
            </p>
          </div>
        </div>

        <div className={styles.grid}>
          <article className={styles.card}>
            <h2>{contentTitle}</h2>
            <ul>
              {contentItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className={styles.card}>
            <h2>Точки входа</h2>
            <ul>
              {entryPoints.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
