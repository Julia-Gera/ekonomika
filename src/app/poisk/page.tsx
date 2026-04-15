'use client'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'
import ContactFormSection from '@/components/sections/ContactFormSection'
import Breadcrumb from '@/components/ui/Breadcrumb'
import { articleTopics, services, articles } from '@/lib/placeholder-data'

function PoiskContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const [draftQuery, setDraftQuery] = useState(query)

  useEffect(() => {
    setDraftQuery(query)
  }, [query])

  const results = [
    ...articleTopics.map(topic => ({ title: topic.title, excerpt: topic.description, path: 'Главная', href: `/${topic.slug}` })),
    ...articles.map(a => ({ title: a.title, excerpt: a.excerpt, path: `Главная  ›  ${articleTopics.find(topic => topic.slug === a.topicSlug)?.title ?? 'Новость'}`, href: a.topicSlug ? `/${a.topicSlug}/${a.slug}` : '/' })),
    ...services.map(s => ({ title: s.title, excerpt: s.description, path: 'Главная  ›  Услуги', href: `/uslugi/${s.slug}` })),
  ].filter(r => !query || r.title.toLowerCase().includes(query.toLowerCase()) || r.excerpt.toLowerCase().includes(query.toLowerCase()))

  const highlightText = (text: string, q: string) => {
    if (!q) return <>{text}</>
    const idx = text.toLowerCase().indexOf(q.toLowerCase())
    if (idx === -1) return <>{text}</>
    return <>{text.slice(0, idx)}<strong className="font-bold">{text.slice(idx, idx + q.length)}</strong>{text.slice(idx + q.length)}</>
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

          {/* Search bar */}
          <div className="max-w-[520px] mx-auto mb-8">
            <form onSubmit={handleSubmit} className="flex items-center border border-[#e5e7eb] bg-white rounded px-4 py-2.5 gap-3">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" className="shrink-0">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
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

          {/* Results */}
          <div className="bg-white border border-[#e5e7eb] mb-8">
            {results.length > 0 ? results.map((r, i) => (
              <Link key={i} href={r.href} className="block border-b border-[#e5e7eb] p-6 transition-colors hover:bg-gray-50 last:border-b-0">
                <h3 className="text-base font-semibold text-[#0C2140] mb-1">{highlightText(r.title, query)}</h3>
                <p className="text-xs text-gray-400 mb-2">{r.path}</p>
                <p className="text-sm text-gray-600 leading-relaxed">... {highlightText(r.excerpt, query)} ...</p>
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

export default function PoiskPage() {
  return (
    <Suspense fallback={null}>
      <PoiskContent />
    </Suspense>
  )
}
