'use client'
import Link from 'next/link'
import { useState } from 'react'

const ArticleIcon = ({ color }: { color: string }) => (
  <svg width="27" height="20" viewBox="0 0 27 20" fill="none" className="shrink-0">
    <rect x="1" y="1" width="25" height="18" stroke={color} strokeWidth="1.1" fill="none"/>
    <path d="M5 7H22" stroke={color} strokeWidth="1.1" strokeLinecap="round"/>
    <path d="M5 10.5H22" stroke={color} strokeWidth="1.1" strokeLinecap="round"/>
    <path d="M5 14H16" stroke={color} strokeWidth="1.1" strokeLinecap="round"/>
  </svg>
)

const RedirectIcon = ({ color }: { color: string }) => (
  <svg width="18" height="18" viewBox="0 0 10 10" fill="none" className="shrink-0">
    <path d="M5.00013 5.41656V8.74982C5.00013 8.86033 4.95623 8.96631 4.87809 9.04445C4.79996 9.12258 4.69398 9.16648 4.58347 9.16648C4.47297 9.16648 4.36699 9.12258 4.28885 9.04445C4.21071 8.96631 4.16681 8.86033 4.16681 8.74982V6.42279L0.711676 9.87793C0.672964 9.91664 0.627006 9.94735 0.576427 9.9683C0.525847 9.98925 0.471637 10 0.41689 10C0.362143 10 0.307932 9.98925 0.257353 9.9683C0.206774 9.94735 0.160816 9.91664 0.122104 9.87793C0.0833924 9.83921 0.0526845 9.79326 0.0317339 9.74268C0.0107832 9.6921 0 9.63789 0 9.58314C0 9.52839 0.0107832 9.47418 0.0317339 9.4236C0.0526845 9.37302 0.0833924 9.32707 0.122104 9.28835L3.57724 5.83322H1.25021C1.1397 5.83322 1.03372 5.78932 0.955585 5.71118C0.877446 5.63304 0.833548 5.52706 0.833548 5.41656C0.833548 5.30605 0.877446 5.20007 0.955585 5.12194C1.03372 5.0438 1.1397 4.9999 1.25021 4.9999H4.58347C4.69398 4.9999 4.79996 5.0438 4.87809 5.12194C4.95623 5.20007 5.00013 5.30605 5.00013 5.41656ZM9.16671 0H2.50018C2.27917 0 2.06721 0.0877956 1.91094 0.244073C1.75466 0.40035 1.66686 0.612307 1.66686 0.833317V3.33327C1.66686 3.44377 1.71076 3.54975 1.7889 3.62789C1.86704 3.70603 1.97302 3.74992 2.08352 3.74992C2.19403 3.74992 2.30001 3.70603 2.37814 3.62789C2.45628 3.54975 2.50018 3.44377 2.50018 3.33327V0.833317H9.16671V7.49985H6.66676C6.55626 7.49985 6.45028 7.54375 6.37214 7.62188C6.294 7.70002 6.25011 7.806 6.25011 7.91651C6.25011 8.02701 6.294 8.13299 6.37214 8.21113C6.45028 8.28927 6.55626 8.33317 6.66676 8.33317H9.16671C9.38772 8.33317 9.59968 8.24537 9.75596 8.08909C9.91223 7.93282 10 7.72086 10 7.49985V0.833317C10 0.612307 9.91223 0.40035 9.75596 0.244073C9.59968 0.0877956 9.38772 0 9.16671 0Z" fill={color}/>
  </svg>
)

interface ArticleCardProps {
  date: string
  category: string
  title: string
  href: string
}

export default function ArticleCard({ date, category, title, href }: ArticleCardProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="block p-5 h-[200px] flex flex-col transition-colors duration-200"
      style={{ backgroundColor: hovered ? '#8ba0be' : '#ffffff', borderLeft: '2px solid #8BA0BE' }}
    >
      <div className="flex items-center justify-between mb-[14px]">
        <span className="text-[14px] font-normal leading-[17px] transition-colors" style={{ color: hovered ? '#ffffff' : '#0C2140' }}>
          {date}
        </span>
        <ArticleIcon color={hovered ? '#ffffff' : '#9EA6B3'} />
      </div>

      {category && (
        <span
          className="inline-block text-[12px] font-normal px-4 py-2 mb-[8px] self-start leading-[14px] transition-colors"
          style={{
            backgroundColor: hovered ? '#6D7A8C' : '#E7E9EC',
            color: hovered ? '#ffffff' : '#0C2140',
          }}
        >
          {category}
        </span>
      )}

      <p
        className="text-[16px] font-normal leading-[1.375] transition-colors flex-1 line-clamp-3"
        style={{ color: hovered ? '#ffffff' : '#0C2140' }}
      >
        {title}
      </p>

      <div className="flex justify-end mt-auto">
        <RedirectIcon color={hovered ? '#ffffff' : '#0C2140'} />
      </div>
    </Link>
  )
}
