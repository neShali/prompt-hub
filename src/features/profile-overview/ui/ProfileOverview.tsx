'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

import { getCurrentUser, TAuthUser } from '@/features/auth-form/model/session';
import { getSavedTemplates, TSavedTemplate } from '@/features/template-form/model/storage';
import { Breadcrumbs } from '@/widgets/Breadcrumbs/Breadcrumbs';

import styles from './ProfileOverview.module.css';

const getDisplayName = (user: TAuthUser | null) => user?.name || user?.email || 'Пользователь';

export function ProfileOverview() {
  const [user, setUser] = useState<TAuthUser | null>(null);
  const [templates, setTemplates] = useState<TSavedTemplate[]>([]);

  useEffect(() => {
    setUser(getCurrentUser());
    setTemplates(getSavedTemplates());
  }, []);

  const latestTemplates = useMemo(() => templates.slice(0, 3), [templates]);

  return (
    <section>
      <Breadcrumbs />

      <div className={styles.hero}>
        <div>
          <span className="badge">Личный кабинет</span>
          <h1>{getDisplayName(user)}</h1>
          <p>
            Управляйте шаблонами, возвращайтесь к сохранённым промптам и создавайте
            новые заготовки для повторяющихся задач.
          </p>
        </div>

        <div className={styles.stats} aria-label="Статистика аккаунта">
          <div>
            <strong>{templates.length}</strong>
            <span>шаблонов</span>
          </div>
          <div>
            <strong>{templates.filter((template) => template.isPublic).length}</strong>
            <span>публичных</span>
          </div>
          <div>
            <strong>3</strong>
            <span>в избранном</span>
          </div>
        </div>
      </div>

      <div className={styles.grid}>
        <article className={styles.card}>
          <h2>Быстрые действия</h2>
          <div className={styles.actions}>
            <Link className="primaryLink" href="/profile/templates/new">
              Создать шаблон
            </Link>
            <Link className="secondaryLink" href="/profile/templates">
              Мои шаблоны
            </Link>
            <Link className="secondaryLink" href="/profile/favorites">
              Избранное
            </Link>
          </div>
        </article>

        <article className={styles.card}>
          <h2>Последние шаблоны</h2>
          {latestTemplates.length > 0 ? (
            <div className={styles.templateList}>
              {latestTemplates.map((template) => (
                <Link href={`/profile/templates/${template.id}/edit`} key={template.id}>
                  <strong>{template.title}</strong>
                  <span>{template.description}</span>
                </Link>
              ))}
            </div>
          ) : (
            <p className={styles.muted}>
              У вас пока нет шаблонов. Создайте первый, чтобы он появился в этом блоке.
            </p>
          )}
        </article>
      </div>
    </section>
  );
}
