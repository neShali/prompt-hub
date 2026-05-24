'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { routeLabels } from '@/shared/config/navigation';
import { prompts } from '@/shared/mock/prompts';

import styles from './Breadcrumbs.module.css';

const getPromptTitleBySlug = (slug: string) =>
  prompts.find((prompt) => prompt.slug === slug)?.title ?? 'Промпт';

const getCrumbLabel = (segments: string[], index: number, href: string) => {
  const segment = segments[index];
  const previousHref = `/${segments.slice(0, index).join('/')}`;

  if (routeLabels[href]) return routeLabels[href];
  if (segment === 'edit') return 'Редактирование';
  if (previousHref === '/catalog') return getPromptTitleBySlug(segment);
  if (previousHref === '/profile/templates') return 'Шаблон';

  return 'Раздел';
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
      label: getCrumbLabel(segments, index, href),
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
