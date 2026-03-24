import type { Metadata } from 'next';
import Link from 'next/link';
import { articles } from '@/lib/placeholder-data';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return { title: 'Статья не найдена' };
  return {
    title: article.title,
    description: article.excerpt,
  };
}

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="bg-white">
      {/* Page header */}
      <div className="bg-[#f8f9fb] border-b border-gray-200 py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6 flex-wrap">
            <Link href="/" className="hover:text-[#0C2140] transition-colors">Главная</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-[#0C2140] transition-colors">Блог</Link>
            <span>/</span>
            <span className="text-[#0C2140] line-clamp-1">{article.title}</span>
          </nav>
          {article.category && (
            <span className="inline-block px-3 py-1 bg-[#3b82f6]/10 text-[#3b82f6] text-sm font-medium rounded mb-4">
              {article.category}
            </span>
          )}
          <h1 className="font-display font-bold text-3xl md:text-4xl text-[#0C2140] mb-4 leading-tight">
            {article.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>{article.date}</span>
          </div>
        </div>
      </div>

      {/* Article content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 text-xl leading-relaxed mb-8">
            {article.excerpt}
          </p>
          <div className="bg-[#f8f9fb] border-l-4 border-[#3b82f6] p-6 rounded-r-lg mb-8">
            <p className="text-gray-600 italic">
              Полное содержание статьи будет загружено из CMS после подключения Strapi.
            </p>
          </div>
        </div>

        {/* Back link */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[#0C2140] font-medium hover:text-[#2d4a6e] transition-colors"
          >
            <svg className="w-4 h-4 rotate-180" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
            Все статьи
          </Link>
        </div>
      </div>
    </div>
  );
}
