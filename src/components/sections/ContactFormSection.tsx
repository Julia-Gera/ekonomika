'use client'
import { useState } from 'react'
import Image from 'next/image'
import ContactForm from '@/components/ui/ContactForm'

export default function ContactFormSection() {
  const [success, setSuccess] = useState(false)

  if (success) {
    return (
      <section className="bg-[#E7E9EC] pb-[40px]">
        <div className="max-w-[1440px] mx-auto px-[20px] md:px-[140px]">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="bg-[#DEE2E8] p-5 flex items-center justify-center min-h-[300px] md:min-h-[400px]">
              <div>
                <p className="text-[24px] md:text-[30px] font-normal text-[#0C2140] mb-3">
                  Ваша заявка успешно отправлена
                </p>
                <p className="text-[16px] font-normal text-[#6D7A8C] text-center">
                  С вами свяжутся в ближайшее время
                </p>
              </div>
            </div>
            <div className="relative hidden md:block min-h-[400px] overflow-hidden">
              <Image
                src="/images/form-photo.jpg"
                alt="Команда Экономика труда"
                fill
                className="object-cover object-center"
                sizes="580px"
              />
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-[#E7E9EC] pb-[40px]">
      <div className="max-w-[1440px] mx-auto px-[20px] md:px-[140px]">
        <div className="grid grid-cols-1 md:grid-cols-2">

          {/* Форма */}
          <div className="bg-[#DEE2E8] p-5">
            <h2 className="text-[24px] md:text-[30px] font-normal text-[#0C2140] mb-[32px]">
              Форма обратной связи
            </h2>
            <ContactForm onSuccess={() => setSuccess(true)} />
          </div>

          {/* Фото — на мобиле снизу, на десктопе рядом */}
          <div className="relative min-h-[240px] md:min-h-[400px] overflow-hidden">
            <Image
              src="/images/form-photo.jpg"
              alt="Команда Экономика труда"
              fill
              className="object-cover object-center"
              sizes="580px"
            />
          </div>

        </div>
      </div>
    </section>
  )
}
