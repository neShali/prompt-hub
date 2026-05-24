import Link from 'next/link';

import { mainNavigation } from '@/shared/config/navigation';

import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div>
          <Link className={styles.logo} href="/">
            PromptHub
          </Link>
          <p className={styles.description}>
            Учебный сервис для работы с промптами, шаблонами и материалами по
            промпт-инжинирингу.
          </p>
        </div>

        <nav className={styles.nav} aria-label="Навигация в подвале сайта">
          {mainNavigation.map((item) => (
            <Link href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
