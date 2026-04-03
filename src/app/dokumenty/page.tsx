'use client'
import Image from 'next/image'
import { useState } from 'react'
import Breadcrumb from '@/components/ui/Breadcrumb'
import ContactFormSection from '@/components/sections/ContactFormSection'

const tabs = [
  { label: 'Шаблоны',      key: 'templates' },
  { label: 'Чек - листы',  key: 'checklists' },
  { label: 'Документация', key: 'docs' },
]

const documents = [
  // Шаблоны
  { id: 1,  icon: '/images/doc-icon-1.svg', type: 'DOC', typeBg: '#207AE2', title: 'Консультации по трудовому праву в режиме абонентского сопровождения', tab: 'templates', file: '/documents/shablon-konsultacii-trudovoe-pravo.pdf' },
  { id: 2,  icon: '/images/doc-icon-2.svg', type: 'PDF', typeBg: '#FF0004', title: 'Разовые консультации по трудовому праву', tab: 'templates', file: '/documents/shablon-razovye-konsultacii.pdf' },
  { id: 3,  icon: '/images/doc-icon-1.svg', type: 'DOC', typeBg: '#207AE2', title: 'Трудовой договор (шаблон)', tab: 'templates', file: '/documents/shablon-trudovoy-dogovor.pdf' },
  { id: 4,  icon: '/images/doc-icon-1.svg', type: 'DOC', typeBg: '#207AE2', title: 'Положение об оплате труда', tab: 'templates', file: '/documents/shablon-polozhenie-ob-oplate.pdf' },
  { id: 5,  icon: '/images/doc-icon-2.svg', type: 'PDF', typeBg: '#FF0004', title: 'Должностная инструкция (шаблон)', tab: 'templates', file: '/documents/shablon-dolzhnostnaya-instrukciya.pdf' },
  // Чек-листы
  { id: 6,  icon: '/images/doc-icon-2.svg', type: 'PDF', typeBg: '#FF0004', title: 'Чек-лист по самоаудиту кадровых документов', tab: 'checklists', file: '/documents/chek-list-samoaudit.pdf' },
  { id: 7,  icon: '/images/doc-icon-2.svg', type: 'PDF', typeBg: '#FF0004', title: 'Чек-лист по охране труда', tab: 'checklists', file: '/documents/chek-list-oxrana-truda.pdf' },
  { id: 8,  icon: '/images/doc-icon-2.svg', type: 'PDF', typeBg: '#FF0004', title: 'Чек-лист: кадровый аудит компании', tab: 'checklists', file: '/documents/chek-list-kadrovyy-audit.pdf' },
  { id: 9,  icon: '/images/doc-icon-2.svg', type: 'PDF', typeBg: '#FF0004', title: 'Чек-лист по трудовым спорам', tab: 'checklists', file: '/documents/chek-list-trudovye-spory.pdf' },
  // Документация
  { id: 10, icon: '/images/doc-icon-2.svg', type: 'PDF', typeBg: '#FF0004', title: 'Регламент о защите персональных данных', tab: 'docs', file: '/documents/dok-reglament-personalnye-dannye.pdf' },
  { id: 11, icon: '/images/doc-icon-1.svg', type: 'DOC', typeBg: '#207AE2', title: 'Правила внутреннего трудового распорядка', tab: 'docs', file: '/documents/dok-pravila-vnutrennego-rasporyadka.pdf' },
  { id: 12, icon: '/images/doc-icon-1.svg', type: 'DOC', typeBg: '#207AE2', title: 'Положение о заработной плате', tab: 'docs', file: '/documents/dok-polozhenie-o-zarabotnoy-plate.pdf' },
]

const RedirectIcon = () => (
  <svg width="18" height="18" viewBox="0 0 10 10" fill="none" className="shrink-0">
    <path d="M5.00013 5.41656V8.74982C5.00013 8.86033 4.95623 8.96631 4.87809 9.04445C4.79996 9.12258 4.69398 9.16648 4.58347 9.16648C4.47297 9.16648 4.36699 9.12258 4.28885 9.04445C4.21071 8.96631 4.16681 8.86033 4.16681 8.74982V6.42279L0.711676 9.87793C0.672964 9.91664 0.627006 9.94735 0.576427 9.9683C0.525847 9.98925 0.471637 10 0.41689 10C0.362143 10 0.307932 9.98925 0.257353 9.9683C0.206774 9.94735 0.160816 9.91664 0.122104 9.87793C0.0833924 9.83921 0.0526845 9.79326 0.0317339 9.74268C0.0107832 9.6921 0 9.63789 0 9.58314C0 9.52839 0.0107832 9.47418 0.0317339 9.4236C0.0526845 9.37302 0.0833924 9.32707 0.122104 9.28835L3.57724 5.83322H1.25021C1.1397 5.83322 1.03372 5.78932 0.955585 5.71118C0.877446 5.63304 0.833548 5.52706 0.833548 5.41656C0.833548 5.30605 0.877446 5.20007 0.955585 5.12194C1.03372 5.0438 1.1397 4.9999 1.25021 4.9999H4.58347C4.69398 4.9999 4.79996 5.0438 4.87809 5.12194C4.95623 5.20007 5.00013 5.30605 5.00013 5.41656ZM9.16671 0H2.50018C2.27917 0 2.06721 0.0877956 1.91094 0.244073C1.75466 0.40035 1.66686 0.612307 1.66686 0.833317V3.33327C1.66686 3.44377 1.71076 3.54975 1.7889 3.62789C1.86704 3.70603 1.97302 3.74992 2.08352 3.74992C2.19403 3.74992 2.30001 3.70603 2.37814 3.62789C2.45628 3.54975 2.50018 3.44377 2.50018 3.33327V0.833317H9.16671V7.49985H6.66676C6.55626 7.49985 6.45028 7.54375 6.37214 7.62188C6.294 7.70002 6.25011 7.806 6.25011 7.91651C6.25011 8.02701 6.294 8.13299 6.37214 8.21113C6.45028 8.28927 6.55626 8.33317 6.66676 8.33317H9.16671C9.38772 8.33317 9.59968 8.24537 9.75596 8.08909C9.91223 7.93282 10 7.72086 10 7.49985V0.833317C10 0.612307 9.91223 0.40035 9.75596 0.244073C9.59968 0.0877956 9.38772 0 9.16671 0Z" fill="#0C2140"/>
  </svg>
)

export default function DokumentyPage() {
  const [activeTab, setActiveTab] = useState('templates')

  const filtered = documents.filter(d => d.tab === activeTab)

  return (
    <>
      {/* ═══ HERO + ДОКУМЕНТЫ ══════════════════════════════════════════ */}
      <section className="bg-[#E7E9EC]">
        <div className="max-w-[1440px] mx-auto px-[20px] md:px-[140px] relative isolate overflow-hidden">

          {/* Декоративный элемент */}
          <div className="hidden md:block absolute left-[48px] top-[-3px] pointer-events-none select-none z-[-1]">
            <Image src="/images/hero-illustration.svg" alt="" width={593} height={677} />
          </div>

          {/* Хлебные крошки */}
          <div className="pt-[40px] md:pt-[76px]">
            <Breadcrumb items={[{ label: 'Документы' }]} />
          </div>

          {/* Заголовок */}
          <h1 className="text-[30px] md:text-[40px] font-normal text-[#0C2140] mt-[12px] tracking-[-2px]">
            Документы
          </h1>

          {/* Табы */}
          <div className="flex gap-[4px] mt-[33px]">
            {tabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className="text-[14px] font-normal text-white transition-colors flex items-center justify-center cursor-pointer"
                style={{
                  backgroundColor: activeTab === tab.key ? '#40BE27' : '#72C960',
                  paddingLeft: 16,
                  paddingRight: 16,
                  height: 38,
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Карточки документов */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[8px] mt-[29px] mb-[40px] md:mb-[74px]">
            {filtered.length > 0 ? filtered.map(doc => (
              <a
                key={doc.id}
                href={doc.file}
                download
                className="flex cursor-pointer hover:opacity-80 transition-opacity"
                style={{ height: 120, backgroundColor: '#ffffff', padding: 10, textDecoration: 'none' }}
              >
                {/* Серый квадрат с иконкой */}
                <Image src={doc.icon} width={100} height={100} alt="" className="shrink-0" />

                {/* Контент */}
                <div className="flex flex-col justify-between ml-[18px] flex-1 min-w-0" style={{ height: 100 }}>
                  {/* Тип документа (DOC / PDF) */}
                  <div
                    className="inline-flex items-center self-start px-[10px]"
                    style={{
                      backgroundColor: doc.type === 'DOC'
                        ? 'rgba(32,122,226,0.15)'
                        : 'rgba(255,0,4,0.15)',
                      height: 26,
                      borderRadius: 50,
                    }}
                  >
                    <span
                      className="text-[12px] font-normal leading-none"
                      style={{ color: doc.typeBg }}
                    >
                      {doc.type}
                    </span>
                  </div>

                  {/* Название + стрелка */}
                  <div className="flex items-end justify-between gap-[8px]" style={{ height: 48 }}>
                    <p className="text-[20px] font-normal text-[#0C2140] leading-[1.2] line-clamp-2">
                      {doc.title}
                    </p>
                    <div className="shrink-0 mb-[1px]">
                      <RedirectIcon />
                    </div>
                  </div>
                </div>
              </a>
            )) : (
              <p className="text-[16px] font-normal text-[#6D7A8C] col-span-2 py-[40px]">
                Документы отсутствуют
              </p>
            )}
          </div>

        </div>
      </section>

      {/* ═══ ФОРМА ОБРАТНОЙ СВЯЗИ ════════════════════════════════════ */}
      <ContactFormSection />
    </>
  )
}
