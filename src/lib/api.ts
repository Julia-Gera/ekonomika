import 'server-only'
import { cache } from 'react'
/**
 * Единый слой данных для статей и услуг.
 * Приоритет: Strapi CMS → placeholder-data (для разработки без CMS).
 */
import { getStrapiUrl } from './site'
import { getArticles as strapiGetArticles, getArticleBySlug as strapiGetArticleBySlug, getArticleTopicBySlug as strapiGetArticleTopicBySlug, getArticleTopics as strapiGetArticleTopics, getServices as strapiGetServices, getServiceBySlug as strapiGetServiceBySlug } from './strapi'
import { articleTopics as placeholderArticleTopics, articles as placeholderArticles, services as placeholderServices } from './placeholder-data'
import type { Article, ArticleTopic, Service } from './strapi'

export type { Article, ArticleTopic, Service }

const HAS_STRAPI = Boolean(getStrapiUrl())

// ─── Статьи ───────────────────────────────────────────────────────────────────

export const getArticles = cache(async (limit = 10): Promise<Article[]> => {
  const items = await strapiGetArticles(limit)
  if (HAS_STRAPI) return items

  // fallback: placeholder-data
  return placeholderArticles.slice(0, limit).map(a => ({
    id: a.id,
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt,
    content: '',
    date: a.date,
    category: a.category,
    topicSlug: a.topicSlug,
    cover: null,
  }))
})

export const getArticleBySlug = cache(async (slug: string): Promise<Article | null> => {
  const item = await strapiGetArticleBySlug(slug)
  if (item || HAS_STRAPI) return item

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
    topicSlug: a.topicSlug,
    cover: null,
  }
})

export const getAllArticleSlugs = cache(async (): Promise<string[]> => {
  const items = await strapiGetArticles(1000)
  if (HAS_STRAPI) return items.map(a => a.slug)
  return placeholderArticles.map(a => a.slug)
})

export const getArticleTopics = cache(async (limit = 20): Promise<ArticleTopic[]> => {
  const items = await strapiGetArticleTopics(limit)
  if (HAS_STRAPI) return items

  return placeholderArticleTopics.slice(0, limit).map((topic) => ({
    id: topic.id,
    slug: topic.slug,
    title: topic.title,
    description: topic.description,
    lead: topic.lead,
    body: topic.body,
    number: topic.number,
    icon: topic.icon ?? null,
  }))
})

export const getArticleTopicBySlug = cache(async (slug: string): Promise<ArticleTopic | null> => {
  const item = await strapiGetArticleTopicBySlug(slug)
  if (item || HAS_STRAPI) return item

  const topic = placeholderArticleTopics.find((entry) => entry.slug === slug)
  if (!topic) return null

  return {
    id: topic.id,
    slug: topic.slug,
    title: topic.title,
    description: topic.description,
    lead: topic.lead,
    body: topic.body,
    number: topic.number,
    icon: topic.icon ?? null,
  }
})

// ─── Услуги ───────────────────────────────────────────────────────────────────

export const getServices = cache(async (limit = 20): Promise<Service[]> => {
  const items = await strapiGetServices(limit)
  if (HAS_STRAPI) return items

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
})

export const getServiceBySlug = cache(async (slug: string): Promise<Service | null> => {
  const item = await strapiGetServiceBySlug(slug)
  if (item || HAS_STRAPI) return item

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
})
