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

function WhatsAppIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path
        d="M23.8023 13.7095C23.8058 18.9439 19.5622 23.1904 14.3289 23.1904H14.3254C12.6507 23.1898 11.0044 22.7465 9.55591 21.9058L4.19727 23.3114L5.63295 18.089C4.74894 16.587 4.28384 14.8779 4.28677 13.1385C4.29203 7.90462 8.5385 3.66113 13.7724 3.66113C16.3133 3.66218 18.6987 4.65247 20.4895 6.44753C22.2802 8.24259 23.8035 11.1686 23.8023 13.7095ZM14.3289 5.26263C9.97816 5.26263 6.44089 8.7999 6.43914 13.1507C6.43855 14.6626 6.86406 16.1382 7.66671 17.4141L7.96806 17.894L7.11972 20.9819L10.2904 20.1501L10.7534 20.4249C11.9802 21.1537 13.3875 21.5391 14.3254 21.5394H14.3289C18.6791 21.5394 22.2169 18.0016 22.2151 13.6512C22.2144 9.30049 18.678 5.26321 14.3289 5.26263ZM18.6662 15.8727C18.4285 15.7538 17.2621 15.1797 17.0443 15.1004C16.8265 15.0211 16.6681 14.9815 16.5094 15.2192C16.3508 15.4569 15.8955 15.9918 15.7568 16.1505C15.6181 16.3091 15.4794 16.3288 15.2417 16.2099C14.9961 16.0871 14.2048 15.8282 13.2664 14.9912C12.5362 14.3397 12.0432 13.5354 11.9045 13.2977C11.7658 13.06 11.8898 12.9314 12.0089 12.8131C12.1158 12.7068 12.2466 12.5357 12.3654 12.397C12.4843 12.2583 12.5238 12.1593 12.6032 12.0006C12.6825 11.8419 12.6428 11.7035 12.5835 11.5847C12.5241 11.4658 12.0489 10.2992 11.851 9.82379C11.6586 9.36114 11.4631 9.42426 11.3175 9.41695L10.9019 9.40994C10.7432 9.40994 10.4858 9.46937 10.2679 9.70708C10.05 9.94479 9.43652 10.5189 9.43652 11.6871C9.43652 12.8552 10.2876 13.9837 10.4064 14.1424C10.5253 14.3011 12.0831 16.7038 14.4679 17.7333C15.0341 17.9778 15.4764 18.1237 15.8211 18.233C16.3894 18.4138 16.9064 18.3883 17.3152 18.3273C17.7717 18.2591 18.7205 17.7539 18.9188 17.1994C19.117 16.6449 19.117 16.1702 19.0578 16.0714C18.9984 15.9723 18.9039 15.9518 18.6662 15.8727Z"
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

  const getShareUrl = (network: 'telegram' | 'vk' | 'whatsapp') => {
    const currentUrl = window.location.href
    const encodedUrl = encodeURIComponent(currentUrl)
    const encodedTitle = encodeURIComponent(title)
    const encodedMessage = encodeURIComponent(`${title} ${currentUrl}`)

    switch (network) {
      case 'telegram':
        return `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`
      case 'vk':
        return `https://vk.com/share.php?url=${encodedUrl}&title=${encodedTitle}`
      case 'whatsapp':
        return `https://wa.me/?text=${encodedMessage}`
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

  const handleShare = (network: 'telegram' | 'vk' | 'whatsapp') => {
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
            <button
              type="button"
              onClick={() => handleShare('whatsapp')}
              aria-label="Поделиться в WhatsApp"
              className="flex h-[28px] w-[28px] cursor-pointer items-center justify-center rounded-full bg-black text-white transition-opacity hover:opacity-80"
            >
              <WhatsAppIcon />
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
