'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'

const slides = [
  {
    heading: 'Наш консалтинг — не просто «еще одна» юридическая компания',
    text: 'Все в штучном, единичном, индивидуальном варианте. Каждый человек или компания, с которой мы работаем — это персональная ответственность основателя компании Валентины Митрофановой. Поэтому консультанты и эксперты у нас штучные. С некоторыми клиентами мы работаем уже 10 лет.',
    image: { src: '/ЭкономикаТруда/image_16_0.png', alt: 'Договор', w: 160, h: 200 },
  },
  {
    heading: 'Мы не работаем «в стол»',
    text: 'Не тратим своё время, внимание и деньги клиента на то, что ему не нужно, не беремся за нетипичные проекты. У нас нет одинаковых масштабов, потоковых услуг, типовых проектов, потому что каждый клиент — разный, со своими задачами и со своей спецификой.',
    image: { src: '/ЭкономикаТруда/image_16_1.png', alt: 'Папки', w: 160, h: 180 },
  },
  {
    heading: 'Консалтинговая компания носит имя основателя и управляющего партнера',
    text: 'Потому что Валентина Митрофанова, основатель и управляющий партнер компании, лично отвечает за всю работу с клиентами — начиная от простой консультации и заканчивая сложным консалтинговым проектом. Её имя стоит под всеми проектами, под каждой услугой.',
    image: { src: '/ЭкономикаТруда/image_16_2.png', alt: 'Печать', w: 150, h: 150 },
  },
  {
    heading: 'Нашему бизнесу больше 10 лет',
    text: 'За это время мы пережили с нашими клиентами и кризисы, и забастовки, и смены руководства, и массовые увольнения, и «неработающие» работники, и принудительный дистант, и частичную мобилизацию. И мы уверены, переживём не только это.',
    image: { src: '/ЭкономикаТруда/image_16_13png.png', alt: 'Песочные часы', w: 90, h: 160 },
  },
]

const ArrowLeft = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M10 12L6 8L10 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M6 4L10 8L6 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export default function AboutSlider() {
  const [current, setCurrent] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  // На мобиле: 1 слайд за раз (100%), на десктопе: 2 слайда (50%)
  const slideWidth = isMobile ? 100 : 50
  const maxIndex = isMobile ? slides.length - 1 : slides.length - 2

  return (
    <div className="bg-[#0C2140] py-[40px] md:py-[60px]">
      <div className="max-w-[1440px] mx-auto px-[20px] md:px-[140px]">

        {/* Метка секции */}
        <div className="flex items-center gap-[8px] mb-[32px] md:mb-[40px]">
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
            <polygon points="4,8 0,0 8,0" fill="#40BE27" />
          </svg>
          <span className="text-[16px] font-semibold text-white leading-none">
            Что стоит за нашей компанией?
          </span>
        </div>

        {/* Трек */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${current * slideWidth}%)` }}
          >
            {slides.map((slide, i) => (
              <div
                key={i}
                className="flex flex-col shrink-0"
                style={{
                  width: `${slideWidth}%`,
                  minHeight: 320,
                  paddingRight: isMobile ? 0 : 40,
                  paddingLeft: isMobile ? 0 : (i === 0 ? 0 : 40),
                  borderRight: isMobile ? 'none' : '1px solid rgba(255,255,255,0.2)',
                }}
              >
                {/* Заголовок */}
                <h2
                  className="text-white font-normal leading-[1.2] mb-auto text-[22px] md:text-[30px]"
                  style={{ letterSpacing: '-1px' }}
                >
                  {slide.heading}
                </h2>

                {/* Низ: текст слева, картинка справа */}
                <div className="flex items-end justify-between gap-6 mt-[24px] md:mt-[40px]">
                  <p className="text-white/60 text-[14px] md:text-[16px] leading-[1.55]" style={{ maxWidth: '65%' }}>
                    {slide.text}
                  </p>
                  <div className="shrink-0">
                    <Image
                      src={slide.image.src}
                      alt={slide.image.alt}
                      width={slide.image.w}
                      height={slide.image.h}
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            ))}
            {!isMobile && <div className="shrink-0" style={{ width: '50%' }} />}
          </div>
        </div>

        {/* Стрелки */}
        <div className="flex items-center gap-[8px] mt-[32px] md:mt-[40px]">
          <button
            onClick={() => setCurrent(i => Math.max(0, i - 1))}
            disabled={current === 0}
            className="w-10 h-10 border border-white/30 flex items-center justify-center transition-colors hover:bg-white/10 disabled:opacity-30 cursor-pointer disabled:cursor-default"
            aria-label="Назад"
          >
            <ArrowLeft />
          </button>
          <button
            onClick={() => setCurrent(i => Math.min(maxIndex, i + 1))}
            disabled={current === maxIndex}
            className="w-10 h-10 border border-white/30 flex items-center justify-center transition-colors hover:bg-white/10 disabled:opacity-30 cursor-pointer disabled:cursor-default"
            aria-label="Вперёд"
          >
            <ArrowRight />
          </button>
        </div>

      </div>
    </div>
  )
}
