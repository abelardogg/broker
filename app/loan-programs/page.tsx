import Link from 'next/link'
import { Home, Shield, Star, Building2, ArrowRight } from 'lucide-react'
import { loanPrograms } from '@/lib/config'

const icons: Record<string, React.ComponentType<{ className?: string }>> = {
  conventional: Home,
  fha: Shield,
  va: Star,
  jumbo: Building2,
}

export const metadata = {
  title: 'Loan Programs',
  description: 'Explore our mortgage loan programs including Conventional, FHA, VA, and Jumbo loans.',
}

export default function LoanProgramsPage() {
  return (
    <div className="py-20">
      <div className="container-wide">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <h1 className="text-display-sm md:text-display-md text-neutral-900 mb-4">
            Loan Programs
          </h1>
          <p className="text-lg text-neutral-600">
            We offer a variety of mortgage options to fit your unique situation. 
            Explore our programs below or contact us for personalized guidance.
          </p>
        </div>

        {/* Programs grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {loanPrograms.map((program) => {
            const IconComponent = icons[program.id]
            return (
              <Link
                key={program.id}
                href={`/loan-programs/${program.id}`}
                className="group relative p-8 rounded-2xl border-2 border-neutral-200 hover:border-brand-300 transition-all duration-300 bg-gradient-to-br from-neutral-50 to-white hover:from-brand-50 hover:to-white hover:shadow-xl hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-xl bg-brand-100 text-brand-600 flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
                  <IconComponent className="h-6 w-6" />
                </div>

                <h2 className="text-xl font-display font-bold text-neutral-900 mb-3">
                  {program.name}
                </h2>
                <p className="text-neutral-600 mb-6">{program.description}</p>

                <ul className="space-y-2 mb-6">
                  {program.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-neutral-600">
                      <svg className="h-5 w-5 text-brand-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center gap-2 text-brand-600 font-semibold">
                  Learn more
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
