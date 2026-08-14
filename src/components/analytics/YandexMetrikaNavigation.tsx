'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'
import {
  createNavigationPageView,
  sendYandexMetrikaPageView,
} from './yandex-metrika'

export default function YandexMetrikaNavigation() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const search = searchParams.toString()
  const previousUrlRef = useRef<string | null>(null)

  useEffect(() => {
    const currentUrl = window.location.href
    const pageView = createNavigationPageView(
      previousUrlRef.current,
      currentUrl,
      document.title,
    )

    previousUrlRef.current = currentUrl
    sendYandexMetrikaPageView(window.ym, pageView)
  }, [pathname, search])

  return null
}
