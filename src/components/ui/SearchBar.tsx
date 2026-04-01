'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) router.push(`/poisk?q=${encodeURIComponent(query.trim())}`)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full md:w-[576px]">
      <div className="flex items-center h-[39px] px-[10px] gap-[11px]" style={{ backgroundColor: '#CED3D9' }}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
          <circle cx="7" cy="7" r="4.5" stroke="#6D7A8C" strokeWidth="1.3"/>
          <path d="M11 11L13.5 13.5" stroke="#6D7A8C" strokeWidth="1.3" strokeLinecap="round"/>
        </svg>
        <input
          type="text"
          placeholder="Поиск по сайту"
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="flex-1 text-[14px] font-normal text-[#0C2140] placeholder:text-[#6D7A8C] outline-none bg-transparent"
        />
      </div>
    </form>
  )
}
