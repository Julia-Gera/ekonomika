import 'server-only'

// Reuse Strapi's markdown parser so article content from the CMS renders
// consistently whether it is stored as markdown or already contains HTML.
// eslint-disable-next-line @typescript-eslint/no-require-imports
const MarkdownIt = require('../../backend/node_modules/markdown-it')

const markdown = new MarkdownIt({
  html: true,
  breaks: true,
  linkify: true,
  typographer: false,
})

export function renderRichTextContent(value: string) {
  const trimmed = value.trim()

  if (!trimmed) {
    return ''
  }

  return markdown.render(trimmed)
}
