const path = require('node:path')
const Database = require('better-sqlite3')

const projectRoot = path.resolve(__dirname, '..')
const defaultTarget = path.join(projectRoot, '.tmp/data.db')
const sourcePath = process.env.SOURCE_DB || process.argv[2]
const targetPath = process.env.TARGET_DB || process.argv[3] || defaultTarget

if (!sourcePath) {
  console.error('Usage: SOURCE_DB=/path/to/backup.db node scripts/migrate-production-news-from-articles.js')
  process.exit(1)
}

function hasTable(db, tableName) {
  return Boolean(db.prepare(
    "select name from sqlite_master where type = 'table' and name = ?"
  ).get(tableName))
}

function getColumns(db, tableName) {
  return db.prepare(`pragma table_info("${tableName}")`).all().map((column) => column.name)
}

function questionMarks(count) {
  return Array.from({ length: count }, () => '?').join(', ')
}

function getExistingAdminIds(db) {
  if (!hasTable(db, 'admin_users')) {
    return new Set()
  }

  return new Set(db.prepare('select id from admin_users').all().map((row) => row.id))
}

const source = new Database(sourcePath, { readonly: true, fileMustExist: true })
const target = new Database(targetPath, { fileMustExist: true })

try {
  if (!hasTable(source, 'articles')) {
    throw new Error(`Source DB has no articles table: ${sourcePath}`)
  }

  if (!hasTable(target, 'news')) {
    throw new Error(`Target DB has no news table. Start Strapi once after deploying the new schema, then rerun this script: ${targetPath}`)
  }

  if (!hasTable(target, 'articles')) {
    throw new Error(`Target DB has no articles table: ${targetPath}`)
  }

  const publishedDocs = source.prepare(`
    select distinct document_id
    from articles
    where document_id is not null
      and published_at is not null
    order by document_id
  `).all().map((row) => row.document_id)

  if (publishedDocs.length === 0) {
    console.log('No published article documents found in source DB. Nothing to migrate.')
    process.exit(0)
  }

  const placeholders = questionMarks(publishedDocs.length)
  const sourceRows = source.prepare(`
    select
      document_id,
      title,
      slug,
      excerpt,
      content,
      date,
      category as badge,
      created_at,
      updated_at,
      published_at,
      created_by_id,
      updated_by_id,
      locale
    from articles
    where document_id in (${placeholders})
    order by document_id, published_at is not null, id
  `).all(...publishedDocs)

  const newsColumns = getColumns(target, 'news')
  const insertColumns = [
    'document_id',
    'title',
    'slug',
    'excerpt',
    'content',
    'date',
    'badge',
    'created_at',
    'updated_at',
    'published_at',
    'created_by_id',
    'updated_by_id',
    'locale',
  ].filter((column) => newsColumns.includes(column))

  const insertNews = target.prepare(`
    insert into news (${insertColumns.map((column) => `"${column}"`).join(', ')})
    values (${questionMarks(insertColumns.length)})
  `)
  const adminIds = getExistingAdminIds(target)

  const deleteExistingNews = target.prepare(`
    delete from news
    where document_id in (${placeholders})
  `)

  const liveArticleIds = target.prepare(`
    select id
    from articles
    where document_id in (${placeholders})
  `).all(...publishedDocs).map((row) => row.id)

  const migrate = target.transaction(() => {
    deleteExistingNews.run(...publishedDocs)

    for (const row of sourceRows) {
      insertNews.run(...insertColumns.map((column) => {
        if ((column === 'created_by_id' || column === 'updated_by_id') && !adminIds.has(row[column])) {
          return null
        }

        return row[column] ?? null
      }))
    }

    if (liveArticleIds.length > 0 && hasTable(target, 'articles_topic_lnk')) {
      target.prepare(`
        delete from articles_topic_lnk
        where article_id in (${questionMarks(liveArticleIds.length)})
      `).run(...liveArticleIds)
    }

    target.prepare(`
      delete from articles
      where document_id in (${placeholders})
    `).run(...publishedDocs)
  })

  migrate()

  const migratedDocs = source.prepare(`
    select document_id, title, slug, category as badge
    from articles
    where document_id in (${placeholders})
      and published_at is not null
    order by date desc, id desc
  `).all(...publishedDocs)

  console.log(JSON.stringify({
    source: sourcePath,
    target: targetPath,
    documents: migratedDocs,
    insertedNewsRows: sourceRows.length,
    removedArticleRows: liveArticleIds.length,
  }, null, 2))
} finally {
  source.close()
  target.close()
}
