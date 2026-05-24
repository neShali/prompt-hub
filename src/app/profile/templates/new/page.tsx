import { RoutePage } from '@/shared/ui/RoutePage/RoutePage';

export default function NewTemplatePage() {
  return (
    <RoutePage
      badge="Редактор"
      title="Создание шаблона"
      description="Страница создания нового шаблона промпта. На следующих этапах здесь появятся форма, валидация и редактор с подсветкой синтаксиса."
      contentItems={[
        'форма создания шаблона',
        'название',
        'описание',
        'категория',
        'редактор промпта',
        'переключатель публичности',
      ]}
      entryPoints={[
        'header',
        'личный кабинет',
        'раздел мои шаблоны',
        'база знаний',
      ]}
      exitPoints={[
        { href: '/profile/templates', label: 'К моим шаблонам', variant: 'primary' },
        { href: '/knowledge', label: 'Открыть базу знаний' },
      ]}
    />
  );
}
