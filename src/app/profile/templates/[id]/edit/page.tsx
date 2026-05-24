import { EditTemplateFormLoader } from '@/features/template-form/ui/EditTemplateFormLoader';
import { Breadcrumbs } from '@/widgets/Breadcrumbs/Breadcrumbs';

import styles from '../../templates-page.module.css';

type TEditTemplatePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditTemplatePage({ params }: TEditTemplatePageProps) {
  const { id } = await params;

  return (
    <section>
      <Breadcrumbs />

      <div className={styles.header}>
        <span className="badge">Редактирование</span>
        <h1>Редактирование шаблона</h1>
        <p>
          Страница использует ту же форму и схему валидации, что и создание шаблона.
          Если шаблон найден в localStorage, форма подставит сохранённые значения.
        </p>
      </div>

      <div className={styles.content}>
        <EditTemplateFormLoader templateId={id} />
      </div>
    </section>
  );
}
