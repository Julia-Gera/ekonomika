import Image from 'next/image'
import Breadcrumb from '@/components/ui/Breadcrumb'
import ServiceCard from '@/components/ui/ServiceCard'
import ContactFormSection from '@/components/sections/ContactFormSection'
import { services } from '@/lib/placeholder-data'

export const metadata = { title: 'Услуги — Экономика труда' }

export default function UslugiPage() {
  return (
    <>
      <section className="bg-[#E7E9EC] overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-[20px] md:px-[140px] relative isolate">
          <div className="hidden md:block absolute left-[48px] top-[-3px] pointer-events-none select-none z-[-1]">
            <Image
              src="/images/hero-illustration.svg"
              alt=""
              width={593}
              height={677}
            />
          </div>
          <div className="pt-[40px] md:pt-[76px]">
            <Breadcrumb items={[{ label: 'Услуги' }]} />
          </div>

          <h1 className="text-[30px] md:text-[40px] font-normal text-[#0C2140] mt-[12px] tracking-[-2px]">
            Услуги
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[10px] md:gap-[16px] mt-[20px] mb-[40px] md:mb-[65px]">
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
