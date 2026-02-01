import { Hero } from '@/components/sections/Hero'
import { WhyChooseUs } from '@/components/sections/WhyChooseUs'
import { CTASection } from '@/components/sections/CTASection'
import { PropertyShowcase } from '@/components/sections/PropertyShowcase'

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
