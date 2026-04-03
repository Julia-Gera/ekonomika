import 'server-only'

const LOCAL_SITE_URL = 'http://localhost:3000'

function normalizeUrl(value: string) {
  return value.startsWith('http://') || value.startsWith('https://')
    ? value
    : `https://${value}`
}

export function getSiteUrl() {
  const value =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim() ||
    process.env.VERCEL_URL?.trim()

  return new URL(value ? normalizeUrl(value) : LOCAL_SITE_URL)
}

export function getStrapiUrl() {
  const value =
    process.env.STRAPI_URL?.trim() ||
    process.env.NEXT_PUBLIC_STRAPI_URL?.trim()

  if (!value) {
    return null
  }

  try {
    return new URL(normalizeUrl(value))
  } catch {
    return null
  }
}
