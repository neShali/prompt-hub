import { notFound } from 'next/navigation';

import { PromptDetail } from '@/entities/prompt/ui/PromptDetail';
import { getPromptBySlug } from '@/shared/mock/prompts';

type TPromptDetailsPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function PromptDetailsPage({ params }: TPromptDetailsPageProps) {
  const { slug } = await params;
  const prompt = getPromptBySlug(slug);

  if (!prompt) {
    notFound();
  }

  return <PromptDetail prompt={prompt} />;
}
