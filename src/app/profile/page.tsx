import { RoutePage } from '@/shared/ui/RoutePage/RoutePage';

export default function ProfilePage() {
  return (
    <RoutePage
      badge="Личный кабинет"
      title="Обзор аккаунта"
      description="Главная страница личного кабинета. Здесь пользователь видит свои шаблоны, избранные промпты и быстрые действия."
      contentItems={[
        'краткая статистика',
        'последние созданные шаблоны',
        'избранные промпты',
        'быстрый переход к созданию шаблона',
      ]}
      entryPoints={[
        'header',
        'страница входа',
        'страница регистрации',
        'после добавления промпта в избранное',
      ]}
      exitPoints={[
        { href: '/profile/templates/new', label: 'Создать шаблон', variant: 'primary' },
        { href: '/profile/favorites', label: 'Открыть избранное' },
      ]}
    />
  );
}
