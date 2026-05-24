import { templateFormSchema } from './schema';

const validTemplate = {
  title: 'Контент-план для запуска продукта',
  description: 'Шаблон помогает подготовить структуру публикаций для запуска продукта.',
  category: 'marketing',
  variables: 'product, audience, goal',
  promptText: `## Role
Ты — маркетолог.

## Task
Составь план для {{product}} под аудиторию {{audience}}.`,
  isPublic: true,
};

describe('templateFormSchema', () => {
  it('принимает валидный шаблон', () => {
    expect(templateFormSchema.safeParse(validTemplate).success).toBe(true);
  });

  it('отклоняет слишком короткие поля', () => {
    const result = templateFormSchema.safeParse({
      ...validTemplate,
      title: 'AI',
      description: 'коротко',
      promptText: 'мало',
    });

    expect(result.success).toBe(false);
  });
});
