import type { Metadata } from 'next'
import Breadcrumb from '@/components/ui/Breadcrumb'
import ArticleCard from '@/components/ui/ArticleCard'
import ContactFormSection from '@/components/sections/ContactFormSection'
import { getArticles } from '@/lib/api'

export const metadata: Metadata = {
  title: 'Статьи',
  description: 'Экспертные статьи по экономике труда.',
}

export default async function ArticlesPage() {
  const articles = await getArticles(1000)

  return (
    <>
      <section className="bg-[#E7E9EC] py-[40px] md:py-[76px]">
        <div className="max-w-[1440px] mx-auto px-[20px] md:px-[140px]">
          <Breadcrumb items={[{ label: 'Статьи' }]} />

          <h1 className="mt-[18px] md:mt-[24px] text-[30px] md:text-[40px] font-normal leading-[1.15] tracking-[-1px] md:tracking-[-2px] text-[#0C2140]">
            Статьи
          </h1>

          {articles.length > 0 ? (
            <div className="mt-[24px] md:mt-[32px] grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[10px] md:gap-[12px]">
              {articles.map((article) => (
                <ArticleCard
                  key={article.id}
                  date={article.date}
                  badge={article.category}
                  title={article.title}
                  href={article.topicSlug ? `/${article.topicSlug}/${article.slug}` : '/stati'}
                />
              ))}
            </div>
          ) : (
            <div className="mt-[24px] md:mt-[32px] bg-white p-[24px] md:p-[32px]">
              <p className="text-[18px] md:text-[20px] font-normal text-[#0C2140]">
                Статьи скоро появятся.
              </p>
            </div>
          )}
        </div>
      </section>

      <ContactFormSection />
    </>
  )
}
