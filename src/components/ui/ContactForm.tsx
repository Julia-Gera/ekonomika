'use client'
import { useState } from 'react'
import Link from 'next/link'
import { AsYouType, isPossiblePhoneNumber, parseIncompletePhoneNumber } from 'libphonenumber-js'

interface ContactFormProps {
  onSuccess?: () => void
}

type FormState = {
  name: string
  company: string
  email: string
  phone: string
  message: string
}

type FormErrors = Partial<Record<keyof FormState, string>>

const INITIAL_FORM: FormState = {
  name: '',
  company: '',
  email: '',
  phone: '',
  message: '',
}

const MAX_INTERNATIONAL_PHONE_DIGITS = 15
const MAX_RU_PHONE_DIGITS = 11
const MAX_BY_PHONE_DIGITS = 12
const NAME_ALLOWED_PATTERN = /^[\p{L}\s-]+$/u

function sanitizeNameInput(value: string) {
  return value.replace(/[0-9]/g, '')
}

function formatPhoneInput(value: string) {
  const sanitizedValue = parseIncompletePhoneNumber(value)

  if (!sanitizedValue) {
    return { displayValue: '', normalizedValue: '' }
  }

  if (sanitizedValue.startsWith('+')) {
    const digitsOnly = sanitizedValue.slice(1).replace(/\D/g, '')

    if (digitsOnly.startsWith('375')) {
      const limitedDigits = digitsOnly.slice(0, MAX_BY_PHONE_DIGITS)
      const belarusInput = `+${limitedDigits}`
      const formatter = new AsYouType('BY')
      const displayValue = formatter.input(belarusInput)
      const normalizedValue = formatter.getNumberValue() ?? belarusInput

      return { displayValue, normalizedValue }
    }

    if (digitsOnly.startsWith('7')) {
      const limitedDigits = digitsOnly.slice(0, MAX_RU_PHONE_DIGITS)
      const russianInput = `+${limitedDigits}`
      const formatter = new AsYouType('RU')
      const displayValue = formatter.input(russianInput)
      const normalizedValue = formatter.getNumberValue() ?? russianInput

      return { displayValue, normalizedValue }
    }

    const limitedDigits = digitsOnly.slice(0, MAX_INTERNATIONAL_PHONE_DIGITS)
    const internationalInput = `+${limitedDigits}`
    const formatter = new AsYouType()
    const displayValue = formatter.input(internationalInput)
    const normalizedValue = formatter.getNumberValue() ?? internationalInput

    return { displayValue, normalizedValue }
  }

  const digitsOnly = sanitizedValue.replace(/\D/g, '').slice(0, MAX_RU_PHONE_DIGITS)

  if (!digitsOnly) {
    return { displayValue: '', normalizedValue: '' }
  }

  const normalizedRuValue =
    digitsOnly.startsWith('8')
      ? `+7${digitsOnly.slice(1)}`
      : digitsOnly.startsWith('7')
        ? `+${digitsOnly}`
        : `+7${digitsOnly}`

  const formatter = new AsYouType('RU')
  const displayValue = formatter.input(normalizedRuValue)
  const normalizedValue = formatter.getNumberValue() ?? normalizedRuValue

  return { displayValue, normalizedValue }
}

function validateField(field: keyof FormState, value: string) {
  const trimmedValue = value.trim()

  switch (field) {
    case 'name':
      if (!trimmedValue) return 'Укажите ваше ФИО.'
      if (trimmedValue.length < 2) return 'Введите не менее 2 символов.'
      if (!NAME_ALLOWED_PATTERN.test(trimmedValue)) return 'ФИО может содержать только буквы, пробелы и дефис.'
      return ''
    case 'company':
      if (!trimmedValue) return ''
      if (trimmedValue.length < 2) return 'Введите не менее 2 символов.'
      return ''
    case 'email':
      if (!trimmedValue) return 'Укажите email.'
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedValue)) return 'Введите корректный email.'
      return ''
    case 'phone':
      if (!trimmedValue) return 'Укажите телефон.'
      if (!trimmedValue.startsWith('+')) return 'Введите корректный номер телефона.'
      if (!isPossiblePhoneNumber(trimmedValue)) return 'Введите корректный номер телефона.'
      return ''
    case 'message':
      if (!trimmedValue) return 'Введите сообщение.'
      if (trimmedValue.length < 10) return 'Введите не менее 10 символов.'
      return ''
    default:
      return ''
  }
}

function validateForm(form: FormState): FormErrors {
  return {
    name: validateField('name', form.name),
    company: validateField('company', form.company),
    email: validateField('email', form.email),
    phone: validateField('phone', form.phone),
    message: validateField('message', form.message),
  }
}

export default function ContactForm({ onSuccess }: ContactFormProps) {
  const [agreed, setAgreed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState<FormState>(INITIAL_FORM)
  const [phoneDisplay, setPhoneDisplay] = useState('')
  const [fieldErrors, setFieldErrors] = useState<FormErrors>({})

  const setFieldValue = (field: keyof FormState, value: string) => {
    setForm((currentForm) => ({ ...currentForm, [field]: value }))

    if (fieldErrors[field]) {
      setFieldErrors((currentErrors) => ({
        ...currentErrors,
        [field]: validateField(field, value),
      }))
    }
  }

  const handleFieldBlur = (field: keyof FormState) => {
    setFieldErrors((currentErrors) => ({
      ...currentErrors,
      [field]: validateField(field, form[field]),
    }))
  }

  const handlePhoneChange = (value: string) => {
    const { displayValue, normalizedValue } = formatPhoneInput(value)

    setPhoneDisplay(displayValue)
    setForm((currentForm) => ({
      ...currentForm,
      phone: normalizedValue,
    }))

    if (fieldErrors.phone) {
      setFieldErrors((currentErrors) => ({
        ...currentErrors,
        phone: validateField('phone', normalizedValue),
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!agreed) return

    const nextFieldErrors = validateForm(form)
    const hasValidationErrors = Object.values(nextFieldErrors).some(Boolean)

    setFieldErrors(nextFieldErrors)

    if (hasValidationErrors) {
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          name: form.name.trim(),
          company: form.company.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
        }),
      })

      if (!response.ok) {
        const payload = await response.json().catch(() => null)
        throw new Error(payload?.error ?? 'Request failed')
      }

      onSuccess?.()
      setForm(INITIAL_FORM)
      setPhoneDisplay('')
      setFieldErrors({})
      setAgreed(false)
    } catch (requestError) {
      const message =
        requestError instanceof Error && requestError.message
          ? requestError.message
          : 'Не удалось отправить заявку. Попробуйте еще раз.'

      setError(message)
    } finally {
      setLoading(false)
    }
  }

  /* Figma: cornerRadius:4, strokes:[], fill:#fff, padding:14px, h:45px */
  const inputCls = [
    'w-full bg-white rounded px-[14px] h-[45px]',
    'text-[14px] font-normal text-[#0C2140] placeholder:text-[#6D7A8C]',
    'border border-transparent focus:outline-none transition-colors',
  ].join(' ')

  /* Figma: Cygre SemiBold 14px, #0c2140 */
  const labelCls = 'block text-[14px] font-semibold text-[#0C2140] mb-[8px]'

  return (
    <form onSubmit={handleSubmit} className="space-y-[16px]">
      {/* Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
        <div>
          <label className={labelCls}>Ваше ФИО</label>
          <input
            type="text"
            placeholder="Введите ваше ФИО"
            required
            className={`${inputCls} ${fieldErrors.name ? 'border-[#b42318]' : 'focus:border-[#0C2140]'}`}
            value={form.name}
            onChange={(e) => setFieldValue('name', sanitizeNameInput(e.target.value))}
            onBlur={() => handleFieldBlur('name')}
          />
          {fieldErrors.name && <p className="mt-[6px] text-[12px] text-[#b42318]">{fieldErrors.name}</p>}
        </div>
        <div>
          <label className={labelCls}>Компания</label>
          <input
            type="text"
            placeholder="Компания"
            className={`${inputCls} ${fieldErrors.company ? 'border-[#b42318]' : 'focus:border-[#0C2140]'}`}
            value={form.company}
            onChange={(e) => setFieldValue('company', e.target.value)}
            onBlur={() => handleFieldBlur('company')}
          />
          {fieldErrors.company && <p className="mt-[6px] text-[12px] text-[#b42318]">{fieldErrors.company}</p>}
        </div>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
        <div>
          <label className={labelCls}>Ваш Email</label>
          <input
            type="email"
            placeholder="Email"
            required
            className={`${inputCls} ${fieldErrors.email ? 'border-[#b42318]' : 'focus:border-[#0C2140]'}`}
            value={form.email}
            onChange={(e) => setFieldValue('email', e.target.value)}
            onBlur={() => handleFieldBlur('email')}
          />
          {fieldErrors.email && <p className="mt-[6px] text-[12px] text-[#b42318]">{fieldErrors.email}</p>}
        </div>
        <div>
          <label className={labelCls}>Ваш телефон</label>
          <input
            type="tel"
            placeholder="+7 (999) 123-45-67"
            required
            className={`${inputCls} ${fieldErrors.phone ? 'border-[#b42318]' : 'focus:border-[#0C2140]'}`}
            value={phoneDisplay}
            onChange={(e) => handlePhoneChange(e.target.value)}
            onBlur={() => handleFieldBlur('phone')}
            inputMode="tel"
            autoComplete="tel"
          />
          {fieldErrors.phone && <p className="mt-[6px] text-[12px] text-[#b42318]">{fieldErrors.phone}</p>}
        </div>
      </div>

      {/* Textarea — Figma h:94px внутри строки h:119 (17 label + 8 gap + 94) */}
      <div>
        <label className={labelCls}>Ваше сообщение</label>
        <textarea placeholder="Введите ваше сообщение"
          className={[
            'w-full bg-white rounded px-[14px] py-[14px] h-[94px]',
            'text-[14px] font-normal text-[#0C2140] placeholder:text-[#6D7A8C]',
            'border border-transparent focus:outline-none transition-colors resize-none',
            fieldErrors.message ? 'border-[#b42318]' : 'focus:border-[#0C2140]',
          ].join(' ')}
          value={form.message}
          onChange={(e) => setFieldValue('message', e.target.value)}
          onBlur={() => handleFieldBlur('message')}
        />
        {fieldErrors.message && <p className="mt-[6px] text-[12px] text-[#b42318]">{fieldErrors.message}</p>}
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

      {error && (
        <p className="text-[14px] font-normal text-[#b42318]">{error}</p>
      )}

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
