import {
  getPromptSyntaxSegments,
  getPromptSyntaxTypes,
  getVariablesFromPrompt,
} from './promptSyntax';

describe('promptSyntax', () => {
  it('находит поддерживаемые элементы синтаксиса промпта', () => {
    const text = `## Heading
<context>{{goal}}</context>
NEXT → step
"key": "value"
+++Format
A ∩ B
`;

    expect(getPromptSyntaxTypes(text)).toEqual(
      expect.arrayContaining([
        'heading',
        'xmlTag',
        'variable',
        'capsAccent',
        'flowArrow',
        'jsonPair',
        'decorator',
        'metaGlyph',
      ])
    );
  });

  it('извлекает переменные без фигурных скобок', () => {
    expect(getVariablesFromPrompt('{{product}} для {{ audience }}')).toEqual([
      'product',
      'audience',
    ]);
  });



  it('подсвечивает блок в тройных обратных кавычках целиком', () => {
    const text = `\`\`\`
{{diff}}
\`\`\``;
    const segments = getPromptSyntaxSegments(text);

    expect(segments).toContainEqual({ type: 'inlineCode', value: text });
  });


  it('разбивает текст на сегменты для подсветки', () => {
    const segments = getPromptSyntaxSegments('Текст {{goal}} → ответ');

    expect(segments).toEqual(
      expect.arrayContaining([
        { value: 'Текст ' },
        { type: 'variable', value: '{{goal}}' },
        { value: ' ' },
        { type: 'flowArrow', value: '→' },
        { value: ' ответ' },
      ])
    );
  });
});
