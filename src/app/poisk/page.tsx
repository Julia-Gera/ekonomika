import SearchPageClient from '@/components/sections/SearchPageClient'
import { getArticleTopics, getArticles, getNews, getServices } from '@/lib/api'

export const dynamic = 'force-dynamic'

export default async function PoiskPage() {
  const [articleTopics, news, articles, services] = await Promise.all([
    getArticleTopics(100),
    getNews(200),
    getArticles(200),
    getServices(100),
  ])

  return (
    <SearchPageClient
      articleTopics={articleTopics}
      news={news}
      articles={articles}
      services={services}
    />
  )
}
