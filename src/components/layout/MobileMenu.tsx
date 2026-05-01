'use client'
import Link from 'next/link'
import { useEffect } from 'react'
import { useConsultation } from '@/lib/consultation-context'

const navLinks = [
  { href: '/', label: 'Главная' },
  { href: '/o-kompanii', label: 'О компании' },
  { href: '/uslugi', label: 'Услуги' },
  { href: '/novosti', label: 'Новости' },
  { href: '/dokumenty', label: 'Документы' },
  { href: '/kontakty', label: 'Контакты' },
]

export default function MobileMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { openModal } = useConsultation()

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-72 bg-white flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <span className="font-bold text-[#0C2140]">Меню</span>
          <button onClick={onClose} className="p-2 text-[#0C2140]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <nav className="flex flex-col p-4 gap-1">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} onClick={onClose}
              className="px-3 py-3 text-[#0C2140] font-medium hover:bg-gray-50 rounded transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 mt-auto">
          <button
            onClick={() => { onClose(); openModal() }}
            className="w-full bg-[#0C2140] text-white font-medium py-3 rounded transition-colors hover:bg-[#304564]">
            Консультация
          </button>
        </div>
      </div>
    </div>
  )
}
