'use client'
import { createContext, useContext, useState, ReactNode } from 'react'

interface ConsultationContextType {
  isOpen: boolean
  openModal: () => void
  closeModal: () => void
}

const ConsultationContext = createContext<ConsultationContextType>({
  isOpen: false,
  openModal: () => {},
  closeModal: () => {},
})

export function ConsultationProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <ConsultationContext.Provider value={{ isOpen, openModal: () => setIsOpen(true), closeModal: () => setIsOpen(false) }}>
      {children}
    </ConsultationContext.Provider>
  )
}

export const useConsultation = () => useContext(ConsultationContext)
