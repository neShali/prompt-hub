export const promptCategoryValues = [
  'marketing',
  'development',
  'education',
  'writing',
  'analytics',
] as const;

export type TPromptCategory = (typeof promptCategoryValues)[number];

export type TPrompt = {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: TPromptCategory;
  categoryLabel: string;
  tags: string[];
  prompt: string;
  variables: string[];
  author: string;
  updatedAt: string;
  isFeatured?: boolean;
};

export type TSearchResponse = {
  results: TPrompt[];
  suggestions?: string[];
  total: number;
  query?: string;
  category?: TPromptCategory | '';
};
