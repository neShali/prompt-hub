import { RoutePage } from '@/shared/ui/RoutePage/RoutePage';

export default function KnowledgePage() {
  return (
    <RoutePage
      badge="Обучающий раздел"
      title="База знаний"
      description="Раздел с материалами о форматировании промптов, переменных, структуре запросов и практических техниках работы с языковыми моделями."
      contentItems={[
        'статьи',
        'примеры форматирования',
        'правила структуры промпта',
        'рекомендации по переменным',
        'ссылки на шаблоны',
      ]}
      entryPoints={[
        'главная страница',
        'header',
        'страница создания шаблона',
        'детальная страница промпта',
      ]}
      exitPoints={[
        { href: '/profile/templates/new', label: 'Создать шаблон', variant: 'primary' },
        { href: '/catalog', label: 'Смотреть примеры' },
      ]}
    />
  );
}
