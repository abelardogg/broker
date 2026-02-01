import { Shield, Clock, FileText, Phone } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { MortgageApplicationForm } from '@/components/ui/MortgageApplicationForm'
import { siteConfig } from '@/lib/config'
import { formatPhoneForTel } from '@/lib/utils'

export const metadata = {
  title: 'Apply Now',
  description: 'Start your mortgage application online. Quick, secure, and easy.',
}

export default function ApplyPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-900 to-brand-800 text-white py-20">
        <div className="container-wide">
          <div className="max-w-3xl">
            <h1 className="text-display-sm md:text-display-md mb-6">Start Your Application</h1>
            <p className="text-xl text-white/80">
              Ready to take the next step? Choose how you'd like to begin your mortgage journey.
            </p>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="section">
        <div className="container-wide">
          <MortgageApplicationForm />
        </div>
      </section>

      {/* What to have ready */}
      <section className="section bg-neutral-50">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-display-sm text-neutral-900 mb-8 text-center">
              What you'll need to apply
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                {
                  title: 'Personal Information',
                  items: ['Social Security number', 'Date of birth', 'Current address', 'Contact information'],
                },
                {
                  title: 'Employment & Income',
                  items: ['Employer information', 'Recent pay stubs', 'W-2s (last 2 years)', 'Tax returns if self-employed'],
                },
                {
                  title: 'Assets',
                  items: ['Bank statements (last 2 months)', 'Investment accounts', 'Retirement accounts', 'Other assets'],
                },
                {
                  title: 'Property Info',
                  items: ['Property address', 'Purchase price (if buying)', 'Current mortgage info (if refinancing)', 'Property type'],
                },
              ].map((section, i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="font-semibold text-neutral-900 mb-4">{section.title}</h3>
                  <ul className="space-y-2">
                    {section.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-neutral-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-600" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="text-sm text-neutral-500 text-center mt-8">
              Don't have everything ready? No problem! You can save your application and come back to it later.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
