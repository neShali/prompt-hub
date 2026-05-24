'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { profileNavigation } from '@/shared/config/navigation';

import styles from './ProfileSidebar.module.css';

const isProfileNavItemActive = (pathname: string, href: string) => {
  if (pathname === href) {
    return true;
  }

  const isTemplateEditPage =
    href === '/profile/templates' &&
    pathname.startsWith('/profile/templates/') &&
    pathname.endsWith('/edit');

  return isTemplateEditPage;
};

export function ProfileSidebar() {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.card}>
        <p className={styles.eyebrow}>Личный кабинет</p>
        <h2 className={styles.title}>Рабочее пространство</h2>
        <p className={styles.description}>
          Управление шаблонами, избранными промптами и публичными материалами.
        </p>
      </div>

      <nav className={styles.nav} aria-label="Навигация личного кабинета">
        {profileNavigation.map((item) => {
          const isActive = isProfileNavItemActive(pathname, item.href);

          return (
            <Link
              aria-current={isActive ? 'page' : undefined}
              className={isActive ? `${styles.link} ${styles.active}` : styles.link}
              href={item.href}
              key={item.href}
            >
              <span>{item.label}</span>
              {item.description ? <small>{item.description}</small> : null}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
