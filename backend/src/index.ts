import type { Core } from '@strapi/strapi'

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    // Открываем публичный доступ (find + findOne) для articles и services
    const publicRole = await strapi
      .query('plugin::users-permissions.role')
      .findOne({ where: { type: 'public' } })

    if (!publicRole) return

    const permissionsToEnable = [
      'api::article.article.find',
      'api::article.article.findOne',
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
  },
}
