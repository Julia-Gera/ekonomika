import 'server-only'
import { getStrapiUrl } from './site'

const STRAPI_URL = getStrapiUrl()
const STRAPI_TIMEOUT_MS = Number(process.env.STRAPI_TIMEOUT_MS ?? 2500)

// ─── Типы ────────────────────────────────────────────────────────────────────

export interface Article {
  id: number
  slug: string
  title: string
  excerpt: string
  content: string        // rich-text / markdown из Strapi
  date: string           // отформатированная дата, напр. «2 марта 2026»
  category: string
  cover?: string | null  // URL обложки
}

export interface Service {
  id: number
  slug: string
  title: string
  description: string
  content: string
  number: string
  order: number
  price: string
  icon?: string | null
}

interface StrapiMedia {
  url?: string | null
}

interface StrapiArticleRecord {
  id: number
  slug?: string
  title?: string
  excerpt?: string
  content?: string
  date?: string | null
  publishedAt?: string | null
  category?: string
  cover?: StrapiMedia | null
}

interface StrapiServiceRecord {
  id: number
  slug?: string
  title?: string
  description?: string
  content?: string
  number?: string
  order?: number
  price?: string
  icon?: StrapiMedia | null
}

interface StrapiCollectionResponse<T> {
  data?: T[]
}

// ─── Базовый fetch ────────────────────────────────────────────────────────────

async function fetchFromStrapi<T>(endpoint: string, params?: Record<string, string>): Promise<T | null> {
  if (!STRAPI_URL) {
    return null
  }

  const url = new URL(`/api/${endpoint}`, STRAPI_URL)
  if (params) {
    Object.entries(params).forEach(([k, v]) => url.searchParams.append(k, v))
  }

  try {
    const res = await fetch(url.toString(), {
      next: { revalidate: 60 },
      headers: { 'Content-Type': 'application/json' },
      signal: AbortSignal.timeout(STRAPI_TIMEOUT_MS),
    })

    if (!res.ok) {
      throw new Error(`Strapi ${res.status}: ${endpoint}`)
    }

    return res.json() as Promise<T>
  } catch {
    return null
  }
}

// ─── Маппинг Strapi v5 → формат приложения ───────────────────────────────────

function formatDate(raw: string | null | undefined): string {
  if (!raw) return ''
  const d = new Date(raw)
  return d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })
}

function getMediaUrl(media?: StrapiMedia | null) {
  if (!media?.url) {
    return null
  }

  if (media.url.startsWith('http')) {
    return media.url
  }

  return STRAPI_URL ? new URL(media.url, STRAPI_URL).toString() : null
}

function mapArticle(item: StrapiArticleRecord): Article {
  const cover = item.cover?.url
    ? getMediaUrl(item.cover)
    : null
  return {
    id: item.id,
    slug: item.slug ?? '',
    title: item.title ?? '',
    excerpt: item.excerpt ?? '',
    content: item.content ?? '',
    date: item.date ? formatDate(item.date) : formatDate(item.publishedAt),
    category: item.category ?? '',
    cover,
  }
}

function mapService(item: StrapiServiceRecord): Service {
  const icon = item.icon?.url ? getMediaUrl(item.icon) : null
  return {
    id: item.id,
    slug: item.slug ?? '',
    title: item.title ?? '',
    description: item.description ?? '',
    content: item.content ?? '',
    number: item.number ?? '',
    order: item.order ?? 0,
    price: item.price ?? '',
    icon,
  }
}

// ─── API функции ──────────────────────────────────────────────────────────────

export async function getArticles(limit = 10, page = 1): Promise<Article[]> {
  const data = await fetchFromStrapi<StrapiCollectionResponse<StrapiArticleRecord>>(
    'articles',
    {
      'populate': 'cover',
      'pagination[pageSize]': String(limit),
      'pagination[page]': String(page),
      'sort': 'date:desc',
    }
  )

  if (!data?.data?.length) {
    return []
  }

  return data.data.map(mapArticle)
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const data = await fetchFromStrapi<StrapiCollectionResponse<StrapiArticleRecord>>(
    'articles',
    {
      'filters[slug][$eq]': slug,
      'populate': '*',
    }
  )

  const item = data?.data?.[0]
  if (!item) {
    return null
  }

  return mapArticle(item)
}

export async function getServices(limit = 20): Promise<Service[]> {
  const data = await fetchFromStrapi<StrapiCollectionResponse<StrapiServiceRecord>>(
    'services',
    {
      'populate': 'icon',
      'pagination[pageSize]': String(limit),
      'sort': 'order:asc',
    }
  )

  if (!data?.data?.length) {
    return []
  }

  return data.data.map(mapService)
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const data = await fetchFromStrapi<StrapiCollectionResponse<StrapiServiceRecord>>(
    'services',
    {
      'filters[slug][$eq]': slug,
      'populate': '*',
    }
  )

  const item = data?.data?.[0]
  if (!item) {
    return null
  }

  return mapService(item)
}
