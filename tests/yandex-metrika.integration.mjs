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
