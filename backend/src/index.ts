import type { Core } from '@strapi/strapi'

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    // Открываем публичный доступ (find + findOne) для articles, article-topics и services
    const publicRole = await strapi
      .query('plugin::users-permissions.role')
      .findOne({ where: { type: 'public' } })

    if (!publicRole) return

    const permissionsToEnable = [
      'api::article.article.find',
      'api::article.article.findOne',
      'api::article-topic.article-topic.find',
      'api::article-topic.article-topic.findOne',
      'api::service.service.find',
      'api::service.service.findOne',
    ]

    for (const action of permissionsToEnable) {
      const existing = await strapi
        .query('plugin::users-permissions.permission')
        .findOne({ where: { action, role: publicRole.id } })

      if (existing) {
        if (!existing.enabled) {
          await strapi
            .query('plugin::users-permissions.permission')
            .update({ where: { id: existing.id }, data: { enabled: true } })
        }
      } else {
        await strapi
          .query('plugin::users-permissions.permission')
          .create({ data: { action, role: publicRole.id, enabled: true } })
      }
    }

    const topicDocuments = strapi.documents('api::article-topic.article-topic')
    const articleDocuments = strapi.documents('api::article.article')

    const topics = await topicDocuments.findMany({
      status: 'draft',
      fields: ['documentId', 'slug'],
      page: 1,
      pageSize: 200,
    })

    const topicDocumentIdBySlug = new Map(
      topics
        .filter((topic) => topic.slug && topic.documentId)
        .map((topic) => [topic.slug, topic.documentId])
    )

    const articles = await articleDocuments.findMany({
      status: 'published',
      fields: ['documentId', 'topicSlug', 'title'],
      populate: {
        topic: {
          fields: ['documentId'],
        },
      },
      page: 1,
      pageSize: 1000,
    })

    let syncedTopics = 0

    for (const article of articles) {
      const topicSlug = article.topicSlug?.trim()

      if (!article.documentId || !topicSlug || article.topic?.documentId) {
        continue
      }

      const topicDocumentId = topicDocumentIdBySlug.get(topicSlug)
      if (!topicDocumentId) {
        continue
      }

      await articleDocuments.update({
        documentId: article.documentId,
        data: {
          topic: {
            documentId: topicDocumentId,
          },
        },
      })

      await articleDocuments.publish({
        documentId: article.documentId,
      })

      syncedTopics += 1
    }

    if (syncedTopics > 0) {
      strapi.log.info(`Synced article topics from topicSlug for ${syncedTopics} article(s)`)
    }
  },
}
