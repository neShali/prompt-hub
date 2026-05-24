import { render, screen } from '@testing-library/react';

import { prompts } from '@/shared/mock/prompts';

import { PromptCard } from './PromptCard';

describe('PromptCard', () => {
  it('рендерит карточку как ссылку на детальную страницу', () => {
    const prompt = prompts[0];

    render(<PromptCard prompt={prompt} />);

    const link = screen.getByRole('link', { name: new RegExp(prompt.title, 'i') });

    expect(link).toHaveAttribute('href', `/catalog/${prompt.slug}`);
    expect(screen.getByText(prompt.categoryLabel)).toBeInTheDocument();
  });
});
