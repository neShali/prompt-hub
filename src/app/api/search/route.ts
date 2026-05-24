import { NextRequest, NextResponse } from 'next/server';

import { getPromptSuggestions, searchPrompts } from '@/shared/lib/search/searchPrompts';
import { TPromptCategory } from '@/shared/types/prompt';

const MIN_QUERY_LENGTH = 3;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q')?.trim() ?? '';
  const category = (searchParams.get('category') ?? '') as TPromptCategory | '';
  const mode = searchParams.get('mode');

  await new Promise((resolve) => setTimeout(resolve, 260));

  if (query === 'network-error') {
    return NextResponse.json({ message: 'Поиск временно недоступен.' }, { status: 500 });
  }

  if (query.length > 0 && query.length < MIN_QUERY_LENGTH) {
    return NextResponse.json(
      { message: 'Уточните запрос, чтобы мы подобрали более точные результаты.' },
      { status: 400 }
    );
  }

  if (mode === 'suggest') {
    return NextResponse.json({ suggestions: getPromptSuggestions(query) });
  }

  const results = searchPrompts({ query, category });

  return NextResponse.json({
    query,
    category,
    total: results.length,
    results,
  });
}
