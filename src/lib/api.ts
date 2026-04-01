/**
 * Единый слой данных для статей и услуг.
 * Приоритет: Strapi CMS → placeholder-data (для разработки без CMS).
 */
import { getArticles as strapiGetArticles, getArticleBySlug as strapiGetArticleBySlug, getServices as strapiGetServices, getServiceBySlug as strapiGetServiceBySlug } from './strapi'
import { articles as placeholderArticles, services as placeholderServices } from './placeholder-data'
import type { Article, Service } from './strapi'

export type { Article, Service }

// ─── Статьи ───────────────────────────────────────────────────────────────────

export async function getArticles(limit = 10): Promise<Article[]> {
  const items = await strapiGetArticles(limit)
  if (items.length > 0) return items

  // fallback: placeholder-data
  return placeholderArticles.slice(0, limit).map(a => ({
    id: a.id,
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt,
    content: '',
    date: a.date,
    category: a.category,
    cover: null,
  }))
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const item = await strapiGetArticleBySlug(slug)
  if (item) return item

  // fallback: placeholder-data
  const a = placeholderArticles.find(a => a.slug === slug)
  if (!a) return null
  return {
    id: a.id,
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt,
    content: '',
    date: a.date,
    category: a.category,
    cover: null,
  }
}

export async function getAllArticleSlugs(): Promise<string[]> {
  const items = await strapiGetArticles(1000)
  if (items.length > 0) return items.map(a => a.slug)
  return placeholderArticles.map(a => a.slug)
}

// ─── Услуги ───────────────────────────────────────────────────────────────────

export async function getServices(limit = 20): Promise<Service[]> {
  const items = await strapiGetServices(limit)
  if (items.length > 0) return items

  return placeholderServices.map(s => ({
    id: s.id,
    slug: s.slug,
    title: s.title,
    description: s.description,
    content: '',
    number: s.number,
    order: s.order,
    price: s.price,
    icon: s.icon ?? null,
  }))
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const item = await strapiGetServiceBySlug(slug)
  if (item) return item

  const s = placeholderServices.find(s => s.slug === slug)
  if (!s) return null
  return {
    id: s.id,
    slug: s.slug,
    title: s.title,
    description: s.description,
    content: '',
    number: s.number,
    order: s.order,
    price: s.price,
    icon: s.icon ?? null,
  }
}
