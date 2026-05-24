import { RoutePage } from '@/shared/ui/RoutePage/RoutePage';

export default function CatalogPage() {
  return (
    <RoutePage
      badge="Публичный раздел"
      title="Каталог промптов"
      description="Раздел для поиска готовых шаблонов промптов по категориям, сценариям использования и ключевым словам."
      contentItems={[
        'карточки промптов',
        'категории',
        'фильтры',
        'поисковая строка',
        'кнопка добавления в избранное',
      ]}
      entryPoints={[
        'главная страница',
        'основная навигация в header',
        'страница результатов поиска',
        'детальная страница промпта',
      ]}
      exitPoints={[
        { href: '/search', label: 'Открыть поиск', variant: 'primary' },
        { href: '/profile/templates/new', label: 'Создать свой шаблон' },
      ]}
    />
  );
}
