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

export type TPromptSyntaxSegment = {
  type?: TPromptSyntaxType;
  value: string;
};

type TSyntaxMatchWithRange = TPromptSyntaxMatch & {
  start: number;
  end: number;
};

const syntaxPatterns: Array<{ type: TPromptSyntaxType; pattern: RegExp; priority: number }> = [
  { type: 'heading', pattern: /^##\s+.+$/gm, priority: 1 },
  { type: 'jsonPair', pattern: /"[\w-]+"\s*:\s*"[^"\n]+"/g, priority: 2 },
  { type: 'inlineCode', pattern: /```[\s\S]*?```|`[^`\n]+`/g, priority: 3 },
  { type: 'xmlTag', pattern: /<\/?[a-zA-Z][\w-]*(?:\s[^>]*)?>/g, priority: 4 },
  { type: 'variable', pattern: /{{\s*[\w.-]+\s*}}/g, priority: 5 },
  { type: 'decorator', pattern: /\+\+\+[A-Za-zА-Яа-я][\wА-Яа-я-]*/g, priority: 6 },
  { type: 'capsAccent', pattern: /\b[А-ЯA-Z]{3,}\b/g, priority: 7 },
  { type: 'metaGlyph', pattern: /[∈∩∪¬⊕]/g, priority: 8 },
  { type: 'flowArrow', pattern: /→/g, priority: 9 },
  { type: 'separator', pattern: /—/g, priority: 10 },
];

const getMatchesWithRanges = (text: string): TSyntaxMatchWithRange[] =>
  syntaxPatterns.flatMap(({ type, pattern, priority }) =>
    Array.from(text.matchAll(pattern), (match) => ({
      type,
      value: match[0],
      start: match.index ?? 0,
      end: (match.index ?? 0) + match[0].length,
      priority,
    }))
  )
    .sort((a, b) => a.start - b.start || a.priority - b.priority || b.end - a.end)
    .reduce<TSyntaxMatchWithRange[]>((acceptedMatches, match) => {
      const overlaps = acceptedMatches.some(
        (acceptedMatch) => match.start < acceptedMatch.end && match.end > acceptedMatch.start
      );

      return overlaps ? acceptedMatches : [...acceptedMatches, match];
    }, []);

export const getPromptSyntaxMatches = (text: string): TPromptSyntaxMatch[] =>
  getMatchesWithRanges(text).map(({ type, value }) => ({ type, value }));

export const getPromptSyntaxSegments = (text: string): TPromptSyntaxSegment[] => {
  const matches = getMatchesWithRanges(text);
  const segments: TPromptSyntaxSegment[] = [];
  let cursor = 0;

  matches.forEach((match) => {
    if (match.start > cursor) {
      segments.push({ value: text.slice(cursor, match.start) });
    }

    segments.push({ type: match.type, value: match.value });
    cursor = match.end;
  });

  if (cursor < text.length) {
    segments.push({ value: text.slice(cursor) });
  }

  return segments;
};

export const getPromptSyntaxTypes = (text: string) =>
  Array.from(new Set(getPromptSyntaxMatches(text).map((match) => match.type)));

export const getVariablesFromPrompt = (text: string) =>
  Array.from(new Set(Array.from(text.matchAll(/{{\s*([\w.-]+)\s*}}/g), (match) => match[1])));
