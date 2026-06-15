import 'server-only'
import MarkdownIt from 'markdown-it'

const markdown = new MarkdownIt({
  html: true,
  breaks: true,
  linkify: true,
  typographer: false,
})

markdown.renderer.rules.table_open = () => '<div class="article-table-scroll"><table>\n'
markdown.renderer.rules.table_close = () => '</table></div>\n'

export function renderRichTextContent(value: string) {
  const trimmed = value.trim()

  if (!trimmed) {
    return ''
  }

  return markdown.render(trimmed)
}
