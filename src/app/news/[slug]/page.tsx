import { fetchNewsBySlug } from '@/lib/cms';
import { normalizeEditorContent } from '@/lib/content-normalize';
import SubpageLayout from '@/components/SubpageLayout';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ShareBar, { MobileShareBar } from '@/components/ShareBar';
import NewsTag from '@/components/NewsTag';

export default async function NewsDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await fetchNewsBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <SubpageLayout title="新闻中心">
      <article className="max-w-4xl mx-auto py-12 px-4 md:px-0">
        <header className="mb-12 border-b border-gray-100 pb-10 text-left">
          <div className="flex flex-col items-start gap-4">
            <NewsTag category={post.category || '公告'} className="text-[12px] px-3 mb-2" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight tracking-tight max-w-3xl">
              {post.title}
            </h1>
            <div className="flex items-center justify-start gap-4 text-gray-400 text-sm italic mt-2">
              <span className="flex items-center gap-1.5 font-medium not-italic text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {post.author || 'Ra2Web'}
              </span>
              <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
              <span className="flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                发布于 {new Date(post.published_at || '').toLocaleDateString()}
              </span>
            </div>
          </div>
        </header>

        <div className="flex flex-col lg:flex-row gap-12 relative">
          <ShareBar />

          <div className="flex-1">
            {post.cover_url && (
              <div className="mb-12 rounded-xl overflow-hidden shadow-xl border border-gray-100">
                <img 
                  src={post.cover_url} 
                  alt={post.title} 
                  className="w-full h-auto object-cover"
                />
              </div>
            )}

            <div
              className="news-content leading-relaxed"
              dangerouslySetInnerHTML={{ __html: normalizeEditorContent(post.content) }}
            />

            <MobileShareBar />

            <footer className="mt-20 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
              <Link href="/news" className="text-gray-500 hover:text-[#ff9408] transition-colors flex items-center gap-2 font-bold group">
                <span className="group-hover:-translate-x-1 transition-transform">←</span> 返回新闻中心
              </Link>
              <div className="text-xs text-gray-400 font-mono">
                最后更新：{new Date(post.updated_at || '').toLocaleString()}
              </div>
            </footer>
          </div>
        </div>
      </article>
    </SubpageLayout>
  );
}
