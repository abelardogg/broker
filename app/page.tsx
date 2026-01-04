import { Hero } from '@/components/sections/Hero'
import { LoanPrograms } from '@/components/sections/LoanPrograms'
import { WhyChooseUs } from '@/components/sections/WhyChooseUs'
import { CTASection } from '@/components/sections/CTASection'

export default function Home() {
  return (
    <>
      <Hero />
      <LoanPrograms />
      <WhyChooseUs />
      <CTASection />
    </>
  )
}
