import dynamic from 'next/dynamic';

import { LoadingState } from '@/shared/ui/LoadingState/LoadingState';
import { Breadcrumbs } from '@/widgets/Breadcrumbs/Breadcrumbs';

import styles from '../templates-page.module.css';

const TemplateForm = dynamic(
  () => import('@/features/template-form/ui/TemplateForm').then((mod) => mod.TemplateForm),
  {
    loading: () => (
      <LoadingState
        title="Открываем форму"
        description="Подготавливаем поля шаблона, редактор и настройки публикации."
      />
    ),
  }
);

export default function NewTemplatePage() {
  return (
    <section>
      <Breadcrumbs />

      <div className={styles.header}>
        <span className="badge">Создание шаблона</span>
        <h1>Новый шаблон промпта</h1>
        <p>
          Добавьте название, описание, категорию и текст промпта. Подсказки помогут
          заполнить шаблон аккуратно и не пропустить важные части.
        </p>
      </div>

      <div className={styles.content}>
        <TemplateForm mode="create" />
      </div>
    </section>
  );
}
