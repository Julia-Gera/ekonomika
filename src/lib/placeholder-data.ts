export const services = [
  { id: 1, number: '0.01', slug: 'nauchnaya-organizatsiya-truda', title: 'Научная организация труда (НОТ)', description: 'Системный подход к организации рабочих процессов', price: 'от 50 000 ₽', order: 1, icon: '/images/service-icon-1.svg' },
  { id: 2, number: '0.02', slug: 'upravlencheskiy-trud', title: 'Управленческий труд', description: 'Оценка и повышение эффективности управленческого персонала', price: 'от 60 000 ₽', order: 2, icon: '/images/service-icon-2.svg' },
  { id: 3, number: '0.03', slug: 'oplata-fot', title: 'Оплата ФОТ', description: 'Разработка эффективных систем оплаты труда', price: 'от 40 000 ₽', order: 3, icon: '/images/service-icon-3.svg' },
  { id: 4, number: '0.04', slug: 'rezhimy-surv', title: 'Режимы СУРВ', description: 'Суммированный учет рабочего времени', price: 'от 35 000 ₽', order: 4, icon: '/images/service-icon-4.svg' },
  { id: 5, number: '0.05', slug: 'optimizatsiya-chislennosti', title: 'Оптимизация численности', description: 'Анализ и оптимизация штатной численности', price: 'от 45 000 ₽', order: 5, icon: '/images/service-icon-5.svg' },
  { id: 6, number: '0.06', slug: 'anti-kpi', title: 'Анти KPI', description: 'Аудит и исправление системы KPI', price: 'от 55 000 ₽', order: 6, icon: '/images/service-icon-6.svg' },
  { id: 7, number: '0.07', slug: 'normirovanie-truda', title: 'Нормирование труда', description: 'Разработка и внедрение норм труда', price: 'от 40 000 ₽', order: 7, icon: '/images/service-icon-7.svg' },
  { id: 8, number: '0.08', slug: 'proizvoditelnost-truda', title: 'Производительность труда', description: 'Программы повышения производительности', price: 'от 50 000 ₽', order: 8, icon: '/images/service-icon-8.svg' },
]

export const articles = [
  {
    id: 1, slug: 'proverka-dogovorov-gpkh',
    title: 'Готовимся к проверке: проверяем договоры ГПХ на предмет рисков признания их трудовыми',
    excerpt: 'Система КPI должна отражать экономический результат деятельности подразделений и сотрудников.',
    date: '2 марта 2026', category: 'Готовимся к проверке/аудит',
    serviceSlug: 'rezhimy-surv',
  },
  {
    id: 2, slug: 'mify-o-personalnykh-dannykh',
    title: '5 мифов по работе с персональными данными! Проверь, какие мифы еще сохранились у вас в службе управления персоналом?',
    excerpt: 'Разбираем распространённые заблуждения о персональных данных сотрудников.',
    date: '24 февраля 2026', category: 'Персональные данные',
    serviceSlug: 'rezhimy-surv',
  },
  {
    id: 3, slug: 'bezopasnost-personalnykh-dannykh',
    title: 'Чек-лист: проверка безопасности при передаче персональных данных провайдерам и предотвращении утечек',
    excerpt: 'Подробный чек-лист для проверки защищённости персональных данных.',
    date: '24 февраля 2026', category: 'Персональные данные',
    serviceSlug: 'rezhimy-surv',
  },
]

export const documents = [
  { id: 1, title: 'Консультации по трудовому праву в режиме абонентского сопровождения', type: 'DOC', category: 'templates' },
  { id: 2, title: 'Разовые консультации по трудовому праву', type: 'PDF', category: 'templates' },
]
