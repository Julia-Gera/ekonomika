import Image from 'next/image'
import Breadcrumb from '@/components/ui/Breadcrumb'
import ContactFormSection from '@/components/sections/ContactFormSection'
import ConsultationButton from '@/components/ui/ConsultationButton'
import { getServiceBySlug } from '@/lib/api'
import { renderRichTextContent } from '@/lib/markdown'
import { notFound } from 'next/navigation'
import type { Service, ServicePageSection } from '@/lib/strapi'

interface Props {
  params: Promise<{ slug: string }>
}

export const dynamic = 'force-dynamic'

function hasStructuredContent(service: Service) {
  const pageContent = service.pageContent
  return Boolean(
    pageContent?.summaryTitle
    || pageContent?.summaryText?.length
    || pageContent?.sections?.length
  )
}

function ServiceTextSection({
  title,
  text,
  items,
  compact = false,
}: {
  title: string
  text?: string[]
  items?: string[]
  compact?: boolean
}) {
  return (
    <div className={`flex flex-col gap-[18px] md:flex-row md:gap-[40px] pt-[24px] ${compact ? 'md:pt-[18px] pb-[32px] md:pb-[35px]' : 'md:pt-[40px] pb-[28px] md:pb-[36px]'}`}>
      <div className="md:w-[534px] md:shrink-0">
        <h2 className="text-[22px] md:text-[24px] font-normal leading-[1.2] text-[#0C2140]">
          {title}
        </h2>
      </div>
      <div className="flex-1">
        {text?.length ? (
          <div className="space-y-[12px]">
            {text.map((paragraph) => (
              <p key={paragraph} className="text-[15px] md:text-[16px] font-normal text-[#0C2140] leading-[1.6]">
                {paragraph}
              </p>
            ))}
          </div>
        ) : null}

        {items?.length ? (
          <ul className={`${text?.length ? 'mt-[18px] md:mt-[24px]' : ''} space-y-[18px] md:space-y-[24px]`}>
            {items.map((item) => (
              <li key={item} className="flex items-start gap-[14px] md:gap-[22px]">
                <span className="w-[10px] h-[10px] bg-[#40BE27] shrink-0 mt-[6px] md:mt-[7px]" />
                <span className="text-[15px] md:text-[16px] leading-[1.5] font-normal text-[#0C2140]">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  )
}

function ServiceCardsSection({ section }: { section: ServicePageSection }) {
  return (
    <div className="pt-[24px] md:pt-[18px] pb-[32px] md:pb-[40px]">
      <div className="flex flex-col gap-[18px] md:flex-row md:gap-[40px]">
        <div className="md:w-[534px] md:shrink-0">
          <h2 className="text-[22px] md:text-[24px] font-normal leading-[1.2] text-[#0C2140]">
            {section.title}
          </h2>
        </div>
        {section.text?.length ? (
          <div className="flex-1 space-y-[12px]">
            {section.text.map((paragraph) => (
              <p key={paragraph} className="text-[15px] md:text-[16px] font-normal text-[#0C2140] leading-[1.6]">
                {paragraph}
              </p>
            ))}
          </div>
        ) : null}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-[10px] md:gap-[6px] mt-[24px] md:mt-[30px]">
        {section.cards?.map((card) => (
          <div key={card} className="bg-white p-5 min-h-[118px] flex items-start">
            <p className="text-[14px] md:text-[15px] font-normal leading-[1.35] text-[#0C2140]">
              {card}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

function ServiceTableSection({ section }: { section: ServicePageSection }) {
  const headers = section.table?.headers ?? []
  const rows = section.table?.rows ?? []

  return (
    <div className="pt-[24px] md:pt-[18px] pb-[32px] md:pb-[40px]">
      <div className="flex flex-col gap-[18px] md:flex-row md:gap-[40px]">
        <div className="md:w-[534px] md:shrink-0">
          <h2 className="text-[22px] md:text-[24px] font-normal leading-[1.2] text-[#0C2140]">
            {section.title}
          </h2>
        </div>
        {section.text?.length ? (
          <div className="flex-1 space-y-[12px]">
            {section.text.map((paragraph) => (
              <p key={paragraph} className="text-[15px] md:text-[16px] font-normal text-[#0C2140] leading-[1.6]">
                {paragraph}
              </p>
            ))}
          </div>
        ) : null}
      </div>

      <div className="mt-[24px] md:mt-[30px] overflow-x-auto">
        <table className="min-w-[720px] w-full border-collapse bg-white text-left">
          <thead>
            <tr>
              {headers.map((header) => (
                <th key={header} className="border border-[#D1D7E0] bg-[#F3F5F7] px-5 py-4 text-[14px] font-normal leading-[1.35] text-[#0C2140]">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.join('|')}>
                {row.map((cell, index) => (
                  <td key={`${row[0]}-${index}`} className="border border-[#D1D7E0] px-5 py-4 align-top text-[14px] font-normal leading-[1.45] text-[#0C2140]">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params
  const service = await getServiceBySlug(slug)

  if (!service) {
    notFound()
  }

  const pageContent = service.pageContent
  const structuredContent = hasStructuredContent(service)
  const fallbackHtml = structuredContent ? '' : renderRichTextContent(service.content || service.description)
  const summaryTitle = pageContent?.summaryTitle || service.description
  const summaryText = pageContent?.summaryText
  const sections = pageContent?.sections ?? []

  return (
    <>
      <section className="bg-[#E7E9EC] relative overflow-hidden">
        <div className="hidden md:block absolute left-0 top-[-3px] pointer-events-none select-none">
          <Image
            src="/images/hero-illustration.svg"
            alt=""
            width={593}
            height={677}
          />
        </div>

        <div className="max-w-[1440px] mx-auto px-[20px] md:px-[140px] relative">
          <div className="pt-[40px] md:pt-[12px]">
            <Breadcrumb items={[
              { label: 'Услуги', href: '/uslugi' },
              { label: service.title },
            ]} />
          </div>

          <h1 className="mt-[18px] md:mt-[50px] text-[30px] md:text-[40px] font-normal leading-[1.15] tracking-[-1px] md:tracking-[-2px] text-[#0C2140] max-w-[900px]">
            {service.title}
          </h1>

          <div className="border-t border-[#0C2140] mt-[24px]" />

          {structuredContent ? (
            <>
              {(summaryTitle || summaryText?.length) ? (
                <ServiceTextSection
                  title={summaryTitle}
                  text={summaryText}
                />
              ) : null}

              {sections.map((section) => (
                <div key={section.title}>
                  <div className="border-t border-[#0C2140]" />
                  {section.table?.rows?.length ? (
                    <ServiceTableSection section={section} />
                  ) : section.cards?.length ? (
                    <ServiceCardsSection section={section} />
                  ) : (
                    <ServiceTextSection
                      title={section.title}
                      text={section.text}
                      items={section.items}
                      compact
                    />
                  )}
                </div>
              ))}
            </>
          ) : (
            <div className="flex flex-col gap-[18px] md:flex-row md:gap-[40px] pt-[24px] md:pt-[40px] pb-[28px] md:pb-[36px]">
              <div className="md:w-[534px] md:shrink-0">
                <h2 className="text-[22px] md:text-[24px] font-normal leading-[1.2] text-[#0C2140]">
                  {service.description || 'Описание услуги'}
                </h2>
              </div>
              <div
                className="flex-1 text-[15px] md:text-[16px] font-normal text-[#0C2140] leading-[1.6] [&_p:not(:last-child)]:mb-[12px] [&_ul]:space-y-[10px] [&_li]:ml-[18px] [&_li]:list-disc"
                dangerouslySetInnerHTML={{ __html: fallbackHtml }}
              />
            </div>
          )}

          <div className="flex justify-center mt-[24px] md:mt-[40px] mb-[40px] md:mb-[77px]">
            <ConsultationButton
              label="Оставить заявку"
              className="h-[49px] w-full md:w-auto px-8 py-0 text-[14px] font-normal rounded-none"
            />
          </div>
        </div>
      </section>

      <ContactFormSection />
    </>
  )
}
