import SearchPageClient from '@/components/sections/SearchPageClient'
import { getArticleTopics, getArticles, getServices } from '@/lib/api'

export const dynamic = 'force-dynamic'

export default async function PoiskPage() {
  const [articleTopics, articles, services] = await Promise.all([
    getArticleTopics(100),
    getArticles(200),
    getServices(100),
  ])

  return (
    <SearchPageClient
      articleTopics={articleTopics}
      articles={articles}
      services={services}
    />
  )
}
