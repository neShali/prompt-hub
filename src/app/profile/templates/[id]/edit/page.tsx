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
          На этой странице можно обновить название, описание, категорию,
          переменные и текст уже созданного шаблона.
        </p>
      </div>

      <div className={styles.content}>
        <EditTemplateFormLoader templateId={id} />
      </div>
    </section>
  );
}
