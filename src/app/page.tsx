import Image from 'next/image'
import ServiceCard from '@/components/ui/ServiceCard'
import ArticleCard from '@/components/ui/ArticleCard'
import ContactFormSection from '@/components/sections/ContactFormSection'
import SearchBar from '@/components/ui/SearchBar'
import { services, articles } from '@/lib/placeholder-data'

export default function HomePage() {
  return (
    <>
      {/* ═══ HERO + СЕТКА УСЛУГ (единая секция с декоративным фоном) ═══ */}
      <section className="bg-[#E7E9EC]">
        <div className="max-w-[1440px] mx-auto px-[140px] relative isolate overflow-hidden">
          {/* Декоративная иллюстрация: x=48, y=-3 от верха страницы */}
          <div className="absolute left-[48px] top-[-3px] pointer-events-none select-none z-[-1]">
            <Image
              src="/images/hero-illustration.svg"
              alt=""
              width={593}
              height={677}
              priority
            />
          </div>

          {/* H1: y=84 от верха страницы = pt-[84px] */}
          <h1 className="relative pt-[84px] text-[40px] font-normal text-[#0C2140] leading-[48px] tracking-[-2px] max-w-[619px] mx-auto text-center">
            Наш подход — научная экономика труда без отвлечения от бизнеса
          </h1>

          {/* SearchBar */}
          <div className="relative mt-[12px] pb-[13px] flex justify-center">
            <SearchBar />
          </div>

          {/* Сетка услуг */}
          <div className="grid grid-cols-3 gap-[10px]">
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
      <section className="bg-[#E7E9EC] pt-[76px] pb-[76px]">
        <div className="max-w-[1440px] mx-auto px-[140px]">
          <h2 className="text-[30px] font-normal text-[#0C2140] mb-[76px]">
            Последние новости
          </h2>
          <div className="grid grid-cols-3 gap-[10px]">
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
