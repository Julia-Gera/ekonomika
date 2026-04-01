import Image from 'next/image'
import Breadcrumb from '@/components/ui/Breadcrumb'
import ContactFormSection from '@/components/sections/ContactFormSection'

export const metadata = { title: 'Контакты — Экономика труда' }

const contacts = [
  {
    icon: '/images/contact-icon-address.svg',
    label: 'Адрес:',
    value: 'г. Москва, ул. Арбат 12, стр. 1, подъезд 1, оф. 215',
  },
  {
    icon: '/images/contact-icon-phone.svg',
    label: 'Телефон:',
    value: '+7 (800) 350-51-32',
  },
  {
    icon: '/images/contact-icon-email.svg',
    label: 'Email:',
    value: 'ekonomika_truda@mail.ru',
  },
  {
    icon: '/images/contact-icon-telegram.svg',
    label: 'Telegram:',
    value: '@ekonomika_truda',
  },
]

export default function KontaktyPage() {
  return (
    <>
      {/* ═══ HERO + КОНТАКТЫ ═══════════════════════════════════════════ */}
      <section className="bg-[#E7E9EC]">
        <div className="max-w-[1440px] mx-auto px-[20px] md:px-[140px] relative isolate overflow-hidden">

          {/* Декоративный элемент */}
          <div className="hidden md:block absolute left-[48px] top-[-3px] pointer-events-none select-none z-[-1]">
            <Image
              src="/images/hero-illustration.svg"
              alt=""
              width={593}
              height={677}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 mb-[40px] md:mb-[74px]">

            {/* Левая колонка: хлебные крошки + заголовок + строки контактов */}
            <div>
              <div className="pt-[40px] md:pt-[76px]">
                <Breadcrumb items={[{ label: 'Контакты' }]} />
              </div>

              <h1 className="text-[30px] md:text-[40px] font-normal text-[#0C2140] mt-[12px] tracking-[-2px]">
                Контакты
              </h1>

              <div className="mt-[26px] flex flex-col gap-[30px]">
                {contacts.map((item, i) => (
                  <div key={i} className="flex items-center gap-[16px]">
                    {/* Белый квадрат с иконкой 52×52 */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.icon} width={52} height={52} alt="" className="shrink-0" />

                    {/* Текст */}
                    <div>
                      <p className="text-[14px] font-medium leading-[17px] text-[#0C2140]">
                        {item.label}
                      </p>
                      <p className="text-[20px] font-normal leading-[24px] text-[#0C2140]">
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Карта */}
            <div className="mt-[24px] md:mt-0 md:pt-[105px]">
              <div className="h-[240px] md:h-[372px] overflow-hidden" style={{ backgroundColor: '#CED3D9' }}>
                <iframe
                  src="https://yandex.ru/map-widget/v1/?ll=37.596200%2C55.751200&z=17&pt=37.596200%2C55.751200%2Ccomma"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  title="Карта"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══ ФОРМА ОБРАТНОЙ СВЯЗИ ════════════════════════════════════ */}
      <ContactFormSection />
    </>
  )
}
