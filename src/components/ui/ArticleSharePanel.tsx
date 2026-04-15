'use client'

import { useState } from 'react'

interface ArticleSharePanelProps {
  title: string
}

function LinkIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 40 40" fill="none" aria-hidden="true" className="shrink-0">
      <path
        d="M23.9987 16.0007L16.0007 23.9987M14.6673 18.6673L11.3323 22.0023C9.12317 24.2115 9.12317 27.7932 11.3323 30.0023C13.5415 32.2115 17.1232 32.2115 19.3323 30.0023L22.6673 26.6673M18.6673 14.6673L22.0023 11.3323C24.2115 9.12317 27.7932 9.12317 30.0023 11.3323C32.2115 13.5415 32.2115 17.1232 30.0023 19.3323L26.6673 22.6673"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function TelegramIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path
        d="M22.4657 6.32548L4.86754 13.1046C3.6666 13.5862 3.67354 14.2564 4.64981 14.5553L9.16708 15.9656L19.6194 9.37231C20.1135 9.07219 20.5647 9.2335 20.1932 9.56253L11.724 17.2053H11.722L11.724 17.2064L11.4127 21.8553C11.8688 21.8553 12.0702 21.6462 12.3258 21.3997L14.5209 19.265L19.0874 22.6379C19.9292 23.1017 20.534 22.8638 20.7435 21.8564L23.7398 7.73324C24.0467 6.49999 23.2701 5.94138 22.4657 6.32548Z"
        fill="currentColor"
      />
    </svg>
  )
}

function VkIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path
        d="M14.8133 20.2631C8.95555 20.2631 5.61333 16.2486 5.47444 9.5697H8.40888C8.505 14.4708 10.6656 16.5464 12.3772 16.9742V9.5697H15.1406V13.7964C16.8303 13.6142 18.6003 11.6886 19.1994 9.5697H21.9628C21.5028 12.182 19.5831 14.1075 18.2164 14.8997C19.5831 15.5414 21.7703 17.2236 22.6044 20.2631H19.5622C18.9097 18.2297 17.2897 16.6531 15.1406 16.4381V20.2631H14.8133Z"
        fill="currentColor"
      />
    </svg>
  )
}

function PdfIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 40 40" fill="none" aria-hidden="true" className="shrink-0">
      <path
        d="M24 4H11.3333C10.4493 4 9.60143 4.35119 8.97631 4.97631C8.35119 5.60143 8 6.44928 8 7.33333V32.6667C8 33.5507 8.35119 34.3986 8.97631 35.0237C9.60143 35.6488 10.4493 36 11.3333 36H28.6667C29.5507 36 30.3986 35.6488 31.0237 35.0237C31.6488 34.3986 32 33.5507 32 32.6667V12L24 4Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24 4V12H32"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 28.666H14.3333C15.2538 28.666 16 27.9198 16 26.9993V25.666C16 24.7455 15.2538 23.9993 14.3333 23.9993H12V28.666Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.333 28.666V23.9993H21.333C22.8058 23.9993 23.9997 25.1932 23.9997 26.666C23.9997 28.1388 22.8058 29.3327 21.333 29.3327H19.333"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M27.333 23.9993V28.666"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M27.333 26.3327H30.6663"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function ArticleSharePanel({ title }: ArticleSharePanelProps) {
  const [copied, setCopied] = useState(false)

  const getShareUrl = (network: 'telegram' | 'vk') => {
    const currentUrl = window.location.href
    const encodedUrl = encodeURIComponent(currentUrl)
    const encodedTitle = encodeURIComponent(title)

    switch (network) {
      case 'telegram':
        return `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`
      case 'vk':
        return `https://vk.com/share.php?url=${encodedUrl}&title=${encodedTitle}`
    }
  }

  const handleCopy = async () => {
    const currentUrl = window.location.href

    try {
      if (!navigator.clipboard?.writeText) {
        throw new Error('Clipboard API is unavailable')
      }

      await navigator.clipboard.writeText(currentUrl)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2200)
    } catch {
      window.prompt('Скопируйте ссылку на материал', currentUrl)
    }
  }

  const handleShare = (network: 'telegram' | 'vk') => {
    window.open(getShareUrl(network), '_blank', 'noopener,noreferrer')
  }

  const handleDownloadPdf = () => {
    window.print()
  }

  return (
    <section className="mt-[56px] w-full max-w-[527px] print:hidden">
      <h2 className="text-[20px] font-normal leading-[120%] tracking-[-0.5px] text-[#0C2140]">
        Поделиться материалом
      </h2>

      <div className="mt-[28px] flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-6">
        <div className="flex flex-wrap items-center gap-x-[18px] gap-y-3 md:flex-nowrap">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex cursor-pointer items-center gap-[6px] text-left text-[#0C2140] transition-opacity hover:opacity-70"
          >
            <LinkIcon />
            <span className="text-[14px] font-medium leading-[120%] tracking-[0]">
              {copied ? 'Ссылка скопирована' : 'Скопировать ссылку'}
            </span>
          </button>

          <div className="flex items-center gap-[8px]">
            <button
              type="button"
              onClick={() => handleShare('telegram')}
              aria-label="Поделиться в Telegram"
              className="flex h-[28px] w-[28px] cursor-pointer items-center justify-center rounded-full bg-black text-white transition-opacity hover:opacity-80"
            >
              <TelegramIcon />
            </button>
            <button
              type="button"
              onClick={() => handleShare('vk')}
              aria-label="Поделиться во ВКонтакте"
              className="flex h-[28px] w-[28px] cursor-pointer items-center justify-center rounded-full bg-black text-white transition-opacity hover:opacity-80"
            >
              <VkIcon />
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={handleDownloadPdf}
          className="inline-flex cursor-pointer items-center gap-[10px] text-left text-[#0C2140] transition-opacity hover:opacity-70"
        >
          <PdfIcon />
          <span className="text-[14px] font-medium leading-[120%] tracking-[0]">Скачать PDF 0.1 MB</span>
        </button>
      </div>
    </section>
  )
}
