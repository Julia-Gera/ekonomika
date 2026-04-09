const path = require('node:path')
const dotenv = require('dotenv')
const { createStrapi, compileStrapi } = require('@strapi/strapi')

const appDir = path.resolve(__dirname, '..')
dotenv.config({ path: path.join(appDir, '.env') })

const services = [
  {
    title: 'Научная организация труда (НОТ)',
    slug: 'nauchnaya-organizatsiya-truda',
    description: 'Системный подход к организации рабочих процессов',
    content: '<p>Услуга помогает выстроить рабочие процессы, распределить роли и снизить организационные потери времени.</p>',
    number: '0.01',
    order: 1,
    price: 'от 50 000 ₽',
  },
  {
    title: 'Управленческий труд',
    slug: 'upravlencheskiy-trud',
    description: 'Оценка и повышение эффективности управленческого персонала',
    content: '<p>Раздел про анализ управленческой нагрузки, ролей и качества принятия решений.</p>',
    number: '0.02',
    order: 2,
    price: 'от 60 000 ₽',
  },
  {
    title: 'Оплата ФОТ',
    slug: 'oplata-fot',
    description: 'Разработка эффективных систем оплаты труда',
    content: '<p>Подходы к выстраиванию системы оплаты труда, премирования и контроля фонда оплаты труда.</p>',
    number: '0.03',
    order: 3,
    price: 'от 40 000 ₽',
  },
  {
    title: 'Режимы СУРВ',
    slug: 'rezhimy-surv',
    description: 'Суммированный учет рабочего времени',
    content: '<p>Практика настройки суммированного учета рабочего времени, гибких графиков и сменных режимов.</p>',
    number: '0.04',
    order: 4,
    price: 'от 35 000 ₽',
  },
  {
    title: 'Оптимизация численности',
    slug: 'optimizatsiya-chislennosti',
    description: 'Анализ и оптимизация штатной численности',
    content: '<p>Материалы и подходы по оптимизации численности без потери ключевых функций.</p>',
    number: '0.05',
    order: 5,
    price: 'от 45 000 ₽',
  },
  {
    title: 'Анти KPI',
    slug: 'anti-kpi',
    description: 'Аудит и исправление системы KPI',
    content: '<p>Аудит KPI и устранение формальных показателей, которые мешают бизнес-результату.</p>',
    number: '0.06',
    order: 6,
    price: 'от 55 000 ₽',
  },
  {
    title: 'Нормирование труда',
    slug: 'normirovanie-truda',
    description: 'Разработка и внедрение норм труда',
    content: '<p>Подход к нормированию труда, замерам и расчёту рабочей нагрузки.</p>',
    number: '0.07',
    order: 7,
    price: 'от 40 000 ₽',
  },
  {
    title: 'Производительность труда',
    slug: 'proizvoditelnost-truda',
    description: 'Программы повышения производительности',
    content: '<p>Поиск и внедрение внутренних резервов роста производительности труда.</p>',
    number: '0.08',
    order: 8,
    price: 'от 50 000 ₽',
  },
]

const articleTopics = [
  {
    title: 'Научная организация труда (НОТ)',
    slug: 'nauchnaya-organizatsiya-truda',
    description: 'Материалы о выстраивании рабочих процессов, ролей и подходов к организации труда.',
    lead: 'Научная организация труда помогает выстроить работу так, чтобы процессы были понятными, предсказуемыми и экономически обоснованными.',
    body: 'В этой теме собраны статьи о том, как упорядочить рабочие процессы, убрать лишние потери времени и сделать организацию труда управляемой без избыточной бюрократии.',
    number: '0.01',
  },
  {
    title: 'Управленческий труд',
    slug: 'upravlencheskiy-trud',
    description: 'Статьи об управленческой нагрузке, ролях руководителей и качестве координации.',
    lead: 'Управленческий труд напрямую влияет на скорость решений, качество координации и устойчивость бизнеса в ежедневной работе.',
    body: 'Здесь мы собираем материалы о распределении управленческой нагрузки, ролях руководителей и подходах, которые помогают команде работать без управленческих перегрузок.',
    number: '0.02',
  },
  {
    title: 'Оплата ФОТ',
    slug: 'oplata-fot',
    description: 'Материалы о фонде оплаты труда, мотивации и связи затрат с результатом.',
    lead: 'Система оплаты труда должна не просто учитывать расходы, а поддерживать нужное поведение и финансовый результат компании.',
    body: 'В разделе собраны статьи о подходах к формированию ФОТ, устранению перекосов в премировании и связи оплаты труда с реальной эффективностью подразделений.',
    number: '0.03',
  },
  {
    title: 'Режимы СУРВ',
    slug: 'rezhimy-surv',
    description: 'Подборка статей о суммированном учёте рабочего времени и гибких режимах.',
    lead: 'Современные режимы работы требуют гибких и эффективных систем учета рабочего времени. Правильно настроенная СУРВ помогает не только контролировать часы, но и повышать производительность.',
    body: 'Особенно это актуально для компаний с гибким графиком, сменной занятостью и распределенными командами. Здесь собраны статьи о практических решениях, типичных ошибках и настройке работающей системы учета.',
    number: '0.04',
  },
  {
    title: 'Оптимизация численности',
    slug: 'optimizatsiya-chislennosti',
    description: 'Подходы к пересмотру структуры команды без потери управляемости.',
    lead: 'Оптимизация численности начинается не с сокращений, а с понимания реальной нагрузки, ролей и бизнес-задач команды.',
    body: 'На этой странице собраны статьи о том, как пересматривать структуру без потери ключевых функций, снижать издержки и одновременно сохранять управляемость бизнеса.',
    number: '0.05',
  },
  {
    title: 'Анти KPI',
    slug: 'anti-kpi',
    description: 'Материалы о формальных показателях и исправлении искажённой мотивации.',
    lead: 'Анти KPI возникают там, где показатели формально красивы, но подталкивают сотрудников к действиям, вредным для результата компании.',
    body: 'В теме собраны материалы о признаках неработающих KPI, искажениях в мотивации и о том, как превратить систему показателей в рабочий инструмент управления, а не в формальный отчет.',
    number: '0.06',
  },
  {
    title: 'Нормирование труда',
    slug: 'normirovanie-truda',
    description: 'Статьи о внедрении норм труда, замерах и расчёте нагрузки.',
    lead: 'Нормирование труда дает компании опору для расчета нагрузки, планирования численности и объективной оценки рабочих процессов.',
    body: 'Здесь собраны статьи о том, как подойти к нормированию без конфликтов с командой, какие данные собирать и как внедрять нормы так, чтобы ими реально пользовались.',
    number: '0.07',
  },
  {
    title: 'Производительность труда',
    slug: 'proizvoditelnost-truda',
    description: 'Материалы о поиске резервов роста производительности без перегруза команды.',
    lead: 'Рост производительности труда требует не давления на сотрудников, а системной работы с организацией процессов, ролями и потерями времени.',
    body: 'В разделе собраны статьи о поиске внутренних резервов, устранении организационных узких мест и подходах, которые дают measurable-эффект без перегрузки команды.',
    number: '0.08',
  },
]

const articles = [
  {
    title: 'Как внедрить элементы НОТ без сбоев в работе команды',
    slug: 'kak-vnedrit-elementy-not-bez-sboev-v-rabote',
    excerpt: 'Разбираем, какие принципы научной организации труда дают быстрый эффект без лишней бюрократии.',
    content: '<p>Научная организация труда помогает компании выстроить устойчивый рабочий ритм без перегрузки команды.</p><p>В тестовой статье можно проверить отображение заголовка, основного текста и блока связанных материалов.</p>',
    date: '2026-03-05',
    category: 'Научная организация труда',
    topicSlug: 'nauchnaya-organizatsiya-truda',
  },
  {
    title: 'Управленческий труд: где на самом деле теряется время руководителя',
    slug: 'upravlencheskiy-trud-gde-teryaetsya-vremya-rukovoditelya',
    excerpt: 'Показываем, как выявить перегруженные управленческие роли и вернуть фокус на результат.',
    content: '<p>Руководитель теряет время там, где процессы требуют ручной координации вместо понятной системы.</p><p>Эта публикация нужна как тестовый материал для карточек, категории и страницы статьи.</p>',
    date: '2026-03-04',
    category: 'Управленческий труд',
    topicSlug: 'upravlencheskiy-trud',
  },
  {
    title: 'Оплата ФОТ: как связать затраты на персонал с результатом бизнеса',
    slug: 'oplata-fot-kak-svyazat-zatraty-i-rezultat',
    excerpt: 'Практический подход к управлению фондом оплаты труда без хаотичных сокращений и перекосов.',
    content: '<p>ФОТ должен быть управляемым инструментом, а не просто суммой расходов на персонал.</p>',
    date: '2026-03-03',
    category: 'Оплата ФОТ',
    topicSlug: 'oplata-fot',
  },
  {
    title: 'Готовимся к проверке: проверяем договоры ГПХ на предмет рисков признания их трудовыми',
    slug: 'proverka-dogovorov-gpkh',
    excerpt: 'Практический чек-лист по проверке договоров, формулировок и процессов взаимодействия.',
    content: '<p>В этом материале собран базовый чек-лист для первичного аудита договоров ГПХ.</p>',
    date: '2026-03-02',
    category: 'Готовимся к проверке/аудит',
    topicSlug: 'rezhimy-surv',
  },
  {
    title: 'Оптимизация численности: когда меньше не значит лучше',
    slug: 'optimizatsiya-chislennosti-kogda-menshe-ne-znachit-luchshe',
    excerpt: 'Что нужно проверить до сокращений, чтобы не потерять управляемость и ключевые функции.',
    content: '<p>Сокращение штата без анализа нагрузки и ролей почти всегда создает новые потери для бизнеса.</p>',
    date: '2026-03-01',
    category: 'Оптимизация численности',
    topicSlug: 'optimizatsiya-chislennosti',
  },
  {
    title: 'Анти KPI: почему показатели выполняются, а результата нет',
    slug: 'anti-kpi-pochemu-pokazateli-vypolnyayutsya-a-rezultata-net',
    excerpt: 'Разбираем формальные KPI, которые создают видимость эффективности и мешают управлению.',
    content: '<p>Если KPI не связаны с результатом бизнеса, сотрудники учатся оптимизировать только цифры.</p>',
    date: '2026-02-28',
    category: 'Анти KPI',
    topicSlug: 'anti-kpi',
  },
  {
    title: '5 мифов по работе с персональными данными',
    slug: 'mify-o-personalnykh-dannykh',
    excerpt: 'Разбираем распространённые заблуждения о персональных данных сотрудников.',
    content: '<p>Даже базовые ошибки в процессах обработки персональных данных создают риски для компании.</p>',
    date: '2026-02-24',
    category: 'Персональные данные',
    topicSlug: 'rezhimy-surv',
  },
  {
    title: 'Чек-лист: проверка безопасности при передаче персональных данных провайдерам и предотвращении утечек',
    slug: 'bezopasnost-personalnykh-dannykh',
    excerpt: 'Подробный чек-лист для проверки защищённости персональных данных.',
    content: '<p>Материал помогает проверить подрядчиков и свои внутренние процессы на базовые уязвимости.</p>',
    date: '2026-02-24',
    category: 'Персональные данные',
    topicSlug: 'rezhimy-surv',
  },
  {
    title: 'СУРВ: как выстроить гибкий график без потери контроля',
    slug: 'surv-kak-vystroit-gibkiy-grafik-bez-poteri-kontrolya',
    excerpt: 'Практика настройки гибких режимов учета для команд с неравномерной загрузкой.',
    content: '<p>Гибкий график не должен разрушать управляемость. Важно заранее определить правила и точки контроля.</p>',
    date: '2026-02-22',
    category: 'Режимы СУРВ',
    topicSlug: 'rezhimy-surv',
  },
  {
    title: 'Ошибки при внедрении сменных режимов учета рабочего времени',
    slug: 'surv-oshibki-pri-vnedrenii-smennykh-rezhimov',
    excerpt: 'Какие просчеты чаще всего делают компании при переходе на СУРВ и как их избежать.',
    content: '<p>Ошибки в проектировании сменных графиков быстро приводят к конфликтам, переработкам и росту издержек.</p>',
    date: '2026-02-20',
    category: 'Режимы СУРВ',
    topicSlug: 'rezhimy-surv',
  },
  {
    title: 'Как согласовать учет рабочего времени с реальными бизнес-процессами',
    slug: 'surv-kak-soglasovat-uchet-vremeni-s-biznes-protsessami',
    excerpt: 'Подход к СУРВ, при котором правила учета не конфликтуют с операционной моделью компании.',
    content: '<p>Система учета времени должна следовать бизнес-процессам, а не ломать их формальными ограничениями.</p>',
    date: '2026-02-18',
    category: 'Режимы СУРВ',
    topicSlug: 'rezhimy-surv',
  },
  {
    title: 'Как уменьшить споры по переработкам в системе СУРВ',
    slug: 'surv-kak-umenshit-spory-po-pererabotkam',
    excerpt: 'Разбираем, какие настройки и документы помогают снизить конфликтность вокруг переработок.',
    content: '<p>Большинство споров по переработкам возникают из-за неясных правил, неравномерной нагрузки и слабой коммуникации.</p>',
    date: '2026-02-16',
    category: 'Режимы СУРВ',
    topicSlug: 'rezhimy-surv',
  },
  {
    title: 'Контроль времени в удалённых командах без тотального надзора',
    slug: 'surv-kontrol-vremeni-v-udalyonnykh-komandakh',
    excerpt: 'Что важно учитывать в СУРВ для дистанционной работы и распределенных команд.',
    content: '<p>Удаленные команды требуют других правил учета, чем офисная работа, но не требуют тотального контроля.</p>',
    date: '2026-02-14',
    category: 'Режимы СУРВ',
    topicSlug: 'rezhimy-surv',
  },
  {
    title: 'Как подготовить руководителей к новому режиму учета рабочего времени',
    slug: 'surv-kak-podgotovit-rukovoditeley-k-novomu-rezhimu',
    excerpt: 'Почему без обучения линейных менеджеров система учета времени быстро перестает работать.',
    content: '<p>Без вовлечения руководителей новый порядок учета времени почти всегда встречает пассивное сопротивление.</p>',
    date: '2026-02-12',
    category: 'Режимы СУРВ',
    topicSlug: 'rezhimy-surv',
  },
  {
    title: 'Методика аудита действующей системы учета рабочего времени',
    slug: 'surv-metodika-audita-deystvuyushchey-sistemy-ucheta',
    excerpt: 'Краткий разбор того, как оценить текущую систему СУРВ до ее перестройки.',
    content: '<p>Перед перестройкой режима учета важно сначала зафиксировать, как система работает сейчас и где дает сбои.</p>',
    date: '2026-02-10',
    category: 'Режимы СУРВ',
    topicSlug: 'rezhimy-surv',
  },
  {
    title: 'Нормирование труда: с чего начать без сопротивления команды',
    slug: 'normirovanie-truda-s-chego-nachat-bez-soprotivleniya-komandy',
    excerpt: 'Какие этапы подготовки и коммуникации нужны, чтобы нормы реально заработали на практике.',
    content: '<p>Нормирование лучше внедрять через понятную логику и открытое объяснение, а не через административное давление.</p>',
    date: '2026-02-20',
    category: 'Нормирование труда',
    topicSlug: 'normirovanie-truda',
  },
  {
    title: 'Производительность труда: где искать резервы без давления на сотрудников',
    slug: 'proizvoditelnost-truda-gde-iskat-rezervy-bez-davleniya-na-sotrudnikov',
    excerpt: 'Собрали базовые точки роста производительности, которые дают эффект без перегруза людей.',
    content: '<p>Резервы роста производительности часто скрыты в процессах, согласованиях и потерях времени, а не в самих людях.</p>',
    date: '2026-02-18',
    category: 'Производительность труда',
    topicSlug: 'proizvoditelnost-truda',
  },
]

async function loadStrapi() {
  const { distDir } = await compileStrapi({ appDir, ignoreDiagnostics: false })
  const strapi = createStrapi({ appDir, distDir })
  await strapi.load()
  return strapi
}

async function upsertBySlug(strapi, uid, data) {
  const documents = strapi.documents(uid)

  const existingDraft = await documents.findFirst({
    status: 'draft',
    filters: { slug: data.slug },
  })

  const existingPublished = existingDraft
    ? null
    : await documents.findFirst({
        status: 'published',
        filters: { slug: data.slug },
      })

  const existing = existingDraft ?? existingPublished

  if (existing) {
    await documents.update({
      documentId: existing.documentId,
      data,
    })
    await documents.publish({
      documentId: existing.documentId,
    })
    return 'updated'
  }

  const created = await documents.create({
    data,
  })

  await documents.publish({
    documentId: created.documentId,
  })

  return 'created'
}

async function main() {
  const strapi = await loadStrapi()

  try {
    if (process.argv.includes('--reset')) {
      await strapi.db.query('api::article.article').deleteMany({ where: {} })
      await strapi.db.query('api::article-topic.article-topic').deleteMany({ where: {} })
      await strapi.db.query('api::service.service').deleteMany({ where: {} })
      console.log('Reset existing article topics, articles and services')
    }

    let createdTopics = 0
    let updatedTopics = 0
    for (const topic of articleTopics) {
      const result = await upsertBySlug(strapi, 'api::article-topic.article-topic', topic)
      if (result === 'created') createdTopics += 1
      else updatedTopics += 1
    }

    const topicDocuments = strapi.documents('api::article-topic.article-topic')
    const storedTopics = await topicDocuments.findMany({
      status: 'draft',
      fields: ['documentId', 'slug'],
      page: 1,
      pageSize: 100,
    })

    const topicDocumentIdBySlug = new Map(
      storedTopics
        .filter((topic) => topic.slug && topic.documentId)
        .map((topic) => [topic.slug, topic.documentId])
    )

    let createdServices = 0
    let updatedServices = 0
    for (const service of services) {
      const result = await upsertBySlug(strapi, 'api::service.service', service)
      if (result === 'created') createdServices += 1
      else updatedServices += 1
    }

    let createdArticles = 0
    let updatedArticles = 0
    for (const article of articles) {
      const topicDocumentId = topicDocumentIdBySlug.get(article.topicSlug)
      const result = await upsertBySlug(strapi, 'api::article.article', {
        ...article,
        topic: topicDocumentId ? { documentId: topicDocumentId } : null,
      })
      if (result === 'created') createdArticles += 1
      else updatedArticles += 1
    }

    console.log(
      JSON.stringify(
        {
          articleTopics: { created: createdTopics, updated: updatedTopics },
          services: { created: createdServices, updated: updatedServices },
          articles: { created: createdArticles, updated: updatedArticles },
        },
        null,
        2
      )
    )
  } finally {
    await strapi.destroy()
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
