import { getPromptSyntaxTypes, getVariablesFromPrompt } from './promptSyntax';

describe('prompt syntax helpers', () => {
  const prompt = `## Role
SYSTEM объясняет задачу → шаг за шагом
—
<context>{{goal}}</context>
Используй ∈ и ⊕
Ответ верни как "key": "value"
Добавь ` + '`code`' + `
+++Format`;

  it('находит поддерживаемые элементы синтаксиса', () => {
    expect(getPromptSyntaxTypes(prompt)).toEqual(
      expect.arrayContaining([
        'heading',
        'separator',
        'flowArrow',
        'xmlTag',
        'variable',
        'capsAccent',
        'metaGlyph',
        'inlineCode',
        'jsonPair',
        'decorator',
      ])
    );
  });

  it('извлекает переменные из двойных фигурных скобок', () => {
    expect(getVariablesFromPrompt(prompt)).toEqual(['goal']);
  });
});
