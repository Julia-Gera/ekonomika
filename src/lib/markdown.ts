import 'server-only'
import MarkdownIt from 'markdown-it'

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
