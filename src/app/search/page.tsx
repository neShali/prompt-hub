import dynamic from 'next/dynamic';
import { Suspense } from 'react';

import { LoadingState } from '@/shared/ui/LoadingState/LoadingState';

const PromptSearchPage = dynamic(
  () => import('@/features/prompt-search/ui/PromptSearchPage').then((mod) => mod.PromptSearchPage),
  {
    loading: () => (
      <LoadingState
        title="Подготавливаем поиск"
        description="Загружаем форму, фильтры и область результатов."
      />
    ),
  }
);

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <LoadingState
          title="Подготавливаем поиск"
          description="Загружаем форму, фильтры и область результатов."
        />
      }
    >
      <PromptSearchPage />
    </Suspense>
  );
}
