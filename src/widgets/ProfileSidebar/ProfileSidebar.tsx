'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { profileNavigation } from '@/shared/config/navigation';

import styles from './ProfileSidebar.module.css';

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
          const isActive =
            pathname === item.href ||
            (item.href !== '/profile' && pathname.startsWith(item.href));

          return (
            <Link
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
