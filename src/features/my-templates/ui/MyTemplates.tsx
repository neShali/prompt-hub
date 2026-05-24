'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import {
  getSavedTemplates,
  TSavedTemplate,
} from '@/features/template-form/model/storage';
import { promptCategories } from '@/shared/mock/prompts';
import { Breadcrumbs } from '@/widgets/Breadcrumbs/Breadcrumbs';

import styles from './MyTemplates.module.css';

const getCategoryLabel = (category: string) =>
  promptCategories.find((item) => item.value === category)?.label ?? category;

export function MyTemplates() {
  const [templates, setTemplates] = useState<TSavedTemplate[]>([]);

  useEffect(() => {
    setTemplates(getSavedTemplates());
  }, []);

  return (
    <section>
      <Breadcrumbs />

      <div className={styles.header}>
        <div>
          <span className="badge">Личный кабинет</span>
          <h1>Мои шаблоны</h1>
          <p>
            Здесь собраны ваши шаблоны. Их можно редактировать,
            обновлять и использовать как основу для новых промптов.
          </p>
        </div>

        <Link className="primaryLink" href="/profile/templates/new">
          Создать шаблон
        </Link>
      </div>

      {templates.length === 0 ? (
        <div className={styles.emptyState}>
          <h2>Пока нет сохранённых шаблонов</h2>
          <p>Создайте первый шаблон, чтобы сохранить его в личной коллекции и вернуться к нему позже.</p>
          <Link className="primaryLink" href="/profile/templates/new">
            Перейти к созданию
          </Link>
        </div>
      ) : (
        <div className={styles.grid}>
          {templates.map((template) => (
            <article className={styles.card} key={template.id}>
              <span>{getCategoryLabel(template.category)}</span>
              <h2>{template.title}</h2>
              <p>{template.description}</p>
              <small>
                Обновлено:{' '}
                {new Intl.DateTimeFormat('ru-RU', {
                  dateStyle: 'medium',
                  timeStyle: 'short',
                }).format(new Date(template.updatedAt))}
              </small>
              <Link href={`/profile/templates/${template.id}/edit`}>
                Редактировать
              </Link>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
