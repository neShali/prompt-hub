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
          Заполните форму, добавьте структуру промпта и сохраните результат. Все поля
          проверяются на клиенте, а кнопка отправки активируется только при валидных
          данных.
        </p>
      </div>

      <div className={styles.content}>
        <TemplateForm mode="create" />
      </div>
    </section>
  );
}
