import Image from 'next/image'
import Breadcrumb from '@/components/ui/Breadcrumb'
import ContactFormSection from '@/components/sections/ContactFormSection'
import ConsultationButton from '@/components/ui/ConsultationButton'
import { services } from '@/lib/placeholder-data'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{ slug: string }>
}

const auditTriggers = [
  'Показатели выполняются, но экономический результат не улучшается',
  'Руководители «играют в цифры» вместо управления процессом',
  'KPI конфликтуют между подразделениями',
  'Возникает напряжённость между HR и бизнесом',
  'Система сложна, но не влияет на управленческие решения',
  'Премирование воспринимается как формальность или несправедливость',
]

const auditColumns = [
  {
    title: 'Методологический анализ',
    items: [
      'Проверка корректности формул',
      'Оценка логики расчёта',
      'Анализ связи КPI с финансовым результатом',
    ],
  },
  {
    title: 'Экономическая проверка',
    items: [
      'Моделирование влияния выполнения КPI на ФОТ',
      'Анализ премиального фонда',
      'Выявление скрытых издержек',
    ],
  },
  {
    title: 'Поведенческий анализ',
    items: [
      'Как KPI влияют на управленческие решения',
      'Какие искажения формируются',
      'Где возникает имитация эффективности',
    ],
  },
  {
    title: 'Оценка управляемости системы',
    items: [
      'Прозрачность для руководителей',
      'Возможность корректировки',
      'Администрируемость',
    ],
  },
]

export async function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }))
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params
  const service = services.find((item) => item.slug === slug)

  if (!service) {
    notFound()
  }

  return (
    <>
      <section className="bg-[#E7E9EC] relative overflow-hidden">
        <div className="hidden md:block absolute left-0 top-[-3px] pointer-events-none select-none">
          <Image
            src="/images/hero-illustration.svg"
            alt=""
            width={593}
            height={677}
          />
        </div>

        <div className="max-w-[1440px] mx-auto px-[20px] md:px-[140px] relative">
          <div className="pt-[40px] md:pt-[12px]">
            <Breadcrumb items={[
              { label: 'Услуги', href: '/uslugi' },
              { label: service.title },
            ]} />
          </div>

          <h1 className="mt-[18px] md:mt-[50px] text-[30px] md:text-[40px] font-normal leading-[1.15] tracking-[-1px] md:tracking-[-2px] text-[#0C2140] max-w-[900px]">
            {service.title}
          </h1>

          <div className="border-t border-[#0C2140] mt-[24px]" />

          <div className="flex flex-col gap-[18px] md:flex-row md:gap-[40px] pt-[24px] md:pt-[40px] pb-[28px] md:pb-[22px]">
            <div className="md:w-[534px] md:shrink-0">
              <h2 className="text-[22px] md:text-[24px] font-normal leading-[1.2] text-[#0C2140]">
                Выявление формальных и манипулятивных показателей
              </h2>
            </div>
            <div className="flex-1">
              <p className="text-[15px] md:text-[16px] font-normal text-[#0C2140] leading-[1.6]">
                Система КPI должна отражать экономический результат деятельности подразделений и сотрудников.
                На практике показатели часто превращаются в формальный инструмент отчетности,
                не связанный с управлением эффективностью. Аудит KПI направлен на выявление
                методических ошибок, управленческих рисков и искажений поведения, которые
                формируются действующей системой оценки.
              </p>
            </div>
          </div>

          <div className="border-t border-[#0C2140]" />

          <div className="flex flex-col gap-[18px] md:flex-row md:gap-[40px] pt-[24px] md:pt-[18px] pb-[32px] md:pb-[35px]">
            <div className="md:w-[534px] md:shrink-0">
              <h2 className="text-[22px] md:text-[24px] font-normal leading-[1.2] text-[#0C2140]">
                Когда аудит необходим
              </h2>
            </div>
            <div className="flex-1">
              <ul className="space-y-[18px] md:space-y-[30px]">
                {auditTriggers.map((item, index) => (
                  <li key={index} className="flex items-start gap-[14px] md:gap-[22px]">
                    <span className="w-[10px] h-[10px] bg-[#40BE27] shrink-0 mt-[6px] md:mt-[5px]" />
                    <span className="text-[15px] md:text-[16px] leading-[1.5] font-normal text-[#0C2140]">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-[#0C2140]" />

          <div className="flex flex-col gap-[18px] md:flex-row md:gap-[40px] pt-[24px] md:pt-[15px]">
            <div className="md:w-[534px] md:shrink-0">
              <h2 className="text-[22px] md:text-[24px] font-normal leading-[1.2] text-[#0C2140]">
                Что включает аудит
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-[10px] md:gap-[6px] mt-[24px] md:mt-[30px]">
            {auditColumns.map((column, index) => (
              <div key={index} className="bg-white p-5 min-h-[180px] md:h-[195px]">
                <p className="text-[14px] font-normal leading-[1.35] text-[#0C2140] mb-[14px] md:mb-[16px]">
                  {column.title}
                </p>
                <ul className="space-y-[8px]">
                  {column.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-[14px] leading-[1.4] font-normal text-[#0C2140]">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-[24px] md:mt-[40px] mb-[40px] md:mb-[77px]">
            <ConsultationButton
              label="Оставить заявку"
              className="h-[49px] w-full md:w-auto px-8 py-0 text-[14px] font-normal rounded-none"
            />
          </div>
        </div>
      </section>

      <ContactFormSection />
    </>
  )
}
