'use client'
import { useState } from 'react'
import Link from 'next/link'

interface ContactFormProps {
  onSuccess?: () => void
}

export default function ContactForm({ onSuccess }: ContactFormProps) {
  const [agreed, setAgreed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', message: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!agreed) return
    setLoading(true)
    try {
      await fetch('/api/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      onSuccess?.()
    } catch {}
    setLoading(false)
  }

  /* Figma: cornerRadius:4, strokes:[], fill:#fff, padding:14px, h:45px */
  const inputCls = [
    'w-full bg-white rounded px-[14px] h-[45px]',
    'text-[14px] font-normal text-[#0C2140] placeholder:text-[#6D7A8C]',
    'focus:outline-none transition-colors',
  ].join(' ')

  /* Figma: Cygre SemiBold 14px, #0c2140 */
  const labelCls = 'block text-[14px] font-semibold text-[#0C2140] mb-[8px]'

  return (
    <form onSubmit={handleSubmit} className="space-y-[16px]">
      {/* Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
        <div>
          <label className={labelCls}>Ваше ФИО</label>
          <input type="text" placeholder="Введите ваше ФИО*" required className={inputCls}
            value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
        </div>
        <div>
          <label className={labelCls}>Компания</label>
          <input type="text" placeholder="Компания" className={inputCls}
            value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} />
        </div>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
        <div>
          <label className={labelCls}>Ваш Email</label>
          <input type="email" placeholder="Email*" required className={inputCls}
            value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
        </div>
        <div>
          <label className={labelCls}>Ваш телефон</label>
          <input type="tel" placeholder="Телефон*" required className={inputCls}
            value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
        </div>
      </div>

      {/* Textarea — Figma h:94px внутри строки h:119 (17 label + 8 gap + 94) */}
      <div>
        <label className={labelCls}>Ваше сообщение</label>
        <textarea placeholder="Введите ваше сообщение*"
          className={[
            'w-full bg-white rounded px-[14px] py-[14px] h-[94px]',
            'text-[14px] font-normal text-[#0C2140] placeholder:text-[#6D7A8C]',
            'focus:outline-none transition-colors resize-none',
          ].join(' ')}
          value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
      </div>

      {/* Checkbox */}
      <div
        className="flex items-center gap-[10px] cursor-pointer select-none"
        onClick={() => setAgreed(v => !v)}
      >
        <div className={[
          'w-4 h-4 shrink-0 border flex items-center justify-center transition-colors',
          agreed ? 'bg-[#0C2140] border-[#0C2140]' : 'bg-white border-[#CED3D9]',
        ].join(' ')}>
          {agreed && (
            <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
              <path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.5"
                strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </div>
        <span className="text-[14px] font-normal text-[#6D7A8C]">
          Я согласен на обработку{' '}
          <Link
            href="/politika-konfidentsialnosti"
            className="underline hover:text-[#0C2140] transition-colors"
            onClick={e => e.stopPropagation()}
          >
            персональных данных
          </Link>
        </span>
      </div>

      {/* Submit button — Figma: px:32 py:16, no cornerRadius, #9ea6b3 disabled */}
      <button
        type="submit"
        disabled={!agreed || loading}
        className={[
          'px-8 py-4 text-[14px] font-normal text-white transition-colors',
          agreed && !loading
            ? 'bg-[#0C2140] hover:bg-[#304564] cursor-pointer'
            : 'bg-[#9EA6B3] cursor-not-allowed',
        ].join(' ')}
      >
        {loading ? 'Отправка...' : 'Отправить'}
      </button>
    </form>
  )
}
