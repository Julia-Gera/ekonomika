import type { Metadata } from 'next'
import Image from 'next/image'
import Breadcrumb from '@/components/ui/Breadcrumb'
import ArticleCard from '@/components/ui/ArticleCard'
import ArticleSharePanel from '@/components/ui/ArticleSharePanel'
import ContactFormSection from '@/components/sections/ContactFormSection'
import { getArticleBySlug, getArticles, getArticleTopicBySlug } from '@/lib/api'
import { renderRichTextContent } from '@/lib/markdown'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{ topicSlug: string; articleSlug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { articleSlug } = await params
  const article = await getArticleBySlug(articleSlug)

  if (!article) {
    return { title: 'Статья не найдена' }
  }

  return {
    title: article.title,
    description: article.excerpt,
  }
}

export async function generateStaticParams() {
  const articles = await getArticles(1000)

  return articles
    .filter((article) => article.topicSlug)
    .map((article) => ({
      topicSlug: article.topicSlug,
      articleSlug: article.slug,
    }))
}

export default async function ArticlePage({ params }: Props) {
  const { topicSlug, articleSlug } = await params
  const article = await getArticleBySlug(articleSlug)

  if (!article || article.topicSlug !== topicSlug) {
    notFound()
  }

  const topic = article.topicSlug
    ? await getArticleTopicBySlug(article.topicSlug)
    : null
  const allArticles = await getArticles(50)
  const related = allArticles
    .filter((item) => item.topicSlug === article.topicSlug && item.slug !== articleSlug)
    .slice(0, 3)
  const articleHtml = article.content ? renderRichTextContent(article.content) : ''

  return (
    <>
      <div className="bg-[#E7E9EC]">
        <div className="max-w-[1260px] mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
          <Breadcrumb items={[
            ...(topic ? [{ label: topic.title, href: `/${topic.slug}` }] : []),
            { label: article.title },
          ]} />

          <h1 className="mt-[18px] max-w-[1050px] text-[34px] font-normal leading-[1.02] tracking-[-0.04em] text-[#0C2140] md:text-[58px]">
            {article.title}
          </h1>

          <div className="mb-[46px] mt-[26px] flex flex-wrap items-center gap-4 md:gap-7">
            <span className="text-[16px] font-normal leading-none text-[#0C2140] md:text-[18px]">{article.date}</span>
            {article.category && (
              <span className="rounded-full bg-white/65 px-5 py-[8px] text-[13px] font-normal leading-none text-[#556988] shadow-[inset_0_0_0_1px_rgba(158,166,179,0.08)] backdrop-blur-[2px]">
                {article.category}
              </span>
            )}
          </div>

          {article.cover && (
            <div className="relative mb-12 aspect-[12/5] w-full overflow-hidden rounded-[4px]">
              <Image
                src={article.cover}
                alt={article.title}
                fill
                sizes="(min-width: 1200px) 1200px, 100vw"
                className="object-cover"
              />
            </div>
          )}

          <div className="article-body-shell max-w-[620px]">
            {articleHtml ? (
              <div
                className="article-content text-[#0C2140]"
                dangerouslySetInnerHTML={{ __html: articleHtml }}
              />
            ) : (
              <p className="text-gray-600 text-lg leading-relaxed">{article.excerpt}</p>
            )}
          </div>

          <ArticleSharePanel title={article.title} />

          {related.length > 0 && (
            <div className="print:hidden">
              <h2 className="mt-[70px] mb-[34px] text-[40px] font-normal leading-[1.05] tracking-[-0.03em] text-[#0C2140]">
                Читайте также
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-[12px]">
                {related.map((relatedArticle) => (
                  <ArticleCard
                    key={relatedArticle.id}
                    date={relatedArticle.date}
                    category={relatedArticle.category}
                    title={relatedArticle.title}
                    href={relatedArticle.topicSlug ? `/${relatedArticle.topicSlug}/${relatedArticle.slug}` : '/'}
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
