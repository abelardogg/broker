import type { Metadata } from 'next'
import { DM_Sans, Plus_Jakarta_Sans } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { PageView } from '@/components/analytics/PageView'

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
        {/* Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-WNMTKLDNRY"
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-WNMTKLDNRY');
          `}
        </Script>
        {/* Google Tag Manager */}
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KFZSRT8G');`,
          }}
        />
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KFZSRT8G"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <PageView />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
