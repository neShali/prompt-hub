import styles from './LoadingState.module.css';

type TLoadingStateProps = {
  title?: string;
  description?: string;
};

export function LoadingState({
  title = 'Загружаем данные',
  description = 'Подготавливаем содержимое страницы.',
}: TLoadingStateProps) {
  return (
    <section className="pageSection" aria-live="polite" aria-busy="true">
      <div className="container">
        <div className={styles.breadcrumbsSkeleton} aria-hidden="true">
          <span />
          <span />
          <span />
        </div>

        <div className={styles.card}>
          <div>
            <span className="badge">Загрузка</span>
            <h1>{title}</h1>
            <p>{description}</p>
          </div>

          <div className={styles.skeletonGrid} aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>
    </section>
  );
}
