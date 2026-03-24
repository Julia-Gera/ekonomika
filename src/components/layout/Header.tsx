'use client'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { useConsultation } from '@/lib/consultation-context'
import MobileMenu from './MobileMenu'

const navLinks = [
  { href: '/o-kompanii', label: 'О компании' },
  { href: '/uslugi', label: 'Услуги' },
  { href: '/dokumenty', label: 'Документы' },
  { href: '/kontakty', label: 'Контакты' },
]

export default function Header() {
  const pathname = usePathname()
  const { openModal } = useConsultation()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <header className="bg-[#E7E9EC] sticky top-0 z-40">
        <div className="max-w-[1440px] mx-auto px-[140px] pt-[7px]">
        <div className="bg-white flex items-center justify-between h-[57px]">
          {/* Logo — 16px inset from content edge per Figma */}
          <Link href="/" className="shrink-0 ml-[16px]">
            <Image
              src="/ЭкономикаТруда/Logo.png"
              alt="Экономика труда"
              width={138}
              height={31}
              className="h-[31px] w-auto"
              priority
            />
          </Link>

          {/* Desktop Nav — gap=32px per Figma */}
          <nav className="hidden md:flex items-center gap-[32px]">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[14px] font-normal leading-[17px] transition-colors hover:text-[#556988] ${
                  pathname?.startsWith(link.href) ? 'text-[#556988]' : 'text-[#030303]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA + Burger */}
          <div className="flex items-center mr-[16px]">
            <button
              onClick={openModal}
              className="hidden md:block bg-[#0C2140] hover:bg-[#304564] text-white text-[14px] font-normal px-8 py-4 transition-colors"
            >
              Консультация
            </button>
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-2 text-[#0C2140]"
              aria-label="Открыть меню"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
        </div>
      </header>
      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}
