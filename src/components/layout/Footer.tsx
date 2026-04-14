import Link from 'next/link'

const navLinks = [
  { href: '/o-kompanii', label: 'О компании' },
  { href: '/uslugi', label: 'Услуги' },
  { href: '/dokumenty', label: 'Документы' },
  { href: '/kontakty', label: 'Контакты' },
]

export default function Footer() {
  return (
    <footer className="bg-[#0A1A33] md:h-[183px] py-[32px] md:py-0">
      <div className="max-w-[1440px] mx-auto px-[20px] md:px-[140px] h-full flex items-center">

        {/* Десктоп: горизонтально */}
        <div className="hidden md:flex items-start w-full">
          <div className="w-[428px] shrink-0 flex flex-col gap-[8px]">
            <span className="text-[16px] font-normal text-white leading-[22px]">Адрес: г. Москва, ул. Арбат 12, стр. 1, подъезд 1, оф. 215</span>
            <span className="text-[16px] font-normal text-white leading-[22px]">Телефон: +7 (800) 350-51-32</span>
            <span className="text-[16px] font-normal text-white leading-[22px]">Email: info@ekonomikatruda.ru</span>
            <span className="text-[16px] font-normal text-white leading-[22px]">Telegram: @ekonomika_truda</span>
          </div>
          <div className="ml-[152px] shrink-0 flex flex-col gap-[8px]">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href} className="text-[16px] font-normal text-white leading-[22px] hover:text-[#9EA6B3] transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
          <div className="ml-auto w-[228px] shrink-0 flex flex-col gap-[8px]">
            <Link href="/politika-konfidentsialnosti" className="text-[16px] font-normal text-white leading-[19px] hover:text-[#9EA6B3] transition-colors">
              Политика конфиденциальности
            </Link>
            <span className="text-[16px] font-normal text-[#9EA6B3] leading-[19px]">Все права защищены</span>
          </div>
        </div>

        {/* Мобиле: вертикально */}
        <div className="md:hidden flex flex-col gap-[24px] w-full">
          <div className="flex flex-col gap-[8px]">
            <span className="text-[14px] font-normal text-white leading-[20px]">Адрес: г. Москва, ул. Арбат 12, стр. 1, подъезд 1, оф. 215</span>
            <span className="text-[14px] font-normal text-white leading-[20px]">Телефон: +7 (800) 350-51-32</span>
            <span className="text-[14px] font-normal text-white leading-[20px]">Email: info@ekonomikatruda.ru</span>
            <span className="text-[14px] font-normal text-white leading-[20px]">Telegram: @ekonomika_truda</span>
          </div>
          <div className="flex flex-col gap-[8px]">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href} className="text-[14px] font-normal text-white leading-[20px] hover:text-[#9EA6B3] transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-[4px]">
            <Link href="/politika-konfidentsialnosti" className="text-[14px] font-normal text-white leading-[19px] hover:text-[#9EA6B3] transition-colors">
              Политика конфиденциальности
            </Link>
            <span className="text-[14px] font-normal text-[#9EA6B3] leading-[19px]">Все права защищены</span>
          </div>
        </div>

      </div>
    </footer>
  )
}
