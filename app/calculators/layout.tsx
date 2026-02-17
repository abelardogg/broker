import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mortgage Calculator | Estimate Your Monthly Payment California',
  description: 'Use our free mortgage calculator to estimate your monthly payment on homes for sale in California. Calculate principal, interest, taxes, and insurance for any home price.',
  alternates: {
    canonical: 'https://thearrowheadgroup.com/calculators',
  },
  openGraph: {
    title: 'Free Mortgage Calculator | The Arrowhead Group California',
    description: 'Estimate your monthly mortgage payment on homes for sale in California. Free tool from The Arrowhead Group.',
    url: 'https://thearrowheadgroup.com/calculators',
  },
}

export default function CalculatorsLayout({ children }: { children: React.ReactNode }) {
  return children
}
