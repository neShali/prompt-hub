import { getPromptSuggestions, searchPrompts } from './searchPrompts';

describe('searchPrompts', () => {
  it('ищет шаблоны по текстовому запросу', () => {
    const results = searchPrompts({ query: 'frontend' });

    expect(results.some((prompt) => prompt.slug === 'frontend-code-review-checklist')).toBe(true);
  });

  it('фильтрует шаблоны по категории', () => {
    const results = searchPrompts({ category: 'marketing' });

    expect(results.length).toBeGreaterThan(0);
    expect(results.every((prompt) => prompt.category === 'marketing')).toBe(true);
  });

  it('возвращает поисковые подсказки', () => {
    const suggestions = getPromptSuggestions('контент');

    expect(suggestions.length).toBeGreaterThan(0);
  });
});
