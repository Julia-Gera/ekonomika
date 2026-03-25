import Image from 'next/image'
import Breadcrumb from '@/components/ui/Breadcrumb'
import ContactFormSection from '@/components/sections/ContactFormSection'
import AboutSlider from '@/components/sections/AboutSlider'

export const metadata = { title: 'О компании — Экономика труда' }

const stats = [
  { value: '2009',    label: 'Год основания компании' },
  { value: '1540',    label: 'Реализованных проектов по снижению правовых рисков' },
  { value: '250',     label: 'Кадровых аудитов проведено в компаниях среднего и крупного бизнеса' },
  { value: '150',     label: 'Организаций используют наш Персональный консультант 24/7' },
  { value: '90 000',  label: 'Ошибок и рисков выявлено в ходе аудитов' },
  { value: '300+',    label: 'Компаний воспользовались нашим чек-листом по самоаудиту' },
  { value: '1 млрд+', label: 'Сумма возможных штрафов, от которых мы уберегли клиентов в результате аудитов' },
  { value: '80',      label: 'Запросов по различным темам ежедневно обрабатывают наши консультанты' },
]

function SectionLabel({ text, dark = false }: { text: string; dark?: boolean }) {
  return (
    <div className="flex items-center gap-[8px] mb-[16px]">
      <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
        <polygon points="4,8 0,0 8,0" fill="#40BE27" />
      </svg>
      <span
        className="text-[16px] font-semibold leading-none"
        style={{ color: dark ? '#ffffff' : '#0C2140' }}
      >
        {text}
      </span>
    </div>
  )
}

export default function OKompaniiPage() {
  return (
    <>
      {/* ═══ HERO — полная ширина, фото уходит под хедер как в Figma ══ */}
      <section className="bg-[#E7E9EC] pb-[74px] relative overflow-hidden" style={{ marginTop: -57 }}>

        {/* Полноширинное фото */}
        <div className="relative" style={{ height: 739 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/ЭкономикаТруда/99999.png"
            alt="Валентина Митрофанова"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: 'center 15%' }}
          />

          {/* Градиент: прозрачный → #0C2140 */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, transparent 40%, #0C2140 100%)' }}
          />

          {/* Хлебные крошки — внутри фото, ниже хедера */}
          <div className="absolute top-[81px] left-0 right-0 z-[2]">
            <div className="max-w-[1440px] mx-auto px-[140px]">
              <Breadcrumb items={[{ label: 'О компании' }]} />
            </div>
          </div>

          {/* Ряд карточек — внизу фото */}
          <div className="absolute bottom-0 left-0 right-0 z-[2]" style={{ height: 299 }}>
            <div className="max-w-[1440px] mx-auto px-[140px] h-full flex">

              {/* Белая карточка с цитатой */}
              <div className="bg-white flex-none pl-[32px] pt-[167px]" style={{ width: '66.4%' }}>
                <p className="text-[40px] font-normal text-[#0C2140] leading-[48px] tracking-[-2px]" style={{ maxWidth: 574 }}>
                  «Самое ценное — доверие тех, кто работает со мной»
                </p>
              </div>

              {/* Тёмная панель — frosted glass как в Figma */}
              <div className="flex-1 bg-white/20 backdrop-blur-[40px] pl-[16px] pr-[16px] pt-[11px]">
                {/* Логотип Митрофанова */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/image 14.png" alt="Митрофанова и партнёры" height={46} className="w-auto" />
                <p className="text-white text-[14px] font-normal" style={{ maxWidth: 317, marginTop: 88, lineHeight: '16.8px' }}>
                  Валентина Митрофанова — основательница консалтинговой компании «Митрофанова и партнёры»,
                  эксперт с 20-летним опытом в управлении персоналом, производительностью труда и консалтинге.
                  За годы работы помогла более 100 компаниям оптимизировать экономику труда и повысить эффективность бизнеса
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ═══ СЛАЙДЕР ════════════════════════════════════════════════════ */}
      <AboutSlider />

      {/* ═══ ФОТО-КОЛЛАЖ ════════════════════════════════════════════════ */}
      <div className="grid grid-cols-2">
        <div className="relative" style={{ height: 400 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/ЭкономикаТруда/Rectangle 12.png" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative" style={{ height: 400 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/ЭкономикаТруда/image13.png" alt="Валентина Митрофанова" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* ═══ О КОМПАНИИ — ОПИСАНИЕ ══════════════════════════════════════ */}
      <div className="bg-[#E7E9EC] pt-[60px] pb-[60px]" style={{ position: 'relative', overflow: 'hidden' }}>

        {/* Иллюстрация: top=178 → 3-я строчка снизу текста; left=329 → центр фото */}
        <div style={{
          position: 'absolute', top: 175, left: 957,
          transform: 'translateX(-50%)',
          pointerEvents: 'none', userSelect: 'none', zIndex: 0,
        }}>
          <Image src="/images/hero-illustration.svg" alt="" width={593} height={677} />
        </div>

        <div className="max-w-[1440px] mx-auto px-[140px]" style={{ position: 'relative', zIndex: 1 }}>

          {/* Метка + текст — по центру */}
          <div className="flex flex-col items-center text-center" style={{ marginBottom: 67 }}>
            <SectionLabel text="О компании" />
            <p style={{
              fontSize: 30, fontWeight: 500, color: '#0C2140',
              lineHeight: '42px', letterSpacing: '-0.5px',
              maxWidth: 1037, textAlign: 'center',
            }}>
              Компания «Митрофанова и партнёры» — лидер рынка консалтинга в области управления персоналом,
              повышения производительности и эффективности труда, нормирования и оплаты труда, юридических
              услуг в сфере трудового права и урегулирования конфликтов путем процедуры медиации
            </p>
          </div>

          {/* Комплексный подход: 3 колонки — фото | пространство | текст */}
          <div style={{ display: 'grid', gridTemplateColumns: '378px 1fr 383px' }}>

            {/* Левая колонка: фото */}
            <div style={{ paddingTop: 167 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/ЭкономикаТруда/Rectangle151.png"
                alt="Комплексный подход"
                style={{ width: '100%', display: 'block' }}
              />
            </div>

            {/* Декоративное пространство */}
            <div />

            {/* Правая колонка: лейбл → заголовок → spacer 270px → описание */}
            <div>
              <p style={{
                fontSize: 20, fontWeight: 400, color: '#0C2140',
                lineHeight: '28px', letterSpacing: '-0.5px', marginBottom: 8,
              }}>
                Важнейшее преимущество компании «Митрофанова и партнёры» —
              </p>
              <h2 style={{
                fontSize: 40, fontWeight: 400, color: '#0C2140',
                lineHeight: '48px', letterSpacing: '-2px', margin: 0,
              }}>
                Комплексный подход
              </h2>
              <div style={{ height: 270 }} />
              <p style={{
                fontSize: 18, fontWeight: 400, color: '#0C2140',
                lineHeight: '21.6px', letterSpacing: '-0.5px',
              }}>
                Мы предлагаем только индивидуальные решения, ориентированные под специфику ситуации Заказчика,
                давая клиентам возможность заниматься бизнесом, не отвлекаясь на рутину
              </p>
            </div>
          </div>{/* grid */}

        </div>
      </div>

      {/* ═══ ЦИФРЫ ══════════════════════════════════════════════════════ */}
      <div className="bg-[#E7E9EC] pb-[74px]">
        <div className="max-w-[1440px] mx-auto px-[140px]">
          <div className="grid grid-cols-4 gap-[8px]">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white p-5 flex flex-col justify-between" style={{ height: 284 }}>
                <div
                  className="text-[#0C2140] font-normal leading-none"
                  style={{ fontSize: 40, letterSpacing: '-2px' }}
                >
                  {stat.value}
                </div>
                <p
                  className="text-[16px] font-normal text-[#0C2140] leading-[1.4]"
                  style={{ letterSpacing: '-0.48px' }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ ФОРМА ОБРАТНОЙ СВЯЗИ ════════════════════════════════════════ */}
      <ContactFormSection />
    </>
  )
}
