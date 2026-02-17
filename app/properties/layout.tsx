import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Homes for Sale in San Bernardino | Property for Sale California',
  description: 'Browse homes for sale and property for sale in San Bernardino and the Inland Empire. View active listings, pending sales, and recently sold homes in California.',
  alternates: {
    canonical: 'https://thearrowheadgroup.com/properties',
  },
  openGraph: {
    title: 'Homes for Sale in San Bernardino | The Arrowhead Group',
    description: 'Browse homes for sale and property for sale in San Bernardino and the Inland Empire, California.',
    url: 'https://thearrowheadgroup.com/properties',
  },
}

export default function PropertiesLayout({ children }: { children: React.ReactNode }) {
  return children
}
