'use client'
import { useState, useEffect } from 'react'
import { useConsultation } from '@/lib/consultation-context'
import ContactForm from '@/components/ui/ContactForm'

export default function ConsultationModal() {
  const { isOpen, closeModal } = useConsultation()
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const handleClose = () => {
    setSuccess(false)
    closeModal()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#0C2140]/80" onClick={handleClose} />
      <div className="relative w-full max-w-[560px] p-5 shadow-xl" style={{ backgroundColor: '#DEE2E8' }}>
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 transition-colors cursor-pointer"
          style={{ color: '#9EA6B3' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {success ? (
          <div className="py-12 text-center">
            <p className="text-[30px] font-normal text-[#0C2140] mb-3">Ваша заявка успешно отправлена</p>
            <p className="text-[16px] font-normal text-[#6D7A8C]">С вами свяжутся в течении 15 минут</p>
          </div>
        ) : (
          <>
            <h2 className="text-[30px] font-normal text-[#0C2140] mb-[32px]">Заказать консультацию</h2>
            <ContactForm onSuccess={() => setSuccess(true)} />
          </>
        )}
      </div>
    </div>
  )
}
