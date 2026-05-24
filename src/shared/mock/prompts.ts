import { TPrompt, TPromptCategory } from '@/shared/types/prompt';

export const promptCategories: Array<{ value: TPromptCategory; label: string }> = [
  { value: 'marketing', label: 'Маркетинг' },
  { value: 'development', label: 'Разработка' },
  { value: 'education', label: 'Обучение' },
  { value: 'writing', label: 'Тексты' },
  { value: 'analytics', label: 'Аналитика' },
];

export const prompts: TPrompt[] = [
  {
    id: 'prompt-001',
    slug: 'content-plan-for-product-launch',
    title: 'Контент-план для запуска продукта',
    description:
      'Помогает собрать план публикаций для запуска нового продукта с учётом аудитории, каналов и ключевых сообщений.',
    category: 'marketing',
    categoryLabel: 'Маркетинг',
    tags: ['контент', 'запуск', 'стратегия'],
    variables: ['product', 'audience', 'channels'],
    author: 'PromptHub Team',
    updatedAt: '2026-05-10',
    isFeatured: true,
    prompt: `## Role
Ты — маркетинг-стратег.

## Context
Продукт: {{product}}
Аудитория: {{audience}}
Каналы: {{channels}}

## Task
Составь контент-план на 14 дней для запуска продукта.

## Format
Верни таблицу: день → канал → тема → CTA → метрика успеха.`,
  },
  {
    id: 'prompt-002',
    slug: 'frontend-code-review-checklist',
    title: 'Чек-лист ревью фронтенд-кода',
    description:
      'Структурирует ревью React/Next.js-кода: архитектура, читаемость, доступность, производительность и риски.',
    category: 'development',
    categoryLabel: 'Разработка',
    tags: ['frontend', 'code review', 'react'],
    variables: ['diff', 'stack', 'risk_level'],
    author: 'PromptHub Team',
    updatedAt: '2026-05-12',
    isFeatured: true,
    prompt: `## Role
Ты — ведущий frontend-разработчик.

## Input
Стек: {{stack}}
Уровень риска: {{risk_level}}
Изменения:
\`\`\`
{{diff}}
\`\`\`

## Task
Проведи ревью изменений.

## Output
1. Критичные проблемы
2. Средние проблемы
3. Улучшения
4. Что можно оставить как есть`,
  },
  {
    id: 'prompt-003',
    slug: 'lesson-explanation-with-examples',
    title: 'Объяснение темы с примерами',
    description:
      'Готовит простое объяснение учебной темы с примерами, аналогиями и проверочными вопросами.',
    category: 'education',
    categoryLabel: 'Обучение',
    tags: ['обучение', 'конспект', 'примеры'],
    variables: ['topic', 'level', 'format'],
    author: 'PromptHub Team',
    updatedAt: '2026-05-08',
    prompt: `## Topic
{{topic}}

## Student level
{{level}}

## Task
Объясни тему простым языком. Используй 2 аналогии и 3 практических примера.

## Format
{{format}}

+++Requirements
Избегай сложных терминов без пояснения.`,
  },
  {
    id: 'prompt-004',
    slug: 'article-outline-generator',
    title: 'Структура статьи',
    description:
      'Создаёт план статьи с заголовками, тезисами, интро, выводом и рекомендациями по стилю.',
    category: 'writing',
    categoryLabel: 'Тексты',
    tags: ['статья', 'структура', 'редактура'],
    variables: ['theme', 'audience', 'tone'],
    author: 'PromptHub Team',
    updatedAt: '2026-04-29',
    prompt: `## Heading
Тема: {{theme}}
Аудитория: {{audience}}
Тон: {{tone}}

→ Сформируй структуру статьи.

JSON пример вывода:
"title": "..."
"sections": ["..."]`,
  },
  {
    id: 'prompt-005',
    slug: 'research-summary-card',
    title: 'Карточка исследования',
    description:
      'Преобразует длинное исследование в короткую карточку с выводами, ограничениями и практическими применениями.',
    category: 'analytics',
    categoryLabel: 'Аналитика',
    tags: ['исследование', 'summary', 'выводы'],
    variables: ['research_text', 'focus'],
    author: 'PromptHub Team',
    updatedAt: '2026-05-03',
    prompt: `## Input
{{research_text}}

## Focus
{{focus}}

## Task
Сделай краткую карточку исследования.

## Output
- Главная идея
- Метод
- 3 ключевых вывода
- Ограничения
- Как применить на практике`,
  },
  {
    id: 'prompt-006',
    slug: 'product-requirements-draft',
    title: 'Черновик требований к продукту',
    description:
      'Помогает собрать PRD: проблему, пользователей, сценарии, ограничения, критерии успеха и открытые вопросы.',
    category: 'analytics',
    categoryLabel: 'Аналитика',
    tags: ['prd', 'продукт', 'требования'],
    variables: ['problem', 'users', 'constraints'],
    author: 'PromptHub Team',
    updatedAt: '2026-05-01',
    prompt: `## Problem
{{problem}}

## Users
{{users}}

## Constraints
{{constraints}}

## Task
Собери черновик требований к продуктовой функции.

∈ Scope
∩ Dependencies
¬ Out of scope
⊕ Success metrics`,
  },
  {
    id: 'prompt-007',
    slug: 'bug-report-improver',
    title: 'Улучшение баг-репорта',
    description:
      'Превращает неполное описание бага в понятный отчёт для команды разработки и тестирования.',
    category: 'development',
    categoryLabel: 'Разработка',
    tags: ['bug', 'qa', 'debug'],
    variables: ['bug_description', 'environment'],
    author: 'PromptHub Team',
    updatedAt: '2026-04-26',
    prompt: `## Environment
{{environment}}

## Bug description
{{bug_description}}

## Task
Улучши баг-репорт.

## Output
1. Summary
2. Steps to reproduce
3. Actual result
4. Expected result
5. Possible cause
6. Missing information`,
  },
  {
    id: 'prompt-008',
    slug: 'email-tone-rewriter',
    title: 'Переписывание письма в нужном тоне',
    description:
      'Адаптирует текст письма под деловой, дружелюбный или более уверенный тон без потери смысла.',
    category: 'writing',
    categoryLabel: 'Тексты',
    tags: ['email', 'tone of voice', 'редактура'],
    variables: ['text', 'tone'],
    author: 'PromptHub Team',
    updatedAt: '2026-04-20',
    prompt: `## Input
{{text}}

## Tone
{{tone}}

## Task
Перепиши письмо в заданном тоне.

+++Rules
Сохрани смысл.
Не добавляй неподтверждённые факты.
Сделай текст короче и понятнее.`,
  },
];

const normalize = (value: string) => value.trim().toLowerCase();

export const getPromptBySlug = (slug: string) =>
  prompts.find((prompt) => prompt.slug === slug);

export const getPromptById = (id: string) => prompts.find((prompt) => prompt.id === id);

export const searchPrompts = ({
  query,
  category,
}: {
  query?: string;
  category?: string;
}) => {
  const normalizedQuery = normalize(query ?? '');
  const normalizedCategory = normalize(category ?? '');

  return prompts.filter((prompt) => {
    const matchesCategory =
      !normalizedCategory || prompt.category === normalizedCategory;

    const searchableText = normalize(
      [
        prompt.title,
        prompt.description,
        prompt.categoryLabel,
        prompt.prompt,
        prompt.tags.join(' '),
        prompt.variables.join(' '),
      ].join(' ')
    );

    const matchesQuery = !normalizedQuery || searchableText.includes(normalizedQuery);

    return matchesCategory && matchesQuery;
  });
};

export const getPromptSuggestions = (query: string) => {
  const normalizedQuery = normalize(query);

  if (normalizedQuery.length < 3) {
    return [];
  }

  const values = new Set<string>();

  prompts.forEach((prompt) => {
    [prompt.title, prompt.categoryLabel, ...prompt.tags, ...prompt.variables].forEach(
      (value) => {
        if (normalize(value).includes(normalizedQuery)) {
          values.add(value);
        }
      }
    );
  });

  return Array.from(values).slice(0, 6);
};
