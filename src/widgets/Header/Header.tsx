'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import {
  AUTH_CHANGED_EVENT,
  clearCurrentUser,
  getCurrentUser,
  TAuthUser,
} from '@/features/auth-form/model/session';
import { mainNavigation } from '@/shared/config/navigation';

import styles from './Header.module.css';

export function Header() {
  const router = useRouter();
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
          <span className={styles.logoMark}>PH</span>
          <span className={styles.logoText}>PromptHub</span>
        </Link>

        <nav className={styles.nav} aria-label="Основная навигация">
          {mainNavigation.map((item) => (
            <Link className={styles.navLink} href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          {user ? (
            <>
              <Link className={styles.loginLink} href="/profile">
                Кабинет
              </Link>
              <button className={styles.logoutButton} type="button" onClick={handleLogout}>
                Выйти
              </button>
            </>
          ) : (
            <Link className={styles.loginLink} href="/login">
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
