import dynamic from 'next/dynamic';

import { LoadingState } from '@/shared/ui/LoadingState/LoadingState';

const MyTemplates = dynamic(
  () => import('@/features/my-templates/ui/MyTemplates').then((mod) => mod.MyTemplates),
  {
    loading: () => (
      <LoadingState
        title="Загружаем ваши шаблоны"
        description="Открываем личную коллекцию сохранённых промптов."
      />
    ),
  }
);

export default function TemplatesPage() {
  return <MyTemplates />;
}
