export const YANDEX_METRIKA_ID = 111598594

export type YandexMetrikaFunction = (
  counterId: number,
  method: string,
  ...parameters: unknown[]
) => void

declare global {
  interface Window {
    ym?: YandexMetrikaFunction
  }
}

export interface NavigationPageView {
  url: string
  title: string
  referer: string
}

export function buildYandexMetrikaScript(
  counterId = YANDEX_METRIKA_ID,
): string {
  return `
    (function(m,e,t,r,i,k,a){
      m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
      m[i].l=1*new Date();
      for (var j = 0; j < document.scripts.length; j++) {
        if (document.scripts[j].src === r) { return; }
      }
      k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,
      a.parentNode.insertBefore(k,a)
    })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=${counterId}', 'ym');

    ym(${counterId}, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", referrer:document.referrer, url:location.href, accurateTrackBounce:true, trackLinks:true});
  `
}

export function createNavigationPageView(
  previousUrl: string | null,
  currentUrl: string,
  title: string,
): NavigationPageView | null {
  if (previousUrl === null || previousUrl === currentUrl) return null

  return { url: currentUrl, title, referer: previousUrl }
}

export function sendYandexMetrikaPageView(
  ym: YandexMetrikaFunction | undefined,
  pageView: NavigationPageView | null,
): void {
  if (typeof ym !== 'function' || pageView === null) return

  ym(YANDEX_METRIKA_ID, 'hit', pageView.url, {
    title: pageView.title,
    referer: pageView.referer,
  })
}
