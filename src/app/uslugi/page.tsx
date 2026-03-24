import Image from 'next/image'
import Breadcrumb from '@/components/ui/Breadcrumb'
import ServiceCard from '@/components/ui/ServiceCard'
import ContactFormSection from '@/components/sections/ContactFormSection'
import { services } from '@/lib/placeholder-data'

export const metadata = { title: 'Услуги — Экономика труда' }

export default function UslugiPage() {
  return (
    <>
      <section className="bg-[#E7E9EC] -mt-[64px] overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-[140px] relative isolate">
          <div className="absolute left-[48px] top-[-3px] pointer-events-none select-none z-[-1]">
            <Image
              src="/images/hero-illustration.svg"
              alt=""
              width={593}
              height={677}
            />
          </div>
          {/* Breadcrumb — y=76 от верха фрейма. Секция с y=0, pt=76 */}
          <div className="pt-[76px]">
            <Breadcrumb items={[{ label: 'Услуги' }]} />
          </div>

          {/* Заголовок — y=105 от верха фрейма, breadcrumb top=76, h=17, bottom=93, mt=12 */}
          <h1 className="text-[40px] font-normal text-[#0C2140] mt-[12px] tracking-[-2px]">
            Услуги
          </h1>

          {/* Карточки 2 кол × 572px, gap=16px, h=144px; title bottom=153, cards start y=173, mt=20 */}
          <div className="grid grid-cols-2 gap-[16px] mt-[20px] mb-[65px]">
            {services.map(s => (
              <ServiceCard
                key={s.id}
                number={s.number}
                title={s.title}
                href={`/uslugi/${s.slug}`}
                icon={s.icon}
                className="h-[144px]"
              />
            ))}
          </div>
        </div>
      </section>

      <ContactFormSection />
    </>
  )
}
