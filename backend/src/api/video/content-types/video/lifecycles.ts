function getYouTubeId(rawUrl?: string | null): string | null {
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

function applyYouTubePreview(data: Record<string, unknown>) {
  const youtubeUrl = typeof data.youtubeUrl === 'string' ? data.youtubeUrl : null
  const youtubeId = getYouTubeId(youtubeUrl)

  if (youtubeId) {
    data.previewUrl = `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`
  }
}

export default {
  beforeCreate(event: { params: { data: Record<string, unknown> } }) {
    applyYouTubePreview(event.params.data)
  },

  beforeUpdate(event: { params: { data: Record<string, unknown> } }) {
    applyYouTubePreview(event.params.data)
  },
}
