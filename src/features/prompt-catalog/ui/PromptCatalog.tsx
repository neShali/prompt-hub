'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

import { PromptCard } from '@/entities/prompt/ui/PromptCard';
import { promptCategories, prompts } from '@/shared/mock/prompts';
import { TPromptCategory } from '@/shared/types/prompt';
import { Breadcrumbs } from '@/widgets/Breadcrumbs/Breadcrumbs';

import styles from './PromptCatalog.module.css';

type TSelectedCategory = TPromptCategory | 'all';

export function PromptCatalog() {
  const [selectedCategory, setSelectedCategory] = useState<TSelectedCategory>('all');

  const filteredPrompts = useMemo(() => {
    if (selectedCategory === 'all') {
      return prompts;
    }

    return prompts.filter((prompt) => prompt.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section className="pageSection">
      <div className="container">
        <Breadcrumbs />

        <div className={styles.hero}>
          <div>
            <span className="badge">Публичный каталог</span>
            <h1>Каталог шаблонов промптов</h1>
            <p>
              Здесь собраны готовые шаблоны для маркетинга, разработки, обучения,
              аналитики и работы с текстами. Используйте категории или откройте
              поиск, чтобы быстрее найти подходящий вариант.
            </p>
          </div>

          <Link className="primaryLink" href="/search">
            Открыть поиск
          </Link>
        </div>

        <div className={styles.filters} aria-label="Фильтр по категориям">
          <button
            className={selectedCategory === 'all' ? styles.active : undefined}
            type="button"
            onClick={() => setSelectedCategory('all')}
          >
            Все
          </button>
          {promptCategories.map((category) => (
            <button
              className={selectedCategory === category.value ? styles.active : undefined}
              key={category.value}
              type="button"
              onClick={() => setSelectedCategory(category.value)}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className={styles.grid}>
          {filteredPrompts.map((prompt) => (
            <PromptCard key={prompt.id} prompt={prompt} />
          ))}
        </div>
      </div>
    </section>
  );
}
