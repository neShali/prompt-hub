import { NextResponse } from 'next/server';

import { prompts } from '@/shared/mock/prompts';

export async function GET() {
  return NextResponse.json({ prompts, total: prompts.length });
}
