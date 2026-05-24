import { RoutePage } from '@/shared/ui/RoutePage/RoutePage';

export default function FavoritesPage() {
  return (
    <RoutePage
      badge="Личный кабинет"
      title="Избранные промпты"
      description="Раздел, где пользователь хранит полезные промпты из публичного каталога."
      contentItems={[
        'список избранных промптов',
        'быстрый переход на детальную страницу',
        'удаление из избранного',
        'переход в каталог',
      ]}
      entryPoints={[
        'личный кабинет',
        'детальная страница промпта',
        'каталог после добавления в избранное',
      ]}
      exitPoints={[
        { href: '/catalog', label: 'Найти новые промпты', variant: 'primary' },
        { href: '/profile/templates', label: 'Мои шаблоны' },
      ]}
    />
  );
}
