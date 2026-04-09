import type { StrapiApp } from '@strapi/strapi/admin';

export default {
  config: {
    locales: ['ru'],
    translations: {
      ru: {
        'content-manager.content-types.api::article.article.title': 'Заголовок',
        'content-manager.content-types.api::article.article.slug': 'Адрес страницы',
        'content-manager.content-types.api::article.article.excerpt': 'Краткое описание',
        'content-manager.content-types.api::article.article.content': 'Текст статьи',
        'content-manager.content-types.api::article.article.date': 'Дата публикации',
        'content-manager.content-types.api::article.article.topic': 'Категория',
        'content-manager.content-types.api::article.article.category': 'Категория',
        'content-manager.content-types.api::article.article.cover': 'Обложка',
        'content-manager.content-types.api::article.article.topicSlug': 'Путь раздела',
      },
    },
  },
  bootstrap(_app: StrapiApp) {},
};
