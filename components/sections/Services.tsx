import Link from 'next/link'
import { Home, Key, Calculator, FileText, ArrowRight } from 'lucide-react'

const services = [
  {
    icon: Key,
    title: 'Home Loans',
    description:
      'FHA, VA, Conventional, and Jumbo loans with competitive rates. We find the best mortgage for your situation.',
    features: ['Purchase & Refinance', 'Down payments as low as 3%', 'Fast pre-approval'],
    href: '/mortgage',
    color: 'brand',
  },
  {
    icon: Home,
    title: 'Real Estate',
    description:
      'Find your dream home in San Bernardino and the Inland Empire. Expert guidance from search to closing.',
    features: ['Home buying & selling', 'Market expertise', 'Negotiation support'],
    href: '/real-estate',
    color: 'accent',
  },
]

const loanTypes = [
  { name: 'FHA Loans', desc: 'Low down payment, flexible credit' },
  { name: 'VA Loans', desc: 'Zero down for veterans' },
  { name: 'Conventional', desc: 'Traditional financing' },
  { name: 'Jumbo Loans', desc: 'High-value properties' },
]

export function Services() {
  return (
    <section id="services" className="section bg-white">
      <div className="container-wide">
        {/* Section header */}
        <div id="services-header" className="text-center max-w-2xl mx-auto mb-16">
          <span id="services-label" className="text-brand-600 font-semibold text-sm uppercase tracking-wider">
            Our Services
          </span>
          <h2 id="services-headline" className="text-display-sm md:text-display-md text-neutral-900 mt-3 mb-4">
            Real Estate & Mortgage Under One Roof
          </h2>
          <p id="services-subheadline" className="text-lg text-neutral-600">
            Simplify your home buying journey. Get your loan and find your home
            with a single trusted team in San Bernardino.
          </p>
        </div>

        {/* Services grid */}
        <div id="services-grid" className="grid md:grid-cols-2 gap-8 mb-16">
          {services.map((service) => (
            <Link
              key={service.title}
              id={`service-card-${service.title.toLowerCase().replace(' ', '-')}`}
              href={service.href}
              className="group relative p-8 rounded-2xl border-2 border-neutral-200 hover:border-brand-300 transition-all duration-300 bg-gradient-to-br from-neutral-50 to-white hover:from-brand-50 hover:to-white hover:shadow-xl hover:-translate-y-1"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-brand-100 text-brand-600 flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
                <service.icon className="h-7 w-7" />
              </div>

              {/* Content */}
              <h3 className="text-2xl font-display font-bold text-neutral-900 mb-3">
                {service.title}
              </h3>
              <p className="text-neutral-600 mb-6">{service.description}</p>

              {/* Features */}
              <ul className="space-y-2 mb-6">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-neutral-600">
                    <svg className="h-5 w-5 text-brand-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Link */}
              <div className="flex items-center gap-2 text-brand-600 font-semibold">
                Learn more
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        {/* Loan types quick reference */}
        <div id="loan-types" className="bg-neutral-50 rounded-2xl p-8">
          <h3 id="loan-types-headline" className="text-xl font-display font-bold text-neutral-900 mb-6 text-center">
            Loan Programs We Offer
          </h3>
          <div id="loan-types-grid" className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {loanTypes.map((loan) => (
              <div key={loan.name} className="text-center p-4 bg-white rounded-xl">
                <div className="font-semibold text-neutral-900">{loan.name}</div>
                <div className="text-sm text-neutral-500">{loan.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
