import { NextRequest, NextResponse } from 'next/server';
import { fetchNewsList } from '@/lib/cms';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const limit = Number.parseInt(searchParams.get('limit') || '20', 10);

  const news = await fetchNewsList({ limit: Number.isNaN(limit) ? 20 : limit });
  return NextResponse.json(news);
}
