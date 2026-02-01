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
  metadataBase: new URL('https://arrowheadrealty.com'),
  title: {
    default: 'Arrowhead Realty Group | Real Estate Agent San Bernardino, CA',
    template: '%s | Arrowhead Realty Group',
  },
  description:
    'Find your dream home in San Bernardino and the Inland Empire with Arrowhead Realty Group. Expert real estate services for buyers and sellers. DRE #01847350',
  keywords: [
    'real estate',
    'homes for sale',
    'San Bernardino',
    'Inland Empire',
    'California',
    'real estate agent',
    'buy home',
    'sell home',
    'Fontana',
    'Rialto',
    'Ontario',
    'Rancho Cucamonga',
    'Redlands',
  ],
  authors: [{ name: 'Arrowhead Realty Group' }],
  icons: {
    icon: '/img/arrowhead-logos-v2/concept-03-lineal/icono-fondo-oscuro.svg',
    apple: '/img/arrowhead-logos-v2/concept-03-lineal/icono-fondo-oscuro.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://arrowheadrealty.com',
    siteName: 'Arrowhead Realty Group',
    title: 'Arrowhead Realty Group | Real Estate Agent San Bernardino, CA',
    description:
      'Find your dream home in San Bernardino and the Inland Empire with expert real estate services.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Arrowhead Realty Group',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arrowhead Realty Group | Real Estate Agent San Bernardino, CA',
    description:
      'Find your dream home in San Bernardino and the Inland Empire with expert real estate services.',
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
