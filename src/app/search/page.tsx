import { Suspense } from 'react';

import { PromptSearchPage } from '@/features/prompt-search/ui/PromptSearchPage';

export default function SearchPage() {
  return (
    <Suspense fallback={null}>
      <PromptSearchPage />
    </Suspense>
  );
}
