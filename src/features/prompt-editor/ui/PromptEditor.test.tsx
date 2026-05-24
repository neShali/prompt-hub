import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';

import { PromptEditor } from './PromptEditor';

function ControlledPromptEditor() {
  const [value, setValue] = useState('');

  return (
    <PromptEditor
      id="promptText"
      label="Текст промпта"
      value={value}
      onChange={setValue}
    />
  );
}

describe('PromptEditor', () => {
  it('кнопки редактора изменяют содержимое textarea', async () => {
    const user = userEvent.setup();

    render(<ControlledPromptEditor />);

    await user.click(screen.getByRole('button', { name: 'Заголовок' }));
    await user.click(screen.getByRole('button', { name: 'Переменная' }));
    await user.click(screen.getByRole('button', { name: 'XML-тег' }));

    const textarea = screen.getByLabelText('Текст промпта');

    expect((textarea as HTMLTextAreaElement).value).toContain('## Heading');
    expect((textarea as HTMLTextAreaElement).value).toContain('{{variable}}');
    expect((textarea as HTMLTextAreaElement).value).toContain('<context></context>');
  });
});
