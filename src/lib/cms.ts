const DEFAULT_API_URL = 'https://news-cms-api.chdhyc.workers.dev/api';
const DEFAULT_SITE_SLUG = 'ra2web';
const REVALIDATE_SECONDS = 60;

function getApiBase(): string {
  return (process.env.CMS_API_URL || process.env.NEXT_PUBLIC_CMS_API_URL || DEFAULT_API_URL).replace(/\/$/, '');
}

function getSiteSlug(): string {
  return process.env.CMS_SITE_SLUG || process.env.NEXT_PUBLIC_CMS_SITE_SLUG || DEFAULT_SITE_SLUG;
}

type FetchOptions = RequestInit & {
  headers?: Record<string, string>;
};

async function cmsFetch<T>(path: string, options: FetchOptions = {}): Promise<T> {
  const url = `${getApiBase()}${path.startsWith('/') ? path : `/${path}`}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      Accept: 'application/json',
      'User-Agent': 'Mozilla/5.0 (compatible; Ra2Web/1.0)',
      ...(options.headers || {}),
    },
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (!res.ok) {
    throw new Error(`CMS fetch failed: ${res.status} ${url}`);
  }

  return res.json() as Promise<T>;
}

export type CmsNewsListItem = {
  id: number;
  title: string;
  slug: string;
  summary?: string | null;
  cover_url?: string | null;
  category?: string;
  author?: string | null;
  published_at?: string;
};

export type CmsNewsDetail = CmsNewsListItem & {
  content: string;
  updated_at?: string;
};

export type CmsNewsSlug = {
  slug: string;
  updated_at: string;
};

export async function fetchNewsList({ limit = 10 }: { limit?: number } = {}): Promise<CmsNewsListItem[]> {
  const site = getSiteSlug();
  try {
    const data = await cmsFetch<CmsNewsListItem[]>(`/news?limit=${limit}&tag=${site}`);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export async function fetchNewsBySlug(slug: string): Promise<CmsNewsDetail | null> {
  try {
    return await cmsFetch<CmsNewsDetail>(`/news/${slug}`);
  } catch {
    return null;
  }
}

export async function fetchNewsSlugs(): Promise<CmsNewsSlug[]> {
  const site = getSiteSlug();
  try {
    const data = await cmsFetch<CmsNewsSlug[]>(`/news/slugs?tag=${site}`);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export { getApiBase, getSiteSlug, REVALIDATE_SECONDS };
