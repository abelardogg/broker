import { Button } from '@/components/ui/Button'
import { siteConfig, loanPrograms } from '@/lib/config'
import { Phone, ArrowRight, CheckCircle, Home, Shield, Star, Building2 } from 'lucide-react'
import { formatPhoneForTel } from '@/lib/utils'

export const metadata = {
  title: 'Home Loans San Bernardino | FHA, VA, Conventional Mortgage Broker',
  description: 'Get pre-approved for a home loan in San Bernardino & Inland Empire. FHA, VA, Conventional, and Jumbo loans with competitive rates. Local mortgage broker.',
}

const icons: Record<string, React.ReactNode> = {
  conventional: <Home className="h-6 w-6" />,
  fha: <Shield className="h-6 w-6" />,
  va: <Star className="h-6 w-6" />,
  jumbo: <Building2 className="h-6 w-6" />,
}

export default function MortgagePage() {
  return (
    <div>
      {/* Hero */}
      <section id="mortgage-hero" className="bg-gradient-to-br from-brand-900 to-brand-800 text-white py-20">
        <div className="container-wide">
          <div className="max-w-3xl">
            <h1 id="mortgage-headline" className="text-display-sm md:text-display-md mb-6">
              San Bernardino Mortgage Broker
            </h1>
            <p id="mortgage-subheadline" className="text-xl text-white/80 mb-8">
              FHA, VA, Conventional, and Jumbo home loans for the Inland Empire.
              Competitive rates, fast pre-approval, and personal service from a
              local team you can trust.
            </p>
            <div id="mortgage-hero-cta" className="flex flex-wrap gap-4">
              <Button id="mortgage-cta-apply" href="/apply" variant="secondary" size="lg">
                Get Pre-Approved
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button
                id="mortgage-cta-phone"
                href={`tel:${formatPhoneForTel(siteConfig.phone)}`}
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10"
              >
                <Phone className="h-5 w-5" />
                {siteConfig.phone}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Loan Programs */}
      <section id="loan-programs" className="section">
        <div className="container-wide">
          <div id="loan-programs-header" className="text-center max-w-2xl mx-auto mb-12">
            <h2 id="loan-programs-headline" className="text-display-sm text-neutral-900 mb-4">
              Loan Programs
            </h2>
            <p id="loan-programs-subheadline" className="text-lg text-neutral-600">
              We offer a variety of loan options to fit your needs. Not sure
              which is right for you? We&apos;ll help you find the best fit.
            </p>
          </div>

          <div id="loan-programs-grid" className="grid md:grid-cols-2 gap-6">
            {loanPrograms.map((program) => (
              <div
                key={program.id}
                id={`loan-card-${program.id}`}
                className="p-6 rounded-2xl border border-neutral-200 hover:border-brand-300 hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-100 text-brand-600 flex items-center justify-center mb-4">
                  {icons[program.id]}
                </div>
                <h3 className="text-xl font-display font-bold text-neutral-900 mb-2">
                  {program.name}
                </h3>
                <p className="text-neutral-600 mb-4">{program.description}</p>
                <ul className="space-y-2">
                  {program.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-neutral-600">
                      <CheckCircle className="h-4 w-4 text-brand-500 shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="mortgage-process" className="section bg-neutral-50">
        <div className="container-wide">
          <div id="process-header" className="text-center max-w-2xl mx-auto mb-12">
            <h2 id="process-headline" className="text-display-sm text-neutral-900 mb-4">
              Simple 4-Step Process
            </h2>
            <p id="process-subheadline" className="text-lg text-neutral-600">
              Getting a mortgage doesn&apos;t have to be complicated. Here&apos;s
              how we make it easy.
            </p>
          </div>

          <div id="process-steps" className="grid md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Apply Online', desc: 'Fill out our simple application in minutes' },
              { step: '2', title: 'Get Pre-Approved', desc: 'Know your budget before you shop' },
              { step: '3', title: 'Find Your Home', desc: 'Shop with confidence with our real estate team' },
              { step: '4', title: 'Close & Move In', desc: 'We handle the details, you get the keys' },
            ].map((item) => (
              <div key={item.step} id={`process-step-${item.step}`} className="text-center">
                <div className="w-12 h-12 rounded-full bg-brand-600 text-white flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {item.step}
                </div>
                <h3 className="font-display font-bold text-neutral-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-neutral-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Purchase vs Refinance */}
      <section id="purchase-refinance" className="section">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 gap-8">
            <div id="purchase-card" className="p-8 bg-brand-50 rounded-2xl">
              <h3 id="purchase-headline" className="text-2xl font-display font-bold text-neutral-900 mb-4">
                Buying a Home?
              </h3>
              <p id="purchase-description" className="text-neutral-600 mb-6">
                Get pre-approved so you know your budget. We&apos;ll help you
                understand your options and find the right loan for your first
                home or your next one.
              </p>
              <ul id="purchase-features" className="space-y-3 mb-6">
                <li className="flex items-center gap-2 text-neutral-700">
                  <CheckCircle className="h-5 w-5 text-brand-600" />
                  First-time buyer programs
                </li>
                <li className="flex items-center gap-2 text-neutral-700">
                  <CheckCircle className="h-5 w-5 text-brand-600" />
                  Down payment assistance
                </li>
                <li className="flex items-center gap-2 text-neutral-700">
                  <CheckCircle className="h-5 w-5 text-brand-600" />
                  Fast pre-approval letters
                </li>
              </ul>
              <Button id="purchase-cta" href="/apply">Get Pre-Approved</Button>
            </div>

            <div id="refinance-card" className="p-8 bg-accent-50 rounded-2xl">
              <h3 id="refinance-headline" className="text-2xl font-display font-bold text-neutral-900 mb-4">
                Refinancing?
              </h3>
              <p id="refinance-description" className="text-neutral-600 mb-6">
                Lower your rate, reduce your term, or cash out equity. We&apos;ll
                analyze your current loan and show you if refinancing makes sense.
              </p>
              <ul id="refinance-features" className="space-y-3 mb-6">
                <li className="flex items-center gap-2 text-neutral-700">
                  <CheckCircle className="h-5 w-5 text-accent-600" />
                  Rate & term refinance
                </li>
                <li className="flex items-center gap-2 text-neutral-700">
                  <CheckCircle className="h-5 w-5 text-accent-600" />
                  Cash-out refinance
                </li>
                <li className="flex items-center gap-2 text-neutral-700">
                  <CheckCircle className="h-5 w-5 text-accent-600" />
                  Streamline options for FHA/VA
                </li>
              </ul>
              <Button id="refinance-cta" href="/contact" variant="primary">Check Your Options</Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="mortgage-cta-section" className="section bg-brand-600">
        <div className="container-wide text-center">
          <h2 id="mortgage-cta-headline" className="text-display-sm text-white mb-6">
            Ready to Get Started?
          </h2>
          <p id="mortgage-cta-subheadline" className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Apply online in minutes or call us to discuss your options with a
            local mortgage expert.
          </p>
          <div id="mortgage-cta-buttons" className="flex flex-wrap justify-center gap-4">
            <Button id="mortgage-final-apply" href="/apply" size="lg" variant='secondary' className="text-brand-600 hover:bg-neutral-100">
              Apply Now
            </Button>
            <Button
              id="mortgage-final-phone"
              href={`tel:${formatPhoneForTel(siteConfig.phone)}`}
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10"
            >
              <Phone className="h-5 w-5" />
              {siteConfig.phone}
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
