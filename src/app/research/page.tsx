import { RoutePage } from '@/shared/ui/RoutePage/RoutePage';

export default function ResearchPage() {
  return (
    <RoutePage
      badge="Материалы"
      title="База исследований"
      description="Страница для подборки исследований, заметок и практических выводов о работе с языковыми моделями."
      contentItems={[
        'список исследований',
        'краткие выводы',
        'теги',
        'ссылки на связанные шаблоны',
        'дата публикации',
      ]}
      entryPoints={[
        'главная страница',
        'header',
        'база знаний',
        'детальная страница промпта',
      ]}
      exitPoints={[
        { href: '/knowledge', label: 'Перейти в базу знаний', variant: 'primary' },
        { href: '/catalog', label: 'Найти шаблоны' },
      ]}
    />
  );
}
