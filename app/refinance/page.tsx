import { TrendingDown, DollarSign, Home, Clock, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export const metadata = {
  title: 'Refinance',
  description: 'Lower your rate, reduce your payment, or tap into your home equity. Explore refinance options with Arrowhead Mortgage.',
}

const refinanceTypes = [
  {
    icon: TrendingDown,
    title: 'Rate & Term Refinance',
    description: 'Lower your interest rate or change your loan term to save money over the life of your loan.',
    benefits: ['Lower monthly payments', 'Pay off loan faster', 'Switch from ARM to fixed rate'],
  },
  {
    icon: DollarSign,
    title: 'Cash-Out Refinance',
    description: 'Access your home equity for renovations, debt consolidation, or other major expenses.',
    benefits: ['Home improvements', 'Debt consolidation', 'Education expenses'],
  },
  {
    icon: Home,
    title: 'Streamline Refinance',
    description: 'Simplified refinancing for FHA and VA loans with less paperwork and faster closing.',
    benefits: ['Minimal documentation', 'No appraisal required', 'Faster processing'],
  },
]

const reasons = [
  { stat: '$300+', label: 'Average monthly savings' },
  { stat: '21', label: 'Days average close time' },
  { stat: '$0', label: 'Application fee' },
  { stat: '4.9★', label: 'Customer rating' },
]

export default function RefinancePage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-900 to-brand-800 text-white py-20">
        <div className="container-wide">
          <div className="max-w-3xl">
            <h1 className="text-display-sm md:text-display-md mb-6">Refinance Your Mortgage</h1>
            <p className="text-xl text-white/80 mb-10">
              Whether you want to lower your rate, reduce your payment, or access your equity, 
              we'll help you find the best refinance option for your situation.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button href="/apply" variant="secondary" size="lg">
                Start Refinance
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button href="/calculators" variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                Calculate Savings
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-neutral-200">
        <div className="container-wide py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {reasons.map((item, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-brand-600">{item.stat}</div>
                <div className="text-neutral-600 mt-1">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Refinance Types */}
      <section className="section">
        <div className="container-wide">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-display-sm text-neutral-900 mb-4">Refinance Options</h2>
            <p className="text-lg text-neutral-600">
              Choose the refinance type that best fits your financial goals.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {refinanceTypes.map((type, i) => (
              <div key={i} className="bg-white rounded-2xl border border-neutral-200 p-8 hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 rounded-xl bg-brand-100 text-brand-600 flex items-center justify-center mb-6">
                  <type.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-display font-bold text-neutral-900 mb-3">
                  {type.title}
                </h3>
                <p className="text-neutral-600 mb-6">{type.description}</p>
                <ul className="space-y-2">
                  {type.benefits.map((benefit, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-neutral-600">
                      <svg className="h-5 w-5 text-green-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* When to refinance */}
      <section className="section bg-neutral-50">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-display-sm text-neutral-900 mb-6">
                Is now the right time to refinance?
              </h2>
              <div className="space-y-6 text-neutral-600">
                <p>
                  Refinancing makes sense when you can lower your interest rate, reduce your 
                  monthly payment, or access equity you've built in your home.
                </p>
                <p>
                  <strong className="text-neutral-900">General rule:</strong> If you can reduce 
                  your rate by at least 0.5% and plan to stay in your home for 2+ years, 
                  refinancing is likely worth exploring.
                </p>
                <p>
                  Our loan officers can analyze your specific situation and help you determine 
                  if refinancing makes financial sense for you.
                </p>
              </div>
              <Button href="/contact" className="mt-8">
                Talk to a Loan Officer
              </Button>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-display font-bold text-neutral-900 mb-6">
                Consider refinancing if you:
              </h3>
              <ul className="space-y-4">
                {[
                  'Have an interest rate higher than current market rates',
                  'Want to switch from an adjustable-rate to fixed-rate mortgage',
                  'Need to access equity for home improvements or debt consolidation',
                  'Want to remove PMI from your current loan',
                  'Can afford a shorter loan term to pay off faster',
                  'Have improved credit since your original loan',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-brand-600 shrink-0 mt-0.5" />
                    <span className="text-neutral-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-brand-600">
        <div className="container-wide text-center">
          <h2 className="text-display-sm text-white mb-6">
            See how much you could save
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Get a free rate quote with no obligation. Find out if refinancing makes sense for you.
          </p>
          <Button href="/apply" variant="secondary" size="lg" className="bg-white text-brand-600 hover:bg-neutral-100">
            Get Your Free Quote
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  )
}
