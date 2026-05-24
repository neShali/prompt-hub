import { RoutePage } from '@/shared/ui/RoutePage/RoutePage';

export default function SearchPage() {
  return (
    <RoutePage
      badge="Поиск"
      title="Поиск по промптам"
      description="Страница результатов поиска. На следующем этапе здесь появятся GET-параметры, debounce, подсказки и восстановление состояния из URL."
      contentItems={[
        'поле поиска',
        'поисковые подсказки',
        'фильтры по категориям',
        'список найденных промптов',
        'состояния загрузки, ошибки и пустой выдачи',
      ]}
      entryPoints={[
        'главная страница',
        'header',
        'каталог промптов',
        'прямая ссылка с query-параметрами',
      ]}
      exitPoints={[
        { href: '/catalog', label: 'Открыть каталог', variant: 'primary' },
        { href: '/knowledge', label: 'Изучить базу знаний' },
      ]}
    />
  );
}
