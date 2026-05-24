'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { routeLabels } from '@/shared/config/navigation';

import styles from './Breadcrumbs.module.css';

const getDynamicLabel = (segment: string) => {
  if (segment === 'edit') return 'Редактирование';

  return decodeURIComponent(segment)
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
};

export function Breadcrumbs() {
  const pathname = usePathname();

  if (pathname === '/') {
    return null;
  }

  const segments = pathname.split('/').filter(Boolean);

  const crumbs = segments.map((segment, index) => {
    const href = `/${segments.slice(0, index + 1).join('/')}`;

    return {
      href,
      label: routeLabels[href] ?? getDynamicLabel(segment),
      isCurrent: index === segments.length - 1,
    };
  });

  return (
    <nav className={styles.breadcrumbs} aria-label="Хлебные крошки">
      <Link href="/">Главная</Link>

      {crumbs.map((crumb) => (
        <span className={styles.item} key={crumb.href}>
          <span className={styles.separator}>/</span>

          {crumb.isCurrent ? (
            <span aria-current="page">{crumb.label}</span>
          ) : (
            <Link href={crumb.href}>{crumb.label}</Link>
          )}
        </span>
      ))}
    </nav>
  );
}
