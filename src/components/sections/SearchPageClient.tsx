'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import ContactFormSection from '@/components/sections/ContactFormSection'
import Breadcrumb from '@/components/ui/Breadcrumb'

interface SearchArticleTopic {
  slug: string
  title: string
  description: string
}

interface SearchArticle {
  slug: string
  title: string
  excerpt: string
  topicSlug?: string | null
}

interface SearchNews {
  slug: string
  title: string
  excerpt: string
  badge?: string
}

interface SearchService {
  slug: string
  title: string
  description: string
}

interface SearchPageClientProps {
  articleTopics: SearchArticleTopic[]
  news: SearchNews[]
  articles: SearchArticle[]
  services: SearchService[]
}

export default function SearchPageClient({
  articleTopics,
  news,
  articles,
  services,
}: SearchPageClientProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const [draftQuery, setDraftQuery] = useState(query)

  useEffect(() => {
    setDraftQuery(query)
  }, [query])

  const results = [
    ...articleTopics.map((topic) => ({
      title: topic.title,
      excerpt: topic.description,
      path: 'Главная',
      href: `/${topic.slug}`,
    })),
    ...news.map((item) => ({
      title: item.title,
      excerpt: item.excerpt,
      path: `Главная  ›  Новости${item.badge ? `  ›  ${item.badge}` : ''}`,
      href: `/novosti/${item.slug}`,
    })),
    ...articles.map((article) => ({
      title: article.title,
      excerpt: article.excerpt,
      path: `Главная  ›  Статьи  ›  ${articleTopics.find((topic) => topic.slug === article.topicSlug)?.title ?? 'Без категории'}`,
      href: article.topicSlug ? `/${article.topicSlug}/${article.slug}` : '/stati',
    })),
    ...services.map((service) => ({
      title: service.title,
      excerpt: service.description,
      path: 'Главная  ›  Услуги',
      href: `/uslugi/${service.slug}`,
    })),
  ].filter((result) => (
    !query
    || result.title.toLowerCase().includes(query.toLowerCase())
    || result.excerpt.toLowerCase().includes(query.toLowerCase())
  ))

  const highlightText = (text: string, currentQuery: string) => {
    if (!currentQuery) return <>{text}</>

    const idx = text.toLowerCase().indexOf(currentQuery.toLowerCase())
    if (idx === -1) return <>{text}</>

    return (
      <>
        {text.slice(0, idx)}
        <strong className="font-bold">{text.slice(idx, idx + currentQuery.length)}</strong>
        {text.slice(idx + currentQuery.length)}
      </>
    )
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const nextQuery = draftQuery.trim()

    if (!nextQuery) {
      router.push('/poisk')
      return
    }

    router.push(`/poisk?q=${encodeURIComponent(nextQuery)}`)
  }

  return (
    <>
      <div className="bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb items={[{ label: 'Поиск' }]} />
          <h1 className="text-3xl lg:text-4xl font-bold text-[#0C2140] text-center mb-6">Поиск</h1>

          <div className="max-w-[520px] mx-auto mb-8">
            <form onSubmit={handleSubmit} className="flex items-center border border-[#e5e7eb] bg-white rounded px-4 py-2.5 gap-3">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" className="shrink-0">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                type="text"
                value={draftQuery}
                onChange={(event) => setDraftQuery(event.target.value)}
                placeholder="Введите запрос"
                className="flex-1 bg-transparent text-sm text-[#0C2140] placeholder:text-gray-400 outline-none"
              />
            </form>
          </div>

          <div className="bg-white border border-[#e5e7eb] mb-8">
            {results.length > 0 ? results.map((result, index) => (
              <Link key={`${result.href}-${index}`} href={result.href} className="block border-b border-[#e5e7eb] p-6 transition-colors hover:bg-gray-50 last:border-b-0">
                <h3 className="text-base font-semibold text-[#0C2140] mb-1">{highlightText(result.title, query)}</h3>
                <p className="text-xs text-gray-400 mb-2">{result.path}</p>
                <p className="text-sm text-gray-600 leading-relaxed">... {highlightText(result.excerpt, query)} ...</p>
              </Link>
            )) : (
              <div className="p-12 text-center text-gray-400 text-sm">Ничего не найдено</div>
            )}

            {results.length > 0 && (
              <div className="px-6 py-4 flex items-center justify-between border-t border-[#e5e7eb]">
                <p className="text-xs text-gray-500">Найдено результатов: {results.length}</p>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="w-8 h-8 rounded-full bg-[#0C2140] flex items-center justify-center text-white hover:bg-[#304564] transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="18 15 12 9 6 15" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <ContactFormSection />
    </>
  )
}
