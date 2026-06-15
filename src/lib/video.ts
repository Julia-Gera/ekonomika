export type VideoPlatform = 'youtube' | 'rutube'

export interface VideoPlatformLink {
  platform: VideoPlatform
  label: string
  url: string
}

export interface VideoEpisode {
  id: number
  title: string
  description: string
  youtubeUrl?: string | null
  rutubeUrl?: string | null
  previewUrl?: string | null
  thumbnailUrl?: string | null
  embedUrl?: string | null
  date: string
  datePublished?: string | null
  tag: string
  order: number
  platformLinks: VideoPlatformLink[]
}

export function getYouTubeId(rawUrl?: string | null): string | null {
  if (!rawUrl) return null

  try {
    const url = new URL(rawUrl)
    const hostname = url.hostname.replace(/^www\./, '')

    if (hostname === 'youtu.be') {
      return url.pathname.split('/').filter(Boolean)[0] ?? null
    }

    if (hostname.endsWith('youtube.com')) {
      const fromQuery = url.searchParams.get('v')
      if (fromQuery) return fromQuery

      const segments = url.pathname.split('/').filter(Boolean)
      const markerIndex = segments.findIndex((segment) => ['embed', 'shorts', 'live'].includes(segment))
      if (markerIndex >= 0) {
        return segments[markerIndex + 1] ?? null
      }
    }
  } catch {
    return null
  }

  return null
}

export function getRutubeId(rawUrl?: string | null): string | null {
  if (!rawUrl) return null

  try {
    const url = new URL(rawUrl)
    const hostname = url.hostname.replace(/^www\./, '')
    if (!hostname.endsWith('rutube.ru')) return null

    const segments = url.pathname.split('/').filter(Boolean)
    const markerIndex = segments.findIndex((segment) => ['video', 'play', 'embed'].includes(segment))
    return markerIndex >= 0 ? segments[markerIndex + 1] ?? null : null
  } catch {
    return null
  }
}

export function getYouTubeThumbnail(rawUrl?: string | null): string | null {
  const id = getYouTubeId(rawUrl)
  return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : null
}

export function getYouTubeEmbedUrl(rawUrl?: string | null): string | null {
  const id = getYouTubeId(rawUrl)
  return id ? `https://www.youtube.com/embed/${id}` : null
}

export function getRutubeEmbedUrl(rawUrl?: string | null): string | null {
  const id = getRutubeId(rawUrl)
  return id ? `https://rutube.ru/play/embed/${id}` : null
}

export function getVideoEmbedUrl(youtubeUrl?: string | null, rutubeUrl?: string | null): string | null {
  return getYouTubeEmbedUrl(youtubeUrl) ?? getRutubeEmbedUrl(rutubeUrl)
}

export function getVideoLinks(youtubeUrl?: string | null, rutubeUrl?: string | null): VideoPlatformLink[] {
  const links: VideoPlatformLink[] = []

  if (youtubeUrl) {
    links.push({ platform: 'youtube', label: 'YouTube', url: youtubeUrl })
  }

  if (rutubeUrl) {
    links.push({ platform: 'rutube', label: 'Rutube', url: rutubeUrl })
  }

  return links
}
