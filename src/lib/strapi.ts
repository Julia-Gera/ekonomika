const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'

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

// ─── Базовый fetch ────────────────────────────────────────────────────────────

async function fetchFromStrapi<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
  const url = new URL(`${STRAPI_URL}/api/${endpoint}`)
  if (params) {
    Object.entries(params).forEach(([k, v]) => url.searchParams.append(k, v))
  }
  const res = await fetch(url.toString(), {
    next: { revalidate: 60 },
    headers: { 'Content-Type': 'application/json' },
  })
  if (!res.ok) throw new Error(`Strapi ${res.status}: ${endpoint}`)
  return res.json()
}

// ─── Маппинг Strapi v5 → формат приложения ───────────────────────────────────

function formatDate(raw: string | null | undefined): string {
  if (!raw) return ''
  const d = new Date(raw)
  return d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })
}

// Strapi v5: поля прямо на объекте (без .attributes)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapArticle(item: any): Article {
  const cover = item.cover?.url
    ? item.cover.url.startsWith('http')
      ? item.cover.url
      : `${STRAPI_URL}${item.cover.url}`
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapService(item: any): Service {
  const icon = item.icon?.url
    ? item.icon.url.startsWith('http')
      ? item.icon.url
      : `${STRAPI_URL}${item.icon.url}`
    : null
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
  try {
    const data = await fetchFromStrapi<any>('articles', {
      'populate': 'cover',
      'pagination[pageSize]': String(limit),
      'pagination[page]': String(page),
      'sort': 'date:desc',
    })
    return (data.data ?? []).map(mapArticle)
  } catch {
    return []
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const data = await fetchFromStrapi<any>('articles', {
      'filters[slug][$eq]': slug,
      'populate': '*',
    })
    const item = data.data?.[0]
    return item ? mapArticle(item) : null
  } catch {
    return null
  }
}

export async function getServices(limit = 20): Promise<Service[]> {
  try {
    const data = await fetchFromStrapi<any>('services', {
      'populate': 'icon',
      'pagination[pageSize]': String(limit),
      'sort': 'order:asc',
    })
    return (data.data ?? []).map(mapService)
  } catch {
    return []
  }
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  try {
    const data = await fetchFromStrapi<any>('services', {
      'filters[slug][$eq]': slug,
      'populate': '*',
    })
    const item = data.data?.[0]
    return item ? mapService(item) : null
  } catch {
    return null
  }
}
