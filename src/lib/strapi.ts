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
  topicSlug?: string | null
  cover?: string | null  // URL обложки
}

export interface News {
  id: number
  slug: string
  title: string
  excerpt: string
  content: string
  date: string
  badge: string
  cover?: string | null
}

export interface ArticleTopic {
  id: number
  slug: string
  title: string
  description: string
  lead: string
  body: string
  number: string
  icon?: string | null
}

export interface Service {
  id: number
  slug: string
  title: string
  description: string
  content: string
  pageContent?: ServicePageContent | null
  number: string
  order: number
  price: string
  icon?: string | null
}

export interface ServicePageContent {
  summaryTitle?: string
  summaryText?: string[]
  sections?: ServicePageSection[]
}

export interface ServicePageSection {
  title: string
  text?: string[]
  items?: string[]
  cards?: string[]
  table?: ServicePageTable
}

export interface ServicePageTable {
  headers: string[]
  rows: string[][]
}

interface StrapiMedia {
  url?: string | null
}

interface StrapiArticleRecord {
  id: number
  documentId?: string
  slug?: string
  title?: string
  excerpt?: string
  content?: string
  date?: string | null
  publishedAt?: string | null
  topic?: StrapiArticleTopicRecord | null
  cover?: StrapiMedia | null
}

interface StrapiNewsRecord {
  id: number
  documentId?: string
  slug?: string
  title?: string
  excerpt?: string
  content?: string
  date?: string | null
  publishedAt?: string | null
  badge?: string
  cover?: StrapiMedia | null
}

interface StrapiServiceRecord {
  id: number
  slug?: string
  title?: string
  description?: string
  content?: string
  pageContent?: ServicePageContent | null
  number?: string
  order?: number
  price?: string
  icon?: StrapiMedia | null
}

interface StrapiArticleTopicRecord {
  id: number
  slug?: string
  title?: string
  description?: string
  lead?: string
  body?: string
  number?: string
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
  const topicTitle = item.topic?.title?.trim()
  const topicSlug = item.topic?.slug?.trim()

  return {
    id: item.id,
    slug: item.slug ?? '',
    title: item.title ?? '',
    excerpt: item.excerpt ?? '',
    content: item.content ?? '',
    date: item.date ? formatDate(item.date) : formatDate(item.publishedAt),
    category: topicTitle ?? '',
    topicSlug: topicSlug ?? null,
    cover,
  }
}

function mapNews(item: StrapiNewsRecord): News {
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
    badge: item.badge ?? '',
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
    pageContent: item.pageContent ?? null,
    number: item.number ?? '',
    order: item.order ?? 0,
    price: item.price ?? '',
    icon,
  }
}

function mapArticleTopic(item: StrapiArticleTopicRecord): ArticleTopic {
  const icon = item.icon?.url ? getMediaUrl(item.icon) : null

  return {
    id: item.id,
    slug: item.slug ?? '',
    title: item.title ?? '',
    description: item.description ?? '',
    lead: item.lead ?? '',
    body: item.body ?? '',
    number: item.number ?? '',
    icon,
  }
}

// ─── API функции ──────────────────────────────────────────────────────────────

export async function getArticles(limit = 10, page = 1): Promise<Article[]> {
  const data = await fetchFromStrapi<StrapiCollectionResponse<StrapiArticleRecord>>(
    'articles',
    {
      'populate': '*',
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

export async function getNews(limit = 10, page = 1): Promise<News[]> {
  const data = await fetchFromStrapi<StrapiCollectionResponse<StrapiNewsRecord>>(
    'news',
    {
      'populate': '*',
      'pagination[pageSize]': String(limit),
      'pagination[page]': String(page),
      'sort': 'date:desc',
    }
  )

  if (!data?.data?.length) {
    return []
  }

  return data.data.map(mapNews)
}

export async function getNewsBySlug(slug: string): Promise<News | null> {
  const data = await fetchFromStrapi<StrapiCollectionResponse<StrapiNewsRecord>>(
    'news',
    {
      'filters[slug][$eq]': slug,
      'populate': '*',
    }
  )

  const item = data?.data?.[0]
  if (!item) {
    return null
  }

  return mapNews(item)
}

export async function getArticleTopics(limit = 20): Promise<ArticleTopic[]> {
  const data = await fetchFromStrapi<StrapiCollectionResponse<StrapiArticleTopicRecord>>(
    'article-topics',
    {
      populate: 'icon',
      'pagination[pageSize]': String(limit),
      sort: 'number:asc',
    }
  )

  if (!data?.data?.length) {
    return []
  }

  return data.data.map(mapArticleTopic)
}

export async function getArticleTopicBySlug(slug: string): Promise<ArticleTopic | null> {
  const data = await fetchFromStrapi<StrapiCollectionResponse<StrapiArticleTopicRecord>>(
    'article-topics',
    {
      'filters[slug][$eq]': slug,
      populate: '*',
    }
  )

  const item = data?.data?.[0]
  if (!item) {
    return null
  }

  return mapArticleTopic(item)
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
