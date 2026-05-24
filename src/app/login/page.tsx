import { RoutePage } from '@/shared/ui/RoutePage/RoutePage';

export default function LoginPage() {
  return (
    <RoutePage
      badge="Авторизация"
      title="Вход в аккаунт"
      description="Страница входа в личный кабинет. На следующем этапе здесь появится форма с валидацией email и пароля."
      contentItems={[
        'форма входа',
        'поле email',
        'поле пароля',
        'сообщения об ошибках',
        'ссылка на регистрацию',
      ]}
      entryPoints={[
        'header',
        'страница регистрации',
        'попытка добавить промпт в избранное',
        'попытка создать шаблон',
      ]}
      exitPoints={[
        { href: '/profile', label: 'Перейти в кабинет', variant: 'primary' },
        { href: '/register', label: 'Создать аккаунт' },
      ]}
    />
  );
}
