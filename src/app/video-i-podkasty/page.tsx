import type { Metadata } from 'next'
import ContactFormSection from '@/components/sections/ContactFormSection'
import VideoLibrary from '@/components/sections/VideoLibrary'
import { getVideos } from '@/lib/api'
import { getSiteUrl } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Видео и подкасты',
  description: 'Видео и подкасты по экономике труда, трудовому праву и управлению персоналом.',
}

export default async function VideosPage() {
  const videos = await getVideos(1000)
  const pageUrl = new URL('/video-i-podkasty', getSiteUrl()).toString()
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Видео по экономике труда',
    url: pageUrl,
    itemListElement: videos.map((video, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `${pageUrl}#video-${video.id}`,
      item: {
        '@type': 'VideoObject',
        name: video.title,
        description: video.description || video.title,
        thumbnailUrl: video.thumbnailUrl ? [video.thumbnailUrl] : undefined,
        uploadDate: video.datePublished || undefined,
        embedUrl: video.embedUrl || undefined,
        contentUrl: video.youtubeUrl || video.rutubeUrl || undefined,
      },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <section className="bg-[#E7E9EC] py-[28px] md:py-[34px]">
        <div className="mx-auto max-w-[1440px] px-[20px] md:px-[140px]">
          <div className="mx-auto max-w-[760px] text-center">
            <h1 className="text-[30px] font-normal leading-[1.16] tracking-[-1px] text-[#0C2140] md:text-[38px] md:tracking-[-1.5px]">
              Видео по экономике труда
            </h1>
          </div>

          <div className="mt-[26px] md:mt-[30px]">
            <VideoLibrary videos={videos} />
          </div>
        </div>
      </section>

      <ContactFormSection />
    </>
  )
}
