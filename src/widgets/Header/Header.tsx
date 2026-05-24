import Link from 'next/link';

import { mainNavigation } from '@/shared/config/navigation';

import styles from './Header.module.css';

export function Header() {
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
          <Link className={styles.loginLink} href="/login">
            Войти
          </Link>
          <Link className={styles.createLink} href="/profile/templates/new">
            Создать шаблон
          </Link>
        </div>
      </div>
    </header>
  );
}
