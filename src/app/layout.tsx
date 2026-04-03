import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ConsultationModal from '@/components/layout/ConsultationModal'
import { ConsultationProvider } from '@/lib/consultation-context'
import { getSiteUrl } from '@/lib/site'

const cygre = localFont({
  src: [
    { path: '../../public/fonts/Cygre-Regular.ttf',      weight: '400', style: 'normal' },
    { path: '../../public/fonts/Cygre-Medium.ttf',       weight: '500', style: 'normal' },
    { path: '../../public/fonts/Cygre-SemiBold.ttf',     weight: '600', style: 'normal' },
    { path: '../../public/fonts/Cygre-Bold.ttf',         weight: '700', style: 'normal' },
  ],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: 'Экономика труда — консалтинг в сфере трудового права',
  description: 'Научная экономика труда без отвлечения от бизнеса. Консультации по трудовому праву, нормирование труда, оплата ФОТ.',
  openGraph: {
    title: 'Экономика труда',
    description: 'Научная экономика труда без отвлечения от бизнеса',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className={cygre.className}>
        <ConsultationProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <ConsultationModal />
        </ConsultationProvider>
      </body>
    </html>
  )
}
