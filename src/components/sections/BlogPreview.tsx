import Link from 'next/link';
import { articles } from '@/lib/placeholder-data';

export default function BlogPreview() {
  return (
    <section className="bg-[#f8f9fb] py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div className="max-w-xl">
            <p className="text-[#3b82f6] text-sm font-semibold uppercase tracking-wider mb-3">
              Экспертные материалы
            </p>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-[#0C2140]">
              Блог
            </h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[#0C2140] font-medium hover:text-[#2d4a6e] transition-colors text-sm shrink-0"
          >
            Все статьи
            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </Link>
        </div>

        {/* Articles grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/stati/${article.slug}`}
              className="group bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200"
            >
              {/* Card image placeholder */}
              <div className="h-48 bg-[#0C2140]/5 flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
                </svg>
              </div>

              <div className="p-6">
                {article.category && (
                  <span className="inline-block px-2 py-0.5 bg-[#3b82f6]/10 text-[#3b82f6] text-xs font-medium rounded mb-3">
                    {article.category}
                  </span>
                )}
                <h3 className="font-display font-semibold text-[#0C2140] text-lg leading-snug mb-3 group-hover:text-[#2d4a6e] transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-400 border-t border-gray-100 pt-4 mt-auto">
                  <span>{article.date}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
