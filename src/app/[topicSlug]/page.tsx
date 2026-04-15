import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Breadcrumb from '@/components/ui/Breadcrumb'
import ArticleCard from '@/components/ui/ArticleCard'
import ContactFormSection from '@/components/sections/ContactFormSection'
import { getArticles, getArticleTopicBySlug, getArticleTopics } from '@/lib/api'
import { articles } from '@/lib/placeholder-data'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{ topicSlug: string }>
  searchParams?: Promise<{ page?: string | string[] | undefined }>
}

const ARTICLES_PER_PAGE = 9

const expert = {
  name: 'Валентина Митрофанова',
  role: 'Основательница консалтинговой компании "Митрофанова и партнёры"',
  image: '/images/about-hero.jpg',
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { topicSlug } = await params
  const topic = await getArticleTopicBySlug(topicSlug)

  if (!topic) {
    return { title: 'Тема не найдена' }
  }

  return {
    title: `${topic.title} — новости по теме`,
    description: topic.description,
  }
}

export async function generateStaticParams() {
  const topics = await getArticleTopics(100)
  return topics.map((topic) => ({ topicSlug: topic.slug }))
}

export default async function TopicPage({ params, searchParams }: Props) {
  const { topicSlug } = await params
  const topic = await getArticleTopicBySlug(topicSlug)

  if (!topic) {
    notFound()
  }

  const allArticles = await getArticles(1000)
  const relatedArticles = allArticles.length > 0
    ? allArticles.filter((article) => article.topicSlug === topic.slug)
    : articles.filter((article) => article.topicSlug === topic.slug)
  const resolvedSearchParams: { page?: string | string[] | undefined } =
    await (searchParams ?? Promise.resolve({ page: undefined }))
  const rawPage = Array.isArray(resolvedSearchParams.page)
    ? resolvedSearchParams.page[0]
    : resolvedSearchParams.page
  const requestedPage = Number(rawPage ?? '1')
  const totalPages = Math.max(1, Math.ceil(relatedArticles.length / ARTICLES_PER_PAGE))
  const currentPage = Number.isFinite(requestedPage) && requestedPage > 0
    ? Math.min(requestedPage, totalPages)
    : 1
  const pageStart = (currentPage - 1) * ARTICLES_PER_PAGE
  const paginatedArticles = relatedArticles.slice(pageStart, pageStart + ARTICLES_PER_PAGE)
  const paginationWindowStart = Math.max(1, Math.min(currentPage - 2, totalPages - 4))
  const visiblePages = Array.from(
    { length: Math.min(5, totalPages) },
    (_, index) => paginationWindowStart + index
  )

  const getPageHref = (page: number) => (
    page <= 1
      ? `/${topic.slug}`
      : `/${topic.slug}?page=${page}`
  )

  return (
    <>
      <section className="bg-[#E7E9EC] relative overflow-hidden">
        <div className="hidden md:block absolute left-0 top-[-3px] pointer-events-none select-none">
          <Image
            src="/images/hero-illustration.svg"
            alt=""
            width={593}
            height={677}
          />
        </div>

        <div className="max-w-[1440px] mx-auto px-[20px] md:px-[140px] relative pb-[40px] md:pb-[76px]">
          <div className="pt-[40px] md:pt-[76px]">
            <Breadcrumb items={[{ label: topic.title }]} />
          </div>

          <h1 className="mt-[18px] md:mt-[32px] text-[30px] md:text-[40px] font-normal leading-[1.15] tracking-[-1px] md:tracking-[-2px] text-[#0C2140]">
            {topic.title}
          </h1>

          <div className="mt-[24px] md:mt-[40px] bg-white px-[20px] py-[24px] md:px-[24px] md:py-[24px] lg:px-[32px] lg:py-[28px]">
            <div className="grid grid-cols-1 md:grid-cols-[220px_minmax(0,1fr)] gap-[24px] md:gap-[40px] items-start">
              <div className="border-b border-[#E7E9EC] pb-[20px] md:border-b-0 md:pb-0">
                <div className="relative w-[88px] h-[88px] overflow-hidden rounded-full mb-[14px]">
                  <Image
                    src={expert.image}
                    alt={expert.name}
                    fill
                    sizes="88px"
                    className="object-cover object-[50%_18%]"
                  />
                </div>
                <p className="text-[15px] font-normal leading-[1.25] text-[#0C2140]">
                  {expert.name}
                </p>
                <p className="mt-[10px] text-[14px] leading-[1.45] text-[#6D7A8C]">
                  {expert.role}
                </p>
              </div>

              <div className="relative">
                <span className="absolute left-0 top-[-10px] text-[72px] leading-none text-[#B6C5DC]">
                  &ldquo;
                </span>
                <div className="pl-[26px] md:pl-[60px] space-y-[18px] md:space-y-[22px]">
                  <p className="text-[18px] md:text-[20px] font-normal leading-[1.55] text-[#0C2140]">
                    {topic.lead || topic.description}
                  </p>
                  <p className="text-[16px] md:text-[18px] font-normal leading-[1.55] text-[#0C2140]">
                    {topic.body || 'В этом разделе собраны новости, кейсы и практические материалы по выбранной теме.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-[32px] md:mt-[40px]">
            <h2 className="text-[24px] md:text-[30px] font-normal text-[#0C2140] mb-[20px] md:mb-[32px]">
              Новости
            </h2>

            {relatedArticles.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[10px] md:gap-[12px]">
                  {paginatedArticles.map((article) => (
                    <ArticleCard
                      key={article.id}
                      date={article.date}
                      category={article.category}
                      title={article.title}
                      href={`/${topic.slug}/${article.slug}`}
                    />
                  ))}
                </div>

                {totalPages > 1 && (
                  <nav className="mt-[24px] md:mt-[28px] flex items-center gap-[10px] md:gap-[12px]" aria-label="Пагинация новостей">
                    {visiblePages.map((page) => {
                      const isActive = page === currentPage

                      return (
                        <Link
                          key={page}
                          href={getPageHref(page)}
                          aria-current={isActive ? 'page' : undefined}
                          className={
                            isActive
                              ? 'flex h-[40px] w-[40px] items-center justify-center bg-white text-[16px] font-normal text-[#0C2140]'
                              : 'flex h-[40px] min-w-[24px] items-center justify-center text-[16px] font-normal text-[#0C2140] transition-colors hover:text-[#556988]'
                          }
                        >
                          {page}
                        </Link>
                      )
                    })}
                  </nav>
                )}
              </>
            ) : (
              <div className="bg-white p-[24px] md:p-[32px]">
                <p className="text-[18px] md:text-[20px] font-normal text-[#0C2140]">
                  Новости по этой теме скоро появятся.
                </p>
                <p className="mt-[10px] text-[14px] md:text-[16px] leading-[1.55] text-[#6D7A8C] max-w-[640px]">
                  Мы уже подготовили структуру раздела. Когда материалы будут добавлены, они автоматически появятся в этой подборке.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <ContactFormSection />
    </>
  )
}
