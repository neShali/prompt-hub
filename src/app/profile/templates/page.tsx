import { RoutePage } from '@/shared/ui/RoutePage/RoutePage';

export default function TemplatesPage() {
  return (
    <RoutePage
      badge="Личный кабинет"
      title="Мои шаблоны"
      description="Раздел для управления шаблонами, которые пользователь создал сам."
      contentItems={[
        'список пользовательских шаблонов',
        'статус публичности',
        'дата изменения',
        'переход к редактированию',
        'создание нового шаблона',
      ]}
      entryPoints={[
        'личный кабинет',
        'sidebar личного кабинета',
        'после создания шаблона',
        'после редактирования шаблона',
      ]}
      exitPoints={[
        { href: '/profile/templates/new', label: 'Создать шаблон', variant: 'primary' },
        { href: '/catalog', label: 'Открыть каталог' },
      ]}
    />
  );
}
