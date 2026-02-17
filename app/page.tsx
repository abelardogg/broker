import type { Metadata } from 'next'
import { Hero } from '@/components/sections/Hero'
import { WhyChooseUs } from '@/components/sections/WhyChooseUs'
import { CTASection } from '@/components/sections/CTASection'
import { PropertyShowcase } from '@/components/sections/PropertyShowcase'

export const metadata: Metadata = {
  title: 'The Arrowhead Group | Houses for Sale in California',
  description: 'Find houses for sale in San Bernardino and the Inland Empire. Trusted real estate agent helping first time home buyers buy a house or sell your house in California. DRE #01847350',
  alternates: {
    canonical: 'https://thearrowheadgroup.com',
  },
  openGraph: {
    title: 'The Arrowhead Group | Houses for Sale in California',
    description: 'Find houses for sale in San Bernardino and the Inland Empire. Expert real estate agent and mortgage services.',
    url: 'https://thearrowheadgroup.com',
  },
}

export default function Home() {
  return (
    <>
      <Hero />
      <PropertyShowcase />
      <WhyChooseUs />
      <CTASection />
    </>
  )
}
