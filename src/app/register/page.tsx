import { RoutePage } from '@/shared/ui/RoutePage/RoutePage';

export default function RegisterPage() {
  return (
    <RoutePage
      badge="Авторизация"
      title="Регистрация"
      description="Страница создания аккаунта. На следующем этапе здесь появится форма регистрации с клиентской валидацией."
      contentItems={[
        'форма регистрации',
        'поле имени',
        'поле email',
        'поле пароля',
        'подтверждение пароля',
        'ссылка на вход',
      ]}
      entryPoints={['страница входа', 'header', 'главная страница']}
      exitPoints={[
        { href: '/profile', label: 'Перейти в кабинет', variant: 'primary' },
        { href: '/login', label: 'У меня уже есть аккаунт' },
      ]}
    />
  );
}
