import Breadcrumb from '@/components/ui/Breadcrumb'
import ArticleCard from '@/components/ui/ArticleCard'
import ContactFormSection from '@/components/sections/ContactFormSection'
import { articles } from '@/lib/placeholder-data'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return articles.map(a => ({ slug: a.slug }))
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const article = articles.find(a => a.slug === slug)
  if (!article) notFound()
  const related = articles.filter(a => a.slug !== article.slug).slice(0, 3)

  return (
    <>
      <div className="bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb items={[
            { label: 'Режимы СУРВ', href: '/uslugi/rezhimy-surv' },
            { label: 'Статьи' }
          ]} />
          <h1 className="text-2xl lg:text-3xl font-bold text-[#0C2140] leading-tight mb-4 max-w-3xl">
            {article.title}
          </h1>
          <div className="flex items-center gap-4 mb-8">
            <span className="text-sm text-gray-500">{article.date}</span>
            {article.category && (
              <span className="bg-[#E7E9EC] text-[#556988] text-xs px-3 py-1 rounded-full">{article.category}</span>
            )}
          </div>

          {/* Article content */}
          <div className="max-w-3xl">
            <h2 className="text-lg font-bold text-[#0C2140] mb-4">Выявление формальных и манипулятивных показателей</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              Система КPI должна отражать экономический результат деятельности подразделений и сотрудников. На практике показатели часто превращаются в формальный инструмент отчетности, не связанный с управлением эффективностью.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed mb-8">
              Аудит КPI направлен на выявление методических ошибок, управленческих рисков и искажений поведения, которые формируются действующей системой оценки.
            </p>

            {/* Quote */}
            <blockquote className="bg-[#f8f9fb] border-l-4 border-[#c7d4e8] px-6 py-5 mb-8">
              <div className="text-3xl text-[#c7d4e8] font-serif leading-none mb-2">&ldquo;</div>
              <p className="text-sm text-[#0C2140] leading-relaxed font-medium">
                Современные режимы работы требуют гибких и эффективных систем учета рабочего времени. За 20 лет практики я убедилась, что правильная СУРВ позволяет не только контролировать время, но и повышать производительность.
              </p>
            </blockquote>

            <h2 className="text-lg font-bold text-[#0C2140] mb-4">Выявление формальных и манипулятивных показателей</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-8">
              {article.excerpt} Работодателей пугают трудозатраты на процедуры регламентации вопросов дисциплины труда в управленческих документах компании и фиксации дисциплинарных проступков.
            </p>

            {/* Share section */}
            <div className="border-t border-b border-[#e5e7eb] py-4 mb-10 flex items-center justify-between flex-wrap gap-4">
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
              <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#0C2140] transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
                Скачать PDF 0.1MB
              </button>
            </div>

            {/* Read also */}
            <h2 className="text-xl font-bold text-[#0C2140] mb-6">Читайте также</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-[#e0e0e0]">
              {related.map(a => (
                <ArticleCard key={a.id} date={a.date} category={a.category} title={a.title} href={`/stati/${a.slug}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <ContactFormSection />
    </>
  )
}
