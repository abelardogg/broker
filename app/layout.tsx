import type { Metadata } from 'next'
import { DM_Sans, Plus_Jakarta_Sans } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { PageView } from '@/components/analytics/PageView'
import { StructuredData } from '@/components/seo/StructuredData'

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

const BASE_URL = 'https://thearrowheadgroup.com'

// Site-wide metadata
export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'The Arrowhead Group | Real Estate Agent San Bernardino, CA',
    template: '%s | The Arrowhead Group',
  },
  description:
    'Find houses for sale in California with The Arrowhead Group. Expert real estate agent services for buyers and sellers in San Bernardino and the Inland Empire. DRE #01847350',
  keywords: [
    'houses for sale California',
    'homes for sale San Bernardino',
    'real estate agent California',
    'buy a house California',
    'sell your house California',
    'first time home buyer',
    'mortgage options California',
    'property for sale Inland Empire',
    'Fontana homes for sale',
    'Rialto real estate',
    'Ontario CA homes',
    'Rancho Cucamonga real estate',
  ],
  authors: [{ name: 'The Arrowhead Group', url: BASE_URL }],
  creator: 'The Arrowhead Group',
  publisher: 'The Arrowhead Group',
  alternates: {
    canonical: BASE_URL,
  },
  icons: {
    icon: '/img/arrowhead-logos-v2/concept-03-lineal/icono-fondo-oscuro.svg',
    apple: '/img/arrowhead-logos-v2/concept-03-lineal/icono-fondo-oscuro.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BASE_URL,
    siteName: 'The Arrowhead Group',
    title: 'The Arrowhead Group | Real Estate Agent San Bernardino, CA',
    description:
      'Find houses for sale in California with The Arrowhead Group. Expert real estate agent services for buyers and sellers in San Bernardino and the Inland Empire.',
    images: [
      {
        url: `${BASE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'The Arrowhead Group - Real Estate Agent California',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Arrowhead Group | Real Estate Agent San Bernardino, CA',
    description:
      'Find houses for sale in California. Expert real estate agent services in San Bernardino and the Inland Empire.',
    images: [`${BASE_URL}/og-image.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // google: 'your-google-verification-code', // Add after verifying GSC
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
        <StructuredData />
        <PageView />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
