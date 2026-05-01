import type { Metadata } from 'next'
import Breadcrumb from '@/components/ui/Breadcrumb'
import ArticleCard from '@/components/ui/ArticleCard'
import ContactFormSection from '@/components/sections/ContactFormSection'
import { getNews } from '@/lib/api'

export const metadata: Metadata = {
  title: 'Все новости',
  description: 'Все новости по экономике труда.',
}

export default async function NewsPage() {
  const news = await getNews(1000)

  return (
    <>
      <section className="bg-[#E7E9EC] py-[40px] md:py-[76px]">
        <div className="max-w-[1440px] mx-auto px-[20px] md:px-[140px]">
          <Breadcrumb items={[{ label: 'Все новости' }]} />

          <h1 className="mt-[18px] md:mt-[24px] text-[30px] md:text-[40px] font-normal leading-[1.15] tracking-[-1px] md:tracking-[-2px] text-[#0C2140]">
            Все новости
          </h1>

          <div className="mt-[24px] md:mt-[32px] grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[10px] md:gap-[12px]">
            {news.map((item) => (
              <ArticleCard
                key={item.id}
                date={item.date}
                badge={item.badge}
                title={item.title}
                href={`/novosti/${item.slug}`}
              />
            ))}
          </div>
        </div>
      </section>

      <ContactFormSection />
    </>
  )
}
