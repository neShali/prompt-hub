import { NextResponse } from 'next/server';

import { getPromptSuggestions, searchPrompts } from '@/shared/mock/prompts';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.trim() ?? '';
  const category = searchParams.get('category')?.trim() ?? '';
  const mode = searchParams.get('mode');

  await delay(350);

  if (query === 'network-error') {
    return NextResponse.json(
      { message: 'Имитированная ошибка сети для проверки error state.' },
      { status: 500 }
    );
  }

  if (query.length > 0 && query.length < 3) {
    return NextResponse.json(
      { message: 'Для поиска нужно ввести минимум 3 символа.' },
      { status: 400 }
    );
  }

  if (mode === 'suggest') {
    return NextResponse.json({
      suggestions: getPromptSuggestions(query),
    });
  }

  const results = searchPrompts({ query, category });

  return NextResponse.json({
    results,
    suggestions: getPromptSuggestions(query),
    total: results.length,
  });
}
