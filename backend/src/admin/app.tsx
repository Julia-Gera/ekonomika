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
        'content-manager.content-types.api::article.article.cover': 'Обложка',
        'content-manager.content-types.api::news-item.news-item.title': 'Заголовок',
        'content-manager.content-types.api::news-item.news-item.slug': 'Адрес страницы',
        'content-manager.content-types.api::news-item.news-item.excerpt': 'Краткое описание',
        'content-manager.content-types.api::news-item.news-item.content': 'Текст новости',
        'content-manager.content-types.api::news-item.news-item.date': 'Дата публикации',
        'content-manager.content-types.api::news-item.news-item.badge': 'Бейдж',
        'content-manager.content-types.api::news-item.news-item.cover': 'Обложка',
        'content-manager.content-types.api::service.service.title': 'Название',
        'content-manager.content-types.api::service.service.slug': 'Адрес страницы',
        'content-manager.content-types.api::service.service.description': 'Краткое описание',
        'content-manager.content-types.api::service.service.content': 'Текст услуги',
        'content-manager.content-types.api::service.service.pageContent': 'Контент страницы',
        'content-manager.content-types.api::service.service.number': 'Номер',
        'content-manager.content-types.api::service.service.order': 'Порядок',
        'content-manager.content-types.api::service.service.price': 'Цена',
        'content-manager.content-types.api::service.service.icon': 'Иконка',
      },
    },
  },
  bootstrap(_app: StrapiApp) {},
};
