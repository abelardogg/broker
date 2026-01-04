import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Phone, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { loanPrograms, siteConfig } from '@/lib/config'
import { formatPhoneForTel } from '@/lib/utils'

// Contenido extendido para cada programa
const programDetails: Record<string, {
  heroDescription: string
  benefits: string[]
  requirements: string[]
  idealFor: string[]
}> = {
  conventional: {
    heroDescription: 'Conventional loans are the most common type of mortgage. They\'re not backed by the government, which often means stricter requirements but also more flexibility in terms and conditions.',
    benefits: [
      'Down payments as low as 3% for qualified buyers',
      'No upfront mortgage insurance premium',
      'PMI can be removed once you reach 20% equity',
      'Available for primary homes, second homes, and investment properties',
      'Flexible loan terms: 10, 15, 20, or 30 years',
      'Can be used for purchase or refinance',
    ],
    requirements: [
      'Minimum credit score of 620 (higher scores get better rates)',
      'Debt-to-income ratio typically below 43%',
      'Stable employment history (2+ years preferred)',
      'Down payment of 3-20% depending on loan type',
      'Private mortgage insurance required if down payment is less than 20%',
    ],
    idealFor: [
      'Buyers with good to excellent credit',
      'Those who can afford a larger down payment',
      'Buyers purchasing higher-priced homes',
      'Investment property purchases',
    ],
  },
  fha: {
    heroDescription: 'FHA loans are backed by the Federal Housing Administration and designed to help first-time buyers and those with less-than-perfect credit achieve homeownership.',
    benefits: [
      'Down payments as low as 3.5%',
      'More lenient credit score requirements',
      'Higher debt-to-income ratios allowed',
      'Gift funds can be used for entire down payment',
      'Assumable loans (can be transferred to a new buyer)',
      'Streamline refinance options available',
    ],
    requirements: [
      'Minimum credit score of 580 for 3.5% down payment',
      'Credit scores 500-579 require 10% down payment',
      'Property must be primary residence',
      'Mortgage insurance premium (MIP) required',
      'Property must meet FHA minimum standards',
    ],
    idealFor: [
      'First-time homebuyers',
      'Buyers with lower credit scores',
      'Those with limited savings for down payment',
      'Buyers recovering from financial hardship',
    ],
  },
  va: {
    heroDescription: 'VA loans are a benefit earned by those who serve. Backed by the Department of Veterans Affairs, these loans offer exceptional terms to eligible veterans, active-duty service members, and surviving spouses.',
    benefits: [
      'No down payment required in most cases',
      'No private mortgage insurance (PMI)',
      'Competitive interest rates',
      'Limited closing costs',
      'No prepayment penalty',
      'Reusable benefit - can be used multiple times',
    ],
    requirements: [
      'Must have valid Certificate of Eligibility (COE)',
      'Meet minimum service requirements',
      'Property must be primary residence',
      'Must meet VA and lender credit requirements',
      'VA funding fee required (can be financed)',
    ],
    idealFor: [
      'Active-duty military personnel',
      'Veterans with honorable discharge',
      'National Guard and Reserve members',
      'Surviving spouses of veterans',
    ],
  },
  jumbo: {
    heroDescription: 'Jumbo loans exceed the conforming loan limits set by Fannie Mae and Freddie Mac, making them ideal for luxury properties and high-cost real estate markets.',
    benefits: [
      'Finance homes above conforming loan limits',
      'Competitive rates for qualified borrowers',
      'Various term options available',
      'Can be used for primary or secondary homes',
      'Interest-only options may be available',
      'Fixed and adjustable rate options',
    ],
    requirements: [
      'Higher credit score required (typically 700+)',
      'Lower debt-to-income ratio (usually under 43%)',
      'Larger down payment (typically 10-20%)',
      'Significant cash reserves required',
      'Thorough documentation of income and assets',
    ],
    idealFor: [
      'Buyers in high-cost real estate markets',
      'Those purchasing luxury properties',
      'High-income borrowers with excellent credit',
      'Buyers who need to finance above $726,200 (2023 limit)',
    ],
  },
}

// Generar rutas estáticas para mejor performance
export function generateStaticParams() {
  return loanPrograms.map((program) => ({
    slug: program.id,
  }))
}

// Generar metadata dinámica para SEO
export function generateMetadata({ params }: { params: { slug: string } }) {
  const program = loanPrograms.find((p) => p.id === params.slug)
  
  if (!program) {
    return { title: 'Program Not Found' }
  }

  return {
    title: program.name,
    description: program.description,
  }
}

export default function LoanProgramPage({ params }: { params: { slug: string } }) {
  const program = loanPrograms.find((p) => p.id === params.slug)
  const details = programDetails[params.slug]

  // Si no existe el programa, mostrar 404
  if (!program || !details) {
    notFound()
  }

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-900 to-brand-800 text-white py-20">
        <div className="container-wide">
          <Link 
            href="/loan-programs" 
            className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            All Loan Programs
          </Link>
          
          <h1 className="text-display-sm md:text-display-md mb-6">{program.name}</h1>
          <p className="text-xl text-white/80 max-w-3xl">{details.heroDescription}</p>
          
          <div className="flex flex-wrap gap-4 mt-10">
            <Button href="/apply" variant="secondary" size="lg">
              Apply Now
            </Button>
            <Button
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

      {/* Content */}
      <section className="section">
        <div className="container-wide">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Benefits */}
              <div>
                <h2 className="text-2xl font-display font-bold text-neutral-900 mb-6">
                  Key Benefits
                </h2>
                <ul className="space-y-4">
                  {details.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-neutral-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Requirements */}
              <div>
                <h2 className="text-2xl font-display font-bold text-neutral-900 mb-6">
                  Requirements
                </h2>
                <ul className="space-y-4">
                  {details.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center shrink-0 mt-0.5 text-sm font-semibold">
                        {i + 1}
                      </div>
                      <span className="text-neutral-700">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Ideal For */}
              <div>
                <h2 className="text-2xl font-display font-bold text-neutral-900 mb-6">
                  Ideal For
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {details.idealFor.map((item, i) => (
                    <div 
                      key={i} 
                      className="p-4 rounded-lg bg-neutral-50 border border-neutral-200"
                    >
                      <span className="text-neutral-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-brand-50 rounded-2xl p-8">
                <h3 className="text-xl font-display font-bold text-neutral-900 mb-4">
                  Ready to get started?
                </h3>
                <p className="text-neutral-600 mb-6">
                  Our loan officers are ready to help you find the best {program.name.toLowerCase()} option for your situation.
                </p>
                <div className="space-y-3">
                  <Button href="/apply" className="w-full">
                    Start Application
                  </Button>
                  <Button href="/contact" variant="outline" className="w-full">
                    Contact Us
                  </Button>
                </div>
                <div className="mt-6 pt-6 border-t border-brand-200">
                  <p className="text-sm text-neutral-600 mb-2">Questions? Call us:</p>
                  <a 
                    href={`tel:${formatPhoneForTel(siteConfig.phone)}`}
                    className="text-lg font-semibold text-brand-600 hover:text-brand-700"
                  >
                    {siteConfig.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
