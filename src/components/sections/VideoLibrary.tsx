'use client'

import Image from 'next/image'
import { useMemo, useRef, useState } from 'react'
import type { VideoEpisode } from '@/lib/video'
import { getVideoLinks } from '@/lib/video'

const PlayIcon = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
    <path
      d="M8.25 5.75v12.5L18.5 12 8.25 5.75Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </svg>
)

const ExternalIcon = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
    <path
      d="M7 17 17 7M10 7h7v7"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

function VideoPreview({ video, featured = false }: { video: VideoEpisode; featured?: boolean }) {
  return (
    <div className="relative aspect-video overflow-hidden bg-[#CED3D9]">
      {video.thumbnailUrl ? (
        <Image
          src={video.thumbnailUrl}
          alt=""
          fill
          sizes={featured ? '(min-width: 768px) 860px, calc(100vw - 40px)' : '(min-width: 1024px) 290px, (min-width: 768px) 380px, calc(100vw - 40px)'}
          className="object-cover"
          priority={featured}
          unoptimized
        />
      ) : (
        <div className="h-full w-full bg-[#CED3D9]" />
      )}
      <div className="absolute inset-0 bg-[#0C2140]/18" />
      <span
        className={`absolute left-1/2 top-1/2 grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#0C2140] text-white ${
          featured ? 'h-[54px] w-[54px] md:h-[66px] md:w-[66px]' : 'h-[44px] w-[44px] md:h-[48px] md:w-[48px]'
        }`}
      >
        <PlayIcon className={`${featured ? 'h-[26px] w-[26px]' : 'h-[20px] w-[20px]'} translate-x-[1px]`} />
      </span>
    </div>
  )
}

function PlatformButtons({ video, compact = false }: { video: VideoEpisode; compact?: boolean }) {
  const links = getVideoLinks(video.youtubeUrl, video.rutubeUrl)

  if (!links.length) return null

  return (
    <div className={`flex flex-wrap ${compact ? 'gap-[8px]' : 'gap-[10px]'}`}>
      {links.map((link) => (
        <a
          key={`${video.id}-${link.platform}`}
          href={link.url}
          target="_blank"
          rel="noreferrer"
          className={`inline-flex items-center justify-center gap-[7px] border border-[#B6BCC6] bg-white text-[#0C2140] transition-colors hover:border-[#0C2140] hover:bg-[#F6F7F9] ${
            compact
              ? 'h-[36px] min-w-[62px] px-[10px] text-[13px]'
              : 'h-[48px] min-w-[118px] px-[18px] text-[17px]'
          }`}
        >
          <ExternalIcon className="h-[17px] w-[17px]" />
          <span>{compact ? (link.platform === 'youtube' ? 'YT' : 'RT') : link.label}</span>
        </a>
      ))}
    </div>
  )
}

function FeaturedVideo({ video }: { video: VideoEpisode }) {
  return (
    <article id={`video-${video.id}`} className="scroll-mt-[20px] overflow-hidden border border-[#CED3D9] bg-white">
      <div className="grid grid-cols-1">
        {video.embedUrl ? (
          <div className="aspect-video bg-[#CED3D9]">
            <iframe
              key={video.embedUrl}
              src={video.embedUrl}
              title={video.title}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
            />
          </div>
        ) : (
          <VideoPreview video={video} featured />
        )}

        <div className="grid gap-[18px] p-[16px] md:grid-cols-[1fr_auto] md:items-center md:gap-[24px] md:p-[20px]">
          <div>
            {video.tag && (
              <span className="mb-[12px] inline-flex bg-[#E7E9EC] px-[14px] py-[6px] text-[14px] font-normal leading-[17px] text-[#0C2140]">
                {video.tag}
              </span>
            )}
            <h2 className="max-w-[680px] text-[20px] font-normal leading-[1.22] tracking-[-0.4px] text-[#0C2140] md:text-[23px]">
              {video.title}
            </h2>
            {video.description && (
              <p className="mt-[12px] line-clamp-4 max-w-[680px] text-[15px] font-normal leading-[1.5] text-[#556988] md:text-[16px]">
                {video.description}
              </p>
            )}
          </div>

          <div className="flex items-end md:justify-end">
            <PlatformButtons video={video} />
          </div>
        </div>
      </div>
    </article>
  )
}

function VideoCard({ video, onSelect }: { video: VideoEpisode; onSelect: (id: number) => void }) {
  return (
    <article id={`video-${video.id}`} className="scroll-mt-[20px] overflow-hidden border border-[#CED3D9] bg-white">
      <button
        type="button"
        onClick={() => onSelect(video.id)}
        className="group block w-full text-left"
        aria-label={`Смотреть на сайте: ${video.title}`}
      >
        <VideoPreview video={video} />
      </button>

      <div className="p-[14px] md:p-[18px]">
        {video.tag && (
          <span className="mb-[10px] inline-flex bg-[#E7E9EC] px-[10px] py-[5px] text-[13px] font-normal leading-[16px] text-[#0C2140]">
            {video.tag}
          </span>
        )}
        <h3 className="line-clamp-2 min-h-[42px] text-[16px] font-normal leading-[1.25] tracking-[-0.2px] text-[#0C2140] md:text-[17px]">
          {video.title}
        </h3>
        {video.description && (
          <p className="mt-[8px] line-clamp-3 text-[14px] font-normal leading-[1.4] text-[#556988]">
            {video.description}
          </p>
        )}
        {video.date && (
          <p className="mt-[14px] text-[14px] font-normal leading-[1.4] text-[#6D7A8C] md:text-[15px]">
            {video.date}
          </p>
        )}
        <div className="mt-[12px] flex justify-end">
          <PlatformButtons video={video} compact />
        </div>
      </div>
    </article>
  )
}

export default function VideoLibrary({ videos }: { videos: VideoEpisode[] }) {
  const [selectedId, setSelectedId] = useState(videos[0]?.id)
  const playerRef = useRef<HTMLElement | null>(null)
  const selectedVideo = useMemo(
    () => videos.find((video) => video.id === selectedId) ?? videos[0],
    [selectedId, videos]
  )
  const otherVideos = videos.filter((video) => video.id !== selectedVideo?.id)

  const selectVideo = (id: number) => {
    setSelectedId(id)
    playerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  if (!selectedVideo) {
    return (
      <div className="border border-[#CED3D9] bg-white px-[20px] py-[28px] text-[18px] leading-[1.45] text-[#556988]">
        Видео пока не опубликованы.
      </div>
    )
  }

  return (
    <div>
      <section ref={playerRef} className="mx-auto max-w-[860px]">
        <FeaturedVideo video={selectedVideo} />
      </section>

      {otherVideos.length > 0 && (
        <section className="mx-auto mt-[30px] max-w-[920px] md:mt-[38px]">
          <h2 className="mb-[14px] text-[23px] font-normal leading-[1.2] tracking-[-0.7px] text-[#0C2140] md:mb-[18px] md:text-[26px]">
            Все выпуски
          </h2>
          <div className="grid grid-cols-1 gap-[10px] md:grid-cols-2 md:gap-[12px] lg:grid-cols-3">
            {otherVideos.map((video) => (
              <VideoCard key={video.id} video={video} onSelect={selectVideo} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
