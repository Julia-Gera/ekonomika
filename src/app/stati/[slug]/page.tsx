import Breadcrumb from '@/components/ui/Breadcrumb'
import ArticleCard from '@/components/ui/ArticleCard'
import ContactFormSection from '@/components/sections/ContactFormSection'
import { getArticleBySlug, getArticles, getAllArticleSlugs } from '@/lib/api'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllArticleSlugs()
  return slugs.map(slug => ({ slug }))
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) notFound()

  const allArticles = await getArticles(10)
  const related = allArticles.filter(a => a.slug !== slug).slice(0, 3)

  return (
    <>
      <div className="bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb items={[
            { label: 'Статьи', href: '/uslugi' },
            { label: article.title },
          ]} />

          <h1 className="text-2xl lg:text-3xl font-bold text-[#0C2140] leading-tight mb-4 max-w-3xl">
            {article.title}
          </h1>

          <div className="flex items-center gap-4 mb-8">
            <span className="text-sm text-gray-500">{article.date}</span>
            {article.category && (
              <span className="bg-[#E7E9EC] text-[#556988] text-xs px-3 py-1 rounded-full">
                {article.category}
              </span>
            )}
          </div>

          {/* Обложка */}
          {article.cover && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={article.cover}
              alt={article.title}
              className="w-full max-h-[400px] object-cover mb-8 rounded"
            />
          )}

          {/* Контент из Strapi */}
          <div className="max-w-3xl">
            {article.content ? (
              <div
                className="prose prose-lg max-w-none text-[#0C2140]"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            ) : (
              <p className="text-gray-600 text-lg leading-relaxed">{article.excerpt}</p>
            )}

            {/* Share */}
            <div className="border-t border-b border-[#e5e7eb] py-4 mt-10 mb-10 flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-6">
                <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#0C2140] transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                  </svg>
                  Скопировать ссылку
                </button>
                <div className="flex items-center gap-2">
                  {['VK', 'TG', 'OK'].map(s => (
                    <button key={s} className="w-7 h-7 bg-gray-100 hover:bg-gray-200 rounded text-xs font-bold text-gray-500 transition-colors">
                      {s[0]}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Читайте также */}
            {related.length > 0 && (
              <>
                <h2 className="text-xl font-bold text-[#0C2140] mb-6">Читайте также</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-[#e0e0e0]">
                  {related.map(a => (
                    <ArticleCard key={a.id} date={a.date} category={a.category} title={a.title} href={`/stati/${a.slug}`} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <ContactFormSection />
    </>
  )
}
