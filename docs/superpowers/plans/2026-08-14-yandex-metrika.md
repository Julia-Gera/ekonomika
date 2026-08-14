# Yandex Metrika Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Подключить счётчик Яндекс Метрики `111598594` ко всем маршрутам и корректно регистрировать клиентские переходы Next.js App Router.

**Architecture:** Серверный компонент `YandexMetrika` загружает и инициализирует счётчик через `next/script` и выводит `noscript`-пиксель. Изолированный клиентский компонент наблюдает за pathname/query, пропускает первоначальный эффект и вызывает `hit` только после навигации без перезагрузки; чистые функции построения скрипта и page-view тестируются встроенным `node:test` без новых зависимостей.

**Tech Stack:** Next.js 16.2.1 App Router, React 19.2.4, TypeScript 5, Node.js 22 `node:test`.

## Global Constraints

- Счётчик загружается сразу после гидратации, без cookie-баннера.
- Используется публичный идентификатор `111598594`; новая переменная окружения не требуется.
- Сохраняются параметры `ssr`, `webvisor`, `clickmap`, `ecommerce: "dataLayer"`, `accurateTrackBounce` и `trackLinks`.
- Первый просмотр не дублируется, а изменения pathname/query отправляются через `hit`.
- Новые runtime- и dev-зависимости не добавляются.
- Незавершённые пользовательские изменения вне файлов этого плана не изменяются и не включаются в коммиты.

---

## File Map

- Create `src/components/analytics/yandex-metrika.ts`: номер счётчика, тип `window.ym`, построение исходного сниппета и чистые функции для SPA-просмотров.
- Create `src/components/analytics/YandexMetrikaNavigation.tsx`: наблюдение за клиентской навигацией.
- Create `src/components/analytics/YandexMetrika.tsx`: глобальный `Script`, `noscript` и `Suspense`-граница.
- Create `tests/yandex-metrika.test.mjs`: unit-тесты сниппета, initial/duplicate guard и вызова `hit`.
- Create `tests/yandex-metrika.integration.mjs`: проверка реального HTML, отданного Next.js dev server.
- Modify `src/app/layout.tsx`: одно глобальное подключение `YandexMetrika`.
- Modify `package.json`: команда `npm test` на встроенном Node test runner.

### Task 1: Чистое ядро интеграции

**Files:**
- Create: `tests/yandex-metrika.test.mjs`
- Create: `src/components/analytics/yandex-metrika.ts`
- Modify: `package.json`

**Interfaces:**
- Produces: `YANDEX_METRIKA_ID: 111598594`, `YandexMetrikaFunction`, `buildYandexMetrikaScript(counterId?: number): string`, `createNavigationPageView(previousUrl: string | null, currentUrl: string, title: string): NavigationPageView | null`, `sendYandexMetrikaPageView(ym, pageView): void`.

- [ ] **Step 1: Добавить команду тестирования**

В `package.json` добавить в `scripts`:

```json
"test": "node --no-warnings --experimental-strip-types --test tests/*.test.mjs"
```

- [ ] **Step 2: Написать падающие unit-тесты**

Создать `tests/yandex-metrika.test.mjs`:

```js
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
```

- [ ] **Step 3: Запустить тест и подтвердить ожидаемое падение**

Run: `npm test`

Expected: FAIL с `ERR_MODULE_NOT_FOUND` для `src/components/analytics/yandex-metrika.ts`.

- [ ] **Step 4: Реализовать минимальное ядро**

Создать `src/components/analytics/yandex-metrika.ts`:

```ts
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
```

- [ ] **Step 5: Запустить unit-тесты**

Run: `npm test`

Expected: 4 tests PASS.

- [ ] **Step 6: Зафиксировать ядро**

```bash
git add package.json tests/yandex-metrika.test.mjs src/components/analytics/yandex-metrika.ts
git commit -m "feat: add Yandex Metrika tracking core"
```

### Task 2: Компоненты и глобальное подключение

**Files:**
- Create: `tests/yandex-metrika.integration.mjs`
- Create: `src/components/analytics/YandexMetrikaNavigation.tsx`
- Create: `src/components/analytics/YandexMetrika.tsx`
- Modify: `src/app/layout.tsx`
- Modify: `package.json`

**Interfaces:**
- Consumes: `YANDEX_METRIKA_ID`, `buildYandexMetrikaScript`, `createNavigationPageView`, `sendYandexMetrikaPageView` из Task 1.
- Produces: default-компоненты `YandexMetrikaNavigation(): null` и `YandexMetrika(): ReactElement`.

- [ ] **Step 1: Добавить падающий интеграционный тест**

В `package.json` добавить команду:

```json
"test:integration": "node --test tests/yandex-metrika.integration.mjs"
```

Создать `tests/yandex-metrika.integration.mjs`:

```js
import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import test from 'node:test'

const projectDirectory = fileURLToPath(new URL('..', import.meta.url))
const port = 33157
const pageUrl = `http://127.0.0.1:${port}`

async function readHomePage() {
  for (let attempt = 0; attempt < 100; attempt += 1) {
    try {
      const response = await fetch(pageUrl)
      if (response.ok) return response.text()
    } catch {
      // The dev server is still starting.
    }

    await new Promise((resolve) => setTimeout(resolve, 200))
  }

  throw new Error('Next.js dev server did not become ready')
}

test('serves Yandex Metrika on every page from the root layout', { timeout: 30000 }, async (t) => {
  const server = spawn(
    process.execPath,
    ['node_modules/next/dist/bin/next', 'dev', '--hostname', '127.0.0.1', '--port', String(port)],
    { cwd: projectDirectory, stdio: 'ignore' },
  )

  t.after(() => server.kill('SIGTERM'))

  const html = await readHomePage()

  assert.match(html, /yandex-metrika/)
  assert.match(html, /tag\.js\?id=111598594/)
  assert.match(html, /mc\.yandex\.ru\/watch\/111598594/)
})
```

- [ ] **Step 2: Запустить тест и подтвердить ожидаемое падение**

Run: `npm test`

Run: `npm run test:integration`

Expected: FAIL в тесте `serves Yandex Metrika on every page from the root layout`, потому что исходный HTML ещё не содержит счётчик.

- [ ] **Step 3: Реализовать наблюдатель навигации**

Создать `src/components/analytics/YandexMetrikaNavigation.tsx`:

```tsx
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
```

- [ ] **Step 4: Реализовать глобальный компонент счётчика**

Создать `src/components/analytics/YandexMetrika.tsx`:

```tsx
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
```

- [ ] **Step 5: Подключить компонент в корневом layout**

В `src/app/layout.tsx` добавить импорт:

```tsx
import YandexMetrika from '@/components/analytics/YandexMetrika'
```

И один экземпляр первым дочерним элементом `<body>`:

```tsx
<body className={cygre.className}>
  <YandexMetrika />
  <ConsultationProvider>
```

- [ ] **Step 6: Запустить тесты и статические проверки**

Run: `npm test`

Expected: 4 tests PASS.

Run: `npm run test:integration`

Expected: 1 integration test PASS.

Run: `npm run lint`

Expected: exit 0 без новых ошибок.

- [ ] **Step 7: Зафиксировать компоненты**

```bash
git add package.json tests/yandex-metrika.integration.mjs src/components/analytics/YandexMetrikaNavigation.tsx src/components/analytics/YandexMetrika.tsx src/app/layout.tsx
git commit -m "feat: integrate Yandex Metrika"
```

### Task 3: Production- и браузерная проверка

**Files:**
- Modify only if verification exposes a defect in the files from Tasks 1–2.

**Interfaces:**
- Consumes: полностью подключённый `YandexMetrika` и команда `npm test`.
- Produces: подтверждённая production-сборка и доказательство одного initial view плюс SPA `hit`.

- [ ] **Step 1: Запустить полный автоматический набор**

Run: `npm test`

Expected: 4 tests PASS.

Run: `npm run test:integration`

Expected: 1 integration test PASS.

Run: `npm run lint`

Expected: exit 0.

Run: `npm run build`

Expected: exit 0, все маршруты успешно собраны.

- [ ] **Step 2: Запустить приложение для smoke-теста**

Run: `npm run dev`

Expected: сервер отвечает на `http://localhost:3000`.

- [ ] **Step 3: Проверить первоначальную загрузку**

В браузере открыть `/`, убедиться, что в DOM присутствует `yandex-metrika`, `window.ym` является функцией или очередью и код содержит `tag.js?id=111598594`. Один первоначальный просмотр должен создаваться вызовом `init`.

- [ ] **Step 4: Проверить SPA-переход**

Перед переходом временно перехватить вызовы `window.ym`, перейти по внутренней ссылке без перезагрузки и подтвердить ровно один вызов:

```js
[111598594, 'hit', 'http://localhost:3000/uslugi', {
  title: 'Услуги',
  referer: 'http://localhost:3000/',
}]
```

- [ ] **Step 5: Проверить безопасный отказ**

Заблокировать `https://mc.yandex.ru/metrika/tag.js`, обновить страницу и перейти по внутренней ссылке. Ожидаемый результат: интерфейс и навигация работают, необработанных ошибок нет.

- [ ] **Step 6: Зафиксировать только необходимые исправления**

Если проверки потребовали изменений:

```bash
git add package.json tests/yandex-metrika.test.mjs tests/yandex-metrika.integration.mjs src/app/layout.tsx src/components/analytics/yandex-metrika.ts src/components/analytics/YandexMetrikaNavigation.tsx src/components/analytics/YandexMetrika.tsx
git commit -m "fix: harden Yandex Metrika integration"
```

Если дефектов нет, дополнительный коммит не создаётся.
