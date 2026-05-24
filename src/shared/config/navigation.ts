export type TNavItem = {
  href: string;
  label: string;
  description?: string;
};

export const mainNavigation: TNavItem[] = [
  {
    href: '/catalog',
    label: 'Каталог',
    description: 'Публичный каталог готовых промптов',
  },
  {
    href: '/knowledge',
    label: 'База знаний',
    description: 'Материалы по форматированию и структуре промптов',
  },
  {
    href: '/research',
    label: 'Исследования',
    description: 'Подборка исследований и практических материалов',
  },
  {
    href: '/search',
    label: 'Поиск',
    description: 'Поиск по шаблонам и материалам сервиса',
  },
];

export const profileNavigation: TNavItem[] = [
  {
    href: '/profile',
    label: 'Обзор',
    description: 'Главная страница личного кабинета',
  },
  {
    href: '/profile/favorites',
    label: 'Избранное',
    description: 'Сохранённые промпты',
  },
  {
    href: '/profile/templates',
    label: 'Мои шаблоны',
    description: 'Созданные пользователем шаблоны',
  },
  {
    href: '/profile/templates/new',
    label: 'Создать шаблон',
    description: 'Форма создания нового шаблона промпта',
  },
];

export const routeLabels: Record<string, string> = {
  '/': 'Главная',
  '/catalog': 'Каталог',
  '/search': 'Поиск',
  '/knowledge': 'База знаний',
  '/research': 'Исследования',
  '/login': 'Вход',
  '/register': 'Регистрация',
  '/profile': 'Личный кабинет',
  '/profile/favorites': 'Избранное',
  '/profile/templates': 'Мои шаблоны',
  '/profile/templates/new': 'Создание шаблона',
};
