import { prompts } from '@/shared/mock/prompts';
import { TPrompt, TPromptCategory } from '@/shared/types/prompt';

type TSearchPromptsParams = {
  query?: string;
  category?: TPromptCategory | '';
};

const normalizeValue = (value: string) => value.trim().toLowerCase();

const promptMatchesQuery = (prompt: TPrompt, query: string) => {
  const normalizedQuery = normalizeValue(query);

  if (!normalizedQuery) return true;

  const searchableText = [
    prompt.title,
    prompt.description,
    prompt.prompt,
    prompt.categoryLabel,
    prompt.tags.join(' '),
    prompt.variables.join(' '),
  ]
    .join(' ')
    .toLowerCase();

  return searchableText.includes(normalizedQuery);
};

export const searchPrompts = ({ query = '', category = '' }: TSearchPromptsParams) =>
  prompts.filter((prompt) => {
    const matchesCategory = category ? prompt.category === category : true;

    return matchesCategory && promptMatchesQuery(prompt, query);
  });

export const getPromptSuggestions = (query: string) => {
  const normalizedQuery = normalizeValue(query);

  if (!normalizedQuery) return [];

  return prompts
    .flatMap((prompt) => [prompt.title, ...prompt.tags])
    .filter((item) => item.toLowerCase().includes(normalizedQuery))
    .slice(0, 6);
};
