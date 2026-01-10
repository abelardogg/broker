import { Hero } from '@/components/sections/Hero'
import { Services } from '@/components/sections/Services'
import { WhyChooseUs } from '@/components/sections/WhyChooseUs'
import { CTASection } from '@/components/sections/CTASection'

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <WhyChooseUs />
      <CTASection />
    </>
  )
}
