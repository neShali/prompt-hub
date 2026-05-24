import { RoutePage } from '@/shared/ui/RoutePage/RoutePage';

type TPromptDetailsPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function PromptDetailsPage({ params }: TPromptDetailsPageProps) {
  const { slug } = await params;

  return (
    <RoutePage
      badge="Детальная страница"
      title="Страница промпта"
      description={`Здесь пользователь изучает выбранный промпт, копирует его, смотрит описание, переменные и связанные шаблоны. Текущий slug: ${slug}.`}
      contentItems={[
        'название промпта',
        'описание',
        'текст промпта',
        'переменные',
        'категория',
        'кнопка копирования',
        'кнопка добавления в избранное',
      ]}
      entryPoints={[
        'каталог промптов',
        'страница поиска',
        'избранное',
        'публичная ссылка на шаблон',
      ]}
      exitPoints={[
        { href: '/catalog', label: 'Вернуться в каталог', variant: 'primary' },
        { href: '/profile/favorites', label: 'Перейти в избранное' },
      ]}
    />
  );
}
