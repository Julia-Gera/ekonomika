import type { Metadata } from 'next'
import Image from 'next/image'
import Breadcrumb from '@/components/ui/Breadcrumb'
import ArticleCard from '@/components/ui/ArticleCard'
import ContactFormSection from '@/components/sections/ContactFormSection'
import { getArticleBySlug, getArticles, getAllArticleSlugs } from '@/lib/api'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticleBySlug(slug)

  if (!article) {
    return { title: 'Статья не найдена' }
  }

  return {
    title: article.title,
    description: article.excerpt,
  }
}

export async function generateStaticParams() {
  const slugs = await getAllArticleSlugs()
  return slugs.map(slug => ({ slug }))
}

export default async function BlogArticlePage({ params }: Props) {
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
            { label: 'Статьи', href: '/blog' },
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

          {article.cover && (
            <div className="relative mb-8 aspect-[12/5] w-full overflow-hidden rounded">
              <Image
                src={article.cover}
                alt={article.title}
                fill
                sizes="(min-width: 1200px) 1200px, 100vw"
                className="object-cover"
              />
            </div>
          )}

          <div className="max-w-3xl">
            {article.content ? (
              <div
                className="prose prose-lg max-w-none text-[#0C2140]"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            ) : (
              <p className="text-gray-600 text-lg leading-relaxed">{article.excerpt}</p>
            )}

            {related.length > 0 && (
              <>
                <h2 className="mt-10 mb-6 text-xl font-bold text-[#0C2140]">Читайте также</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-[#e0e0e0]">
                  {related.map(relatedArticle => (
                    <ArticleCard
                      key={relatedArticle.id}
                      date={relatedArticle.date}
                      category={relatedArticle.category}
                      title={relatedArticle.title}
                      href={`/blog/${relatedArticle.slug}`}
                    />
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
