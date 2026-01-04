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
    default: 'Arrowhead Mortgage | Home Loans in San Bernardino, CA',
    template: '%s | Arrowhead Mortgage',
  },
  description:
    'Your trusted mortgage lender in San Bernardino and the Inland Empire. Home purchase, refinancing, and loan programs tailored to your needs. NMLS #1429245',
  keywords: [
    'mortgage',
    'home loans',
    'San Bernardino',
    'Inland Empire',
    'California',
    'refinance',
    'home purchase',
    'FHA loans',
    'VA loans',
  ],
  authors: [{ name: 'Arrowhead Mortgage' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://arrowheadmtg.com',
    siteName: 'Arrowhead Mortgage',
    title: 'Arrowhead Mortgage | Home Loans in San Bernardino, CA',
    description:
      'Your trusted mortgage lender in San Bernardino and the Inland Empire.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Arrowhead Mortgage',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arrowhead Mortgage | Home Loans in San Bernardino, CA',
    description:
      'Your trusted mortgage lender in San Bernardino and the Inland Empire.',
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
