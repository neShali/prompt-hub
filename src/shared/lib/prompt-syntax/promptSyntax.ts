export type TPromptSyntaxType =
  | 'heading'
  | 'separator'
  | 'flowArrow'
  | 'xmlTag'
  | 'variable'
  | 'capsAccent'
  | 'metaGlyph'
  | 'inlineCode'
  | 'jsonPair'
  | 'decorator';

export type TPromptSyntaxMatch = {
  type: TPromptSyntaxType;
  value: string;
};

const syntaxPatterns: Array<{ type: TPromptSyntaxType; pattern: RegExp }> = [
  { type: 'heading', pattern: /^##\s+.+$/gm },
  { type: 'separator', pattern: /—/g },
  { type: 'flowArrow', pattern: /→/g },
  { type: 'xmlTag', pattern: /<\/?[a-zA-Z][\w-]*(?:\s[^>]*)?>/g },
  { type: 'variable', pattern: /{{\s*[\w.-]+\s*}}/g },
  { type: 'capsAccent', pattern: /\b[А-ЯA-Z]{3,}\b/g },
  { type: 'metaGlyph', pattern: /[∈∩∪¬⊕]/g },
  { type: 'inlineCode', pattern: /`[^`]+`/g },
  { type: 'jsonPair', pattern: /"[\w-]+"\s*:\s*"[^"\n]+"/g },
  { type: 'decorator', pattern: /\+\+\+[A-Za-zА-Яа-я][\wА-Яа-я-]*/g },
];

export const getPromptSyntaxMatches = (text: string): TPromptSyntaxMatch[] =>
  syntaxPatterns.flatMap(({ type, pattern }) =>
    Array.from(text.matchAll(pattern), (match) => ({
      type,
      value: match[0],
    }))
  );

export const getPromptSyntaxTypes = (text: string) =>
  Array.from(new Set(getPromptSyntaxMatches(text).map((match) => match.type)));

export const getVariablesFromPrompt = (text: string) =>
  Array.from(text.matchAll(/{{\s*([\w.-]+)\s*}}/g), (match) => match[1]);
