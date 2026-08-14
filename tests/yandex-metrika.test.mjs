import assert from 'node:assert/strict'
import test from 'node:test'

import {
  YANDEX_METRIKA_ID,
  buildYandexMetrikaScript,
  createNavigationPageView,
  sendYandexMetrikaPageView,
} from '../src/components/analytics/yandex-metrika.ts'

test('builds the supplied Yandex Metrika initialization', () => {
  const script = buildYandexMetrikaScript()

  assert.equal(YANDEX_METRIKA_ID, 111598594)
  assert.match(script, /tag\.js\?id=111598594/)
  assert.match(script, /ym\(111598594, 'init'/)
  assert.match(script, /ssr:true/)
  assert.match(script, /webvisor:true/)
  assert.match(script, /clickmap:true/)
  assert.match(script, /ecommerce:"dataLayer"/)
  assert.match(script, /accurateTrackBounce:true/)
  assert.match(script, /trackLinks:true/)
})

test('skips initial and duplicate navigation page views', () => {
  assert.equal(createNavigationPageView(null, 'https://site.test/', 'Главная'), null)
  assert.equal(
    createNavigationPageView('https://site.test/', 'https://site.test/', 'Главная'),
    null,
  )
})

test('builds and sends a page view after client navigation', () => {
  const calls = []
  const ym = (...args) => calls.push(args)
  const pageView = createNavigationPageView(
    'https://site.test/',
    'https://site.test/uslugi?from=home',
    'Услуги',
  )

  sendYandexMetrikaPageView(ym, pageView)

  assert.deepEqual(calls, [[
    111598594,
    'hit',
    'https://site.test/uslugi?from=home',
    { title: 'Услуги', referer: 'https://site.test/' },
  ]])
})

test('does nothing when Yandex Metrika is unavailable', () => {
  assert.doesNotThrow(() => sendYandexMetrikaPageView(undefined, {
    url: 'https://site.test/uslugi',
    title: 'Услуги',
    referer: 'https://site.test/',
  }))
})
