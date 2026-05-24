'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import {
  AUTH_CHANGED_EVENT,
  clearCurrentUser,
  getCurrentUser,
  TAuthUser,
} from '@/features/auth-form/model/session';
import { mainNavigation } from '@/shared/config/navigation';

import styles from './Header.module.css';

const isCurrentRoute = (pathname: string, href: string) =>
  pathname === href || (href !== '/' && pathname.startsWith(`${href}/`));

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<TAuthUser | null>(null);

  useEffect(() => {
    const syncUser = () => setUser(getCurrentUser());

    syncUser();
    window.addEventListener(AUTH_CHANGED_EVENT, syncUser);
    window.addEventListener('storage', syncUser);

    return () => {
      window.removeEventListener(AUTH_CHANGED_EVENT, syncUser);
      window.removeEventListener('storage', syncUser);
    };
  }, []);

  const handleLogout = () => {
    clearCurrentUser();
    router.push('/login');
  };

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link className={styles.logo} href="/" aria-label="PromptHub, перейти на главную">
          <span className={styles.logoMark} aria-hidden="true">PH</span>
          <span className={styles.logoText}>PromptHub</span>
        </Link>

        <nav className={styles.nav} aria-label="Основная навигация">
          {mainNavigation.map((item) => {
            const isActive = isCurrentRoute(pathname, item.href);

            return (
              <Link
                aria-current={isActive ? 'page' : undefined}
                className={isActive ? `${styles.navLink} ${styles.activeNavLink}` : styles.navLink}
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className={styles.actions}>
          {user ? (
            <>
              <Link
                aria-current={pathname.startsWith('/profile') ? 'page' : undefined}
                className={styles.loginLink}
                href="/profile"
              >
                Кабинет
              </Link>
              <button className={styles.logoutButton} type="button" onClick={handleLogout}>
                Выйти
              </button>
            </>
          ) : (
            <Link
              aria-current={pathname === '/login' ? 'page' : undefined}
              className={styles.loginLink}
              href="/login"
            >
              Войти
            </Link>
          )}

          <Link className={styles.createLink} href="/profile/templates/new">
            Создать шаблон
          </Link>
        </div>
      </div>
    </header>
  );
}
