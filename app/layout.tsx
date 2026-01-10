import type { Metadata } from 'next'
import { DM_Sans, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

// Body font - clean and modern
const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

// Display font - distinctive headings
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

// Site-wide metadata
export const metadata: Metadata = {
  metadataBase: new URL('https://arrowheadmtg.com'),
  title: {
    default: 'Arrowhead Realty & Mortgage | Home Loans & Real Estate in San Bernardino, CA',
    template: '%s | Arrowhead Realty & Mortgage',
  },
  description:
    'Your trusted partner for real estate and home financing in San Bernardino and the Inland Empire. Buy your home and get your loan with one team. NMLS #1429245 | DRE #01847350',
  keywords: [
    'mortgage',
    'home loans',
    'real estate',
    'San Bernardino',
    'Inland Empire',
    'California',
    'refinance',
    'home purchase',
    'FHA loans',
    'VA loans',
    'mortgage broker',
    'real estate agent',
  ],
  authors: [{ name: 'Arrowhead Realty & Mortgage' }],
  icons: {
    icon: '/img/arrowhead-logos-v2/concept-03-lineal/icono-fondo-oscuro.svg',
    apple: '/img/arrowhead-logos-v2/concept-03-lineal/icono-fondo-oscuro.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://arrowheadmtg.com',
    siteName: 'Arrowhead Realty & Mortgage',
    title: 'Arrowhead Realty & Mortgage | Home Loans & Real Estate in San Bernardino, CA',
    description:
      'Your trusted partner for real estate and home financing in San Bernardino and the Inland Empire.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Arrowhead Realty & Mortgage',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arrowhead Realty & Mortgage | Home Loans & Real Estate in San Bernardino, CA',
    description:
      'Your trusted partner for real estate and home financing in San Bernardino and the Inland Empire.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${plusJakarta.variable}`}>
      <body className="font-sans">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
