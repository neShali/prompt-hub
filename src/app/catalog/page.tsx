import dynamic from 'next/dynamic';

import { LoadingState } from '@/shared/ui/LoadingState/LoadingState';

const PromptCatalog = dynamic(
  () => import('@/features/prompt-catalog/ui/PromptCatalog').then((mod) => mod.PromptCatalog),
  {
    loading: () => (
      <LoadingState
        title="Загружаем каталог"
        description="Подготавливаем список шаблонов и фильтры по категориям."
      />
    ),
  }
);

export default function CatalogPage() {
  return <PromptCatalog />;
}
