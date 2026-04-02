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
      <section className="bg-[#E7E9EC] relative overflow-hidden" style={{ marginTop: -57 }}>

        {/* Полноширинное фото */}
        <div className="relative h-[520px] md:h-[739px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/9999_1140__11.png"
            alt="Валентина Митрофанова"
            className="absolute inset-0 w-full h-full object-cover [object-position:50%_20%] md:[object-position:center_15%]"
          />

          {/* Градиент — только десктоп */}
          <div
            className="hidden md:block absolute top-0 bottom-0 left-0 pointer-events-none"
            style={{ width: '64%', background: 'linear-gradient(to bottom, transparent 40%, #0C2140 100%)' }}
          />

          {/* Хлебные крошки */}
          <div className="absolute top-[81px] left-0 right-0 z-[2]">
            <div className="max-w-[1440px] mx-auto px-[20px] md:px-[140px]">
              <Breadcrumb items={[{ label: 'О компании' }]} />
            </div>
          </div>

          {/* Ряд карточек — внизу фото, только десктоп */}
          <div className="hidden md:block absolute bottom-0 left-0 right-0 z-[2]" style={{ height: 299 }}>
            <div className="max-w-[1440px] mx-auto px-[140px] h-full flex gap-[8px]">
              <div className="bg-white flex-none pl-[32px] pt-[167px] relative overflow-hidden" style={{ width: '66.4%' }}>
                <div className="absolute top-0 right-0 pointer-events-none select-none">
                  <svg width="262" height="300" viewBox="0 0 262 300" fill="none">
                    <path d="M74.4202 144.963L187.58 0H0V144.963H74.4202L0 241.604V299.113H142.384L262 144.963H74.4202Z" fill="#DFE3E8" />
                  </svg>
                </div>
                <p className="relative z-10 text-[40px] font-normal text-[#0C2140] leading-[48px] tracking-[-2px]" style={{ maxWidth: 574 }}>
                  «Самое ценное — доверие тех, кто работает со мной»
                </p>
              </div>
              <div className="flex-1 pl-[16px] pr-[16px] pt-[11px]" style={{ backgroundImage: 'url(/images/Rectangle%20147.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
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

          {/* Мобиле: цитата поверх фото */}
          <div className="md:hidden absolute bottom-0 z-[2] bg-white overflow-hidden" style={{ height: '38%', width: '82%', marginLeft: '10%' }}>
            <div className="absolute top-0 right-0 pointer-events-none select-none opacity-60">
              <svg width="130" height="150" viewBox="0 0 262 300" fill="none">
                <path d="M74.4202 144.963L187.58 0H0V144.963H74.4202L0 241.604V299.113H142.384L262 144.963H74.4202Z" fill="#DFE3E8" />
              </svg>
            </div>
            <div className="absolute bottom-[24px] left-[20px] right-[20px]">
              <p className="text-[22px] font-normal text-[#0C2140] leading-[28px] tracking-[-1px]">
                «Самое ценное — доверие тех, кто работает со мной»
              </p>
            </div>
          </div>

        </div>

      </section>

      {/* ═══ СЛАЙДЕР ════════════════════════════════════════════════════ */}
      <AboutSlider />

      {/* ═══ ФОТО-КОЛЛАЖ ════════════════════════════════════════════════ */}
      <div className="bg-[#E7E9EC] pt-[10px] pb-[40px] md:pb-[97px]">
        <div className="max-w-[1440px] mx-auto px-[20px] md:px-[140px]">
          {/* Десктоп */}
          <div className="hidden md:flex gap-[12px] items-start">
            <div style={{ width: 378, height: 444, flexShrink: 0 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/Rectangle 149.png" alt="" className="w-full h-full object-cover" style={{ objectPosition: 'center 30%' }} />
            </div>
            <div style={{ width: 770, height: 644, flexShrink: 0 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/Rectangle 150.png" alt="Валентина Митрофанова" className="w-full h-full object-cover" />
            </div>
          </div>
          {/* Мобиле */}
          <div className="md:hidden" style={{ height: 300 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/Rectangle 150.png" alt="Валентина Митрофанова" className="w-full h-full object-cover" />
          </div>
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

        <div className="max-w-[1440px] mx-auto px-[20px] md:px-[140px]" style={{ position: 'relative', zIndex: 1 }}>

          {/* Метка + текст */}
          <div className="flex flex-col items-center text-center" style={{ marginBottom: 40 }}>
            <SectionLabel text="О компании" />
            <p className="text-[18px] md:text-[30px] font-medium text-[#0C2140] leading-[1.4] md:leading-[42px]" style={{ letterSpacing: '-0.5px', maxWidth: 1037 }}>
              Компания «Митрофанова и партнёры» — лидер рынка консалтинга в области управления персоналом,
              повышения производительности и эффективности труда, нормирования и оплаты труда, юридических
              услуг в сфере трудового права и урегулирования конфликтов путем процедуры медиации
            </p>
          </div>

          {/* Комплексный подход */}
          {/* Десктоп: grid 3 колонки (фото | пространство | текст) */}
          {/* Мобиле: flex-col, текст сверху, фото снизу */}
          <div className="hidden md:grid" style={{ gridTemplateColumns: '378px 1fr 383px' }}>
            {/* Фото */}
            <div style={{ paddingTop: 167 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/ЭкономикаТруда/Rectangle151.png" alt="Комплексный подход" style={{ width: '100%', display: 'block' }} />
            </div>
            {/* Декоративное пространство */}
            <div />
            {/* Текст */}
            <div>
              <p style={{ fontSize: 20, fontWeight: 400, color: '#0C2140', lineHeight: '28px', letterSpacing: '-0.5px', marginBottom: 8 }}>
                Важнейшее преимущество компании «Митрофанова и партнёры» —
              </p>
              <h2 style={{ fontSize: 40, fontWeight: 400, color: '#0C2140', lineHeight: '48px', letterSpacing: '-2px', margin: 0 }}>
                Комплексный подход
              </h2>
              <div style={{ height: 270 }} />
              <p style={{ fontSize: 18, fontWeight: 400, color: '#0C2140', lineHeight: '21.6px', letterSpacing: '-0.5px' }}>
                Мы предлагаем только индивидуальные решения, ориентированные под специфику ситуации Заказчика,
                давая клиентам возможность заниматься бизнесом, не отвлекаясь на рутину
              </p>
            </div>
          </div>

          {/* Мобиле версия */}
          <div className="flex flex-col gap-[24px] md:hidden">
            <div>
              <p className="text-[16px] font-normal text-[#0C2140] leading-[1.4]" style={{ letterSpacing: '-0.5px', marginBottom: 8 }}>
                Важнейшее преимущество компании «Митрофанова и партнёры» —
              </p>
              <h2 className="text-[28px] font-normal text-[#0C2140] leading-[1.2]" style={{ letterSpacing: '-2px', margin: 0 }}>
                Комплексный подход
              </h2>
              <p className="text-[16px] font-normal text-[#0C2140] mt-[16px]" style={{ lineHeight: '1.5', letterSpacing: '-0.5px' }}>
                Мы предлагаем только индивидуальные решения, ориентированные под специфику ситуации Заказчика,
                давая клиентам возможность заниматься бизнесом, не отвлекаясь на рутину
              </p>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/ЭкономикаТруда/Rectangle151.png" alt="Комплексный подход" style={{ width: '100%', display: 'block' }} />
          </div>

        </div>
      </div>

      {/* ═══ ЦИФРЫ ══════════════════════════════════════════════════════ */}
      <div className="bg-[#E7E9EC] pb-[40px] md:pb-[74px]">
        <div className="max-w-[1440px] mx-auto px-[20px] md:px-[140px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[8px]">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white p-5 flex flex-col justify-between min-h-[140px] md:min-h-[284px]">
                <div
                  className="text-[#0C2140] font-normal leading-none text-[32px] md:text-[40px]"
                  style={{ letterSpacing: '-2px' }}
                >
                  {stat.value}
                </div>
                <p
                  className="text-[14px] md:text-[16px] font-normal text-[#0C2140] leading-[1.4] mt-[12px] md:mt-0"
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
