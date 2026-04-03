import Image from 'next/image'
import Breadcrumb from '@/components/ui/Breadcrumb'
import ArticleCard from '@/components/ui/ArticleCard'
import ContactFormSection from '@/components/sections/ContactFormSection'
import ConsultationButton from '@/components/ui/ConsultationButton'
import { services, articles } from '@/lib/placeholder-data'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return services.map(s => ({ slug: s.slug }))
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params
  const service = services.find(s => s.slug === slug)
  if (!service) notFound()

  const relatedArticles = articles.filter(a => a.serviceSlug === service.slug)

  return (
    <>
      <section className="bg-[#E7E9EC] relative overflow-hidden">
        {/* Декоративный вектор */}
        <div className="absolute left-0 top-[-3px] pointer-events-none select-none">
          <Image
            src="/images/hero-illustration.svg"
            alt=""
            width={593}
            height={677}
          />
        </div>

        <div className="max-w-[1440px] mx-auto px-[140px] relative">
          {/* Breadcrumb — y=76 */}
          <div className="pt-[12px]">
            <Breadcrumb items={[
              { label: 'Услуги', href: '/uslugi' },
              { label: service.title },
            ]} />
          </div>

          {/* Заголовок — y=143, breadcrumb bottom=93, mt=50 */}
          <h1 className="text-[30px] font-normal text-[#0C2140] mt-[50px]">
            {service.title}
          </h1>

          {/* ───── Раздел 1 ───── */}
          {/* Разделитель — y=203, title bottom=179, mt=24 */}
          <div className="border-t border-[#0C2140] mt-[24px]" />

          {/* Heading + Content — pt=40 (243-203) */}
          <div className="flex pt-[40px] pb-[22px]">
            <div className="w-[534px] shrink-0">
              <h2 className="text-[24px] font-normal text-[#0C2140]">
                Выявление формальных и манипулятивных показателей
              </h2>
            </div>
            <div className="flex-1">
              <p className="text-[16px] font-normal text-[#0C2140] leading-[1.5]">
                Система КPI должна отражать экономический результат деятельности подразделений и сотрудников.
                На практике показатели часто превращаются в формальный инструмент отчетности,
                не связанный с управлением эффективностью. Аудит КPI направлен на выявление
                методических ошибок, управленческих рисков и искажений поведения, которые
                формируются действующей системой оценки.
              </p>
            </div>
          </div>

          {/* ───── Раздел 2 ───── */}
          <div className="border-t border-[#0C2140]" />

          <div className="flex pt-[18px] pb-[35px]">
            <div className="w-[534px] shrink-0">
              <h2 className="text-[24px] font-normal text-[#0C2140]">
                Когда аудит необходим
              </h2>
            </div>
            <div className="flex-1">
              <ul className="space-y-[30px]">
                {[
                  'Показатели выполняются, но экономический результат не улучшается',
                  'Руководители «играют в цифры» вместо управления процессом',
                  'KPI конфликтуют между подразделениями',
                  'Возникает напряжённость между HR и бизнесом',
                  'Система сложна, но не влияет на управленческие решения',
                  'Премирование воспринимается как формальность или несправедливость',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-[22px]">
                    <span className="w-[10px] h-[10px] bg-[#40BE27] shrink-0 mt-[5px]" />
                    <span className="text-[16px] font-normal text-[#0C2140]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ───── Раздел 3 ───── */}
          <div className="border-t border-[#0C2140]" />

          <div className="flex pt-[15px]">
            <div className="w-[534px] shrink-0">
              <h2 className="text-[24px] font-normal text-[#0C2140]">
                Что включает аудит
              </h2>
            </div>
          </div>

          {/* 4 белых карточки — y=797, mt=30 от заголовка */}
          <div className="grid grid-cols-4 gap-[6px] mt-[30px]">
            {[
              {
                title: 'Методологический анализ',
                items: ['Проверка корректности формул', 'Оценка логики расчёта', 'Анализ связи КPI с финансовым результатом'],
              },
              {
                title: 'Экономическая проверка',
                items: ['Моделирование влияния выполнения КPI на ФОТ', 'Анализ премиального фонда', 'Выявление скрытых издержек'],
              },
              {
                title: 'Поведенческий анализ',
                items: ['Как KPI влияют на управленческие решения', 'Какие искажения формируются', 'Где возникает имитация эффективности'],
              },
              {
                title: 'Оценка управляемости системы',
                items: ['Прозрачность для руководителей', 'Возможность корректировки', 'Администрируемость'],
              },
            ].map((col, i) => (
              <div key={i} className="bg-white p-5 h-[195px]">
                <p className="text-[14px] font-normal text-[#0C2140] mb-[16px]">{col.title}</p>
                <ul className="space-y-[8px]">
                  {col.items.map((item, j) => (
                    <li key={j} className="text-[14px] font-normal text-[#0C2140]">{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* CTA кнопка — y=1032, cards bottom=992, mt=40; centered */}
          <div className="flex justify-center mt-[40px] mb-[77px]">
            <ConsultationButton
              label="Оставить заявку"
              className="h-[49px] px-8 py-0 text-[14px] font-normal rounded-none"
            />
          </div>

          {/* Связанные статьи */}
          {relatedArticles.length > 0 && (
            <div className="mb-[65px]">
              <h2 className="text-[30px] font-normal text-[#0C2140] mb-[32px]">Статьи</h2>
              <div className="grid grid-cols-3 gap-px bg-[#CED3D9]">
                {relatedArticles.map(a => (
                  <ArticleCard key={a.id} date={a.date} category={a.category} title={a.title} href={`/blog/${a.slug}`} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <ContactFormSection />
    </>
  )
}
