'use client'
import { useConsultation } from '@/lib/consultation-context'

export default function ConsultationButton({ label = 'Консультация', className = '' }: { label?: string; className?: string }) {
  const { openModal } = useConsultation()
  return (
    <button
      onClick={openModal}
      className={`bg-[#0C2140] hover:bg-[#304564] text-white text-sm font-medium px-8 py-3 rounded transition-colors ${className}`}
    >
      {label}
    </button>
  )
}
