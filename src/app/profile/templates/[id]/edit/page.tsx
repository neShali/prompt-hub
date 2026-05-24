import { RoutePage } from '@/shared/ui/RoutePage/RoutePage';

type TEditTemplatePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditTemplatePage({ params }: TEditTemplatePageProps) {
  const { id } = await params;

  return (
    <RoutePage
      badge="Редактор"
      title="Редактирование шаблона"
      description={`Страница редактирования существующего шаблона. На следующих этапах здесь появится форма с редактором промпта. Текущий id: ${id}.`}
      contentItems={[
        'форма редактирования',
        'текущие данные шаблона',
        'редактор промпта',
        'предпросмотр',
        'сохранение изменений',
      ]}
      entryPoints={[
        'мои шаблоны',
        'после создания шаблона',
        'личный кабинет',
      ]}
      exitPoints={[
        { href: '/profile/templates', label: 'Вернуться к шаблонам', variant: 'primary' },
        { href: '/catalog', label: 'Открыть каталог' },
      ]}
    />
  );
}
