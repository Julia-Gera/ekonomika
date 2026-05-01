import type { Metadata } from 'next'
import Image from 'next/image'
import Breadcrumb from '@/components/ui/Breadcrumb'
import ArticleCard from '@/components/ui/ArticleCard'
import ArticleSharePanel from '@/components/ui/ArticleSharePanel'
import ContactFormSection from '@/components/sections/ContactFormSection'
import { getNews, getNewsBySlug } from '@/lib/api'
import { renderRichTextContent } from '@/lib/markdown'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{ newsSlug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { newsSlug } = await params
  const newsItem = await getNewsBySlug(newsSlug)

  if (!newsItem) {
    return { title: 'Новость не найдена' }
  }

  return {
    title: newsItem.title,
    description: newsItem.excerpt,
  }
}

export async function generateStaticParams() {
  const news = await getNews(1000)

  return news.map((newsItem) => ({
    newsSlug: newsItem.slug,
  }))
}

export default async function NewsItemPage({ params }: Props) {
  const { newsSlug } = await params
  const newsItem = await getNewsBySlug(newsSlug)

  if (!newsItem) {
    notFound()
  }

  const allNews = await getNews(50)
  const related = allNews
    .filter((item) => item.slug !== newsSlug)
    .slice(0, 3)
  const newsHtml = newsItem.content ? renderRichTextContent(newsItem.content) : ''

  return (
    <>
      <div className="bg-[#E7E9EC]">
        <div className="max-w-[1260px] mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
          <Breadcrumb items={[
            { label: 'Новости', href: '/novosti' },
            { label: newsItem.title },
          ]} />

          <h1 className="mt-[18px] max-w-[1050px] text-[34px] font-normal leading-[1.02] tracking-[-0.04em] text-[#0C2140] md:text-[58px]">
            {newsItem.title}
          </h1>

          <div className="mb-[46px] mt-[26px] flex flex-wrap items-center gap-4 md:gap-7">
            <span className="text-[16px] font-normal leading-none text-[#0C2140] md:text-[18px]">{newsItem.date}</span>
            {newsItem.badge && (
              <span className="rounded-full bg-white/65 px-5 py-[8px] text-[13px] font-normal leading-none text-[#556988] shadow-[inset_0_0_0_1px_rgba(158,166,179,0.08)] backdrop-blur-[2px]">
                {newsItem.badge}
              </span>
            )}
          </div>

          {newsItem.cover && (
            <div className="relative mb-12 aspect-[12/5] w-full overflow-hidden rounded-[4px]">
              <Image
                src={newsItem.cover}
                alt={newsItem.title}
                fill
                sizes="(min-width: 1200px) 1200px, 100vw"
                className="object-cover"
              />
            </div>
          )}

          <div className="article-body-shell max-w-[620px]">
            {newsHtml ? (
              <div
                className="article-content text-[#0C2140]"
                dangerouslySetInnerHTML={{ __html: newsHtml }}
              />
            ) : (
              <p className="text-gray-600 text-lg leading-relaxed">{newsItem.excerpt}</p>
            )}
          </div>

          <ArticleSharePanel title={newsItem.title} />

          {related.length > 0 && (
            <div className="print:hidden">
              <h2 className="mt-[70px] mb-[34px] text-[40px] font-normal leading-[1.05] tracking-[-0.03em] text-[#0C2140]">
                Читайте также
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-[12px]">
                {related.map((relatedNews) => (
                  <ArticleCard
                    key={relatedNews.id}
                    date={relatedNews.date}
                    badge={relatedNews.badge}
                    title={relatedNews.title}
                    href={`/novosti/${relatedNews.slug}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="print:hidden">
        <ContactFormSection />
      </div>
    </>
  )
}
