import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getArticles } from '@/lib/api'

export const metadata: Metadata = {
  title: 'Блог',
  description: 'Экспертные статьи о трудовой экономике, системах оплаты труда, KPI и управлении персоналом.',
}

export default async function BlogPage() {
  const articles = await getArticles(50)

  return (
    <div className="bg-white">
      {/* Page header */}
      <div className="bg-[#f8f9fb] border-b border-gray-200 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-[#0C2140] transition-colors">Главная</Link>
            <span>/</span>
            <span className="text-[#0C2140]">Блог</span>
          </nav>
          <h1 className="font-display font-bold text-3xl md:text-4xl text-[#0C2140] mb-4">
            Блог
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl">
            Экспертные материалы о трудовой экономике, системах оплаты труда, KPI и HR-практиках.
          </p>
        </div>
      </div>

      {/* Articles */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {articles.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <p>Статьи появятся после добавления контента в CMS.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Link
                key={article.id}
                href={`/blog/${article.slug}`}
                className="group bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200 flex flex-col"
              >
                {article.cover ? (
                  <div className="relative h-48 w-full">
                    <Image
                      src={article.cover}
                      alt={article.title}
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="h-48 bg-[#0C2140]/5 flex items-center justify-center">
                    <svg className="w-12 h-12 text-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
                    </svg>
                  </div>
                )}
                <div className="p-6 flex flex-col flex-1">
                  {article.category && (
                    <span className="inline-block px-2 py-0.5 bg-[#3b82f6]/10 text-[#3b82f6] text-xs font-medium rounded mb-3 self-start">
                      {article.category}
                    </span>
                  )}
                  <h2 className="font-display font-semibold text-[#0C2140] text-lg leading-snug mb-3 group-hover:text-[#2d4a6e] transition-colors">
                    {article.title}
                  </h2>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-1">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-400 border-t border-gray-100 pt-4">
                    <span>{article.date}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
