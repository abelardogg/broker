import { CheckCircle, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export const metadata = {
  title: 'Home Purchase',
  description: 'Ready to buy a home? We offer competitive rates and personalized guidance through every step of the home buying process.',
}

const steps = [
  {
    title: 'Get Pre-Approved',
    description: 'Know exactly how much you can afford before you start shopping. Our quick pre-approval process gives you confidence and credibility with sellers.',
  },
  {
    title: 'Find Your Home',
    description: 'Work with your real estate agent to find the perfect property. We can connect you with trusted local agents if needed.',
  },
  {
    title: 'Make an Offer',
    description: 'With your pre-approval in hand, submit a competitive offer. We\'ll provide the documentation needed to strengthen your position.',
  },
  {
    title: 'Process Your Loan',
    description: 'We handle the paperwork, appraisal, and underwriting. You\'ll have a dedicated loan officer guiding you through each step.',
  },
  {
    title: 'Close & Get Keys',
    description: 'Sign your documents and receive the keys to your new home. We make closing day smooth and stress-free.',
  },
]

const benefits = [
  'Competitive interest rates',
  'Multiple loan program options',
  'Fast pre-approval (often same day)',
  'Local expertise in Inland Empire',
  'Dedicated loan officer support',
  'Transparent fees, no surprises',
]

export default function PurchasePage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-900 to-brand-800 text-white py-20">
        <div className="container-wide">
          <div className="max-w-3xl">
            <h1 className="text-display-sm md:text-display-md mb-6">Home Purchase Loans</h1>
            <p className="text-xl text-white/80 mb-10">
              Buying a home is one of life's biggest decisions. We're here to make the 
              financing part simple, transparent, and stress-free.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button href="/apply" variant="secondary" size="lg">
                Get Pre-Approved
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button href="/calculators" variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                Calculate Payment
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section bg-brand-50">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-display-sm text-neutral-900 mb-6">
                Why finance with Arrowhead?
              </h2>
              <p className="text-lg text-neutral-600 mb-8">
                We've helped hundreds of families in San Bernardino and the Inland Empire 
                purchase their dream homes. Here's what sets us apart:
              </p>
              <ul className="space-y-4">
                {benefits.map((benefit, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle className="h-6 w-6 text-green-500 shrink-0" />
                    <span className="text-neutral-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-display font-bold text-neutral-900 mb-4">
                Available Loan Programs
              </h3>
              <div className="space-y-3">
                {[
                  { name: 'Conventional', desc: 'As low as 3% down', href: '/loan-programs/conventional' },
                  { name: 'FHA', desc: 'As low as 3.5% down', href: '/loan-programs/fha' },
                  { name: 'VA', desc: 'Zero down for veterans', href: '/loan-programs/va' },
                  { name: 'Jumbo', desc: 'For high-value homes', href: '/loan-programs/jumbo' },
                ].map((program) => (
                  <Link
                    key={program.name}
                    href={program.href}
                    className="flex items-center justify-between p-4 rounded-lg bg-neutral-50 hover:bg-brand-50 transition-colors group"
                  >
                    <div>
                      <div className="font-semibold text-neutral-900">{program.name}</div>
                      <div className="text-sm text-neutral-500">{program.desc}</div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-neutral-400 group-hover:text-brand-600 group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section">
        <div className="container-wide">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-display-sm text-neutral-900 mb-4">The Home Buying Process</h2>
            <p className="text-lg text-neutral-600">
              From pre-approval to keys in hand, here's what to expect when you finance with us.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {steps.map((step, i) => (
              <div key={i} className="flex gap-6 mb-8 last:mb-0">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-brand-600 text-white flex items-center justify-center font-bold shrink-0">
                    {i + 1}
                  </div>
                  {i < steps.length - 1 && (
                    <div className="w-0.5 h-full bg-brand-200 mt-2" />
                  )}
                </div>
                <div className="pb-8">
                  <h3 className="text-xl font-display font-bold text-neutral-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-neutral-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-brand-600">
        <div className="container-wide text-center">
          <h2 className="text-display-sm text-white mb-6">
            Ready to start your home search?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Get pre-approved today and shop with confidence.
          </p>
          <Button href="/apply" variant="secondary" size="lg" className="bg-white text-brand-600 hover:bg-neutral-100">
            Get Pre-Approved Now
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  )
}
