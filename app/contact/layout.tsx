import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us | Real Estate Agent San Bernardino California',
  description: 'Contact The Arrowhead Group real estate agents in San Bernardino. Buy a house, sell your house, or explore mortgage options. We respond within 24 hours.',
  alternates: {
    canonical: 'https://thearrowheadgroup.com/contact',
  },
  openGraph: {
    title: 'Contact The Arrowhead Group | Real Estate Agent California',
    description: 'Reach our real estate agents in San Bernardino. Buy a house, sell your house, or get mortgage options today.',
    url: 'https://thearrowheadgroup.com/contact',
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
