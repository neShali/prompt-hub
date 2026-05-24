import { TemplateForm } from '@/features/template-form/ui/TemplateForm';
import { Breadcrumbs } from '@/widgets/Breadcrumbs/Breadcrumbs';

import styles from '../templates-page.module.css';

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
