import Script from 'next/script'
import { Suspense } from 'react'
import YandexMetrikaNavigation from './YandexMetrikaNavigation'
import {
  buildYandexMetrikaScript,
  YANDEX_METRIKA_ID,
} from './yandex-metrika'

export default function YandexMetrika() {
  return (
    <>
      <Script id="yandex-metrika" strategy="afterInteractive">
        {buildYandexMetrikaScript()}
      </Script>
      <noscript>
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://mc.yandex.ru/watch/${YANDEX_METRIKA_ID}`}
            style={{ position: 'absolute', left: '-9999px' }}
            alt=""
          />
        </div>
      </noscript>
      <Suspense fallback={null}>
        <YandexMetrikaNavigation />
      </Suspense>
    </>
  )
}
