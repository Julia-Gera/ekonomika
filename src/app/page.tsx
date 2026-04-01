import Image from 'next/image'
import ServiceCard from '@/components/ui/ServiceCard'
import ArticleCard from '@/components/ui/ArticleCard'
import ContactFormSection from '@/components/sections/ContactFormSection'
import SearchBar from '@/components/ui/SearchBar'
import ConsultationButton from '@/components/ui/ConsultationButton'
import { services } from '@/lib/placeholder-data'
import { getArticles } from '@/lib/api'

export default async function HomePage() {
  const articles = await getArticles(3)

  return (
    <>
      {/* ═══ HERO + СЕТКА УСЛУГ (единая секция с декоративным фоном) ═══ */}
      <section className="bg-[#E7E9EC]">
        <div className="max-w-[1440px] mx-auto px-[20px] md:px-[140px] relative isolate overflow-hidden">
          {/* Декоративная иллюстрация: скрываем на мобиле */}
          <div className="hidden md:block absolute left-[48px] top-[-3px] pointer-events-none select-none z-[-1]">
            <Image
              src="/images/hero-illustration.svg"
              alt=""
              width={593}
              height={677}
              priority
            />
          </div>

          {/* H1: 30px на мобиле, 40px на десктопе */}
          <h1 className="relative pt-[40px] md:pt-[84px] text-[30px] md:text-[40px] font-normal text-[#0C2140] leading-[36px] md:leading-[48px] tracking-[-2px] md:max-w-[619px] md:mx-auto md:text-center">
            Наш подход — научная экономика труда без отвлечения от бизнеса
          </h1>

          {/* SearchBar */}
          <div className="relative mt-[20px] md:mt-[12px] pb-[13px] flex justify-center">
            <SearchBar />
          </div>

          {/* Кнопка Консультация — только на мобиле */}
          <div className="md:hidden pb-[16px]">
            <ConsultationButton className="w-full rounded-none py-[14px] text-[14px]" />
          </div>

          {/* Сетка услуг: 1 колонка на мобиле, 3 на десктопе */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[10px]">
            {services.map(s => (
              <ServiceCard
                key={s.id}
                number={s.number}
                title={s.title}
                href={`/uslugi/${s.slug}`}
                icon={s.icon}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ПОСЛЕДНИЕ НОВОСТИ ═══════════════════════════════════════ */}
      <section className="bg-[#E7E9EC] pt-[40px] md:pt-[76px] pb-[40px] md:pb-[76px]">
        <div className="max-w-[1440px] mx-auto px-[20px] md:px-[140px]">
          <h2 className="text-[24px] md:text-[30px] font-normal text-[#0C2140] mb-[20px] md:mb-[32px]">
            Последние новости
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[10px]">
            {articles.map(a => (
              <ArticleCard
                key={a.id}
                date={a.date}
                category={a.category}
                title={a.title}
                href={`/stati/${a.slug}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ФОРМА ОБРАТНОЙ СВЯЗИ ════════════════════════════════════ */}
      <ContactFormSection />
    </>
  )
}
