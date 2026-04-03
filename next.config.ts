import path from 'node:path'
import type { NextConfig } from 'next'

const strapiUrl =
  process.env.STRAPI_URL?.trim() ||
  process.env.NEXT_PUBLIC_STRAPI_URL?.trim()

const remotePatterns: NonNullable<NextConfig['images']>['remotePatterns'] = []

if (strapiUrl) {
  try {
    const url = new URL(
      strapiUrl.startsWith('http://') || strapiUrl.startsWith('https://')
        ? strapiUrl
        : `https://${strapiUrl}`
    )

    remotePatterns.push({
      protocol: url.protocol.replace(':', '') as 'http' | 'https',
      hostname: url.hostname,
      port: url.port || undefined,
      pathname: '/uploads/**',
    })
  } catch {
    // Ignore malformed STRAPI_URL values so the build can continue.
  }
}

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.resolve(__dirname),
  async redirects() {
    return [
      {
        source: '/stati',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/stati/:slug',
        destination: '/blog/:slug',
        permanent: true,
      },
    ]
  },
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    remotePatterns,
  },
}

export default nextConfig
