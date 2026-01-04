import { Shield, Clock, FileText, Phone } from 'lucide-react'
import { Button } from '@/components/ui/Button'
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

      {/* Options */}
      <section className="section">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Online Application */}
            <div className="bg-white rounded-2xl border-2 border-brand-200 p-8 hover:border-brand-400 hover:shadow-xl transition-all">
              <div className="w-14 h-14 rounded-xl bg-brand-100 text-brand-600 flex items-center justify-center mb-6">
                <FileText className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-display font-bold text-neutral-900 mb-4">
                Apply Online
              </h2>
              <p className="text-neutral-600 mb-6">
                Complete your application online in about 15 minutes. Our secure portal 
                makes it easy to provide the information we need.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Takes about 15 minutes',
                  'Save and continue later',
                  'Secure & encrypted',
                  'Upload documents easily',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-neutral-600">
                    <svg className="h-5 w-5 text-green-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              {/* 
                NOTA: Reemplaza este href con el link real de la aplicación externa
                Por ejemplo: https://www.blink.mortgage/app/signup/p/arrowheadmtg
              */}
              <Button 
                href="https://www.blink.mortgage/app/signup/p/carlosangeljaramillo/carlosjaramillo" 
                className="w-full"
                // @ts-ignore - external link
                target="_blank"
                rel="noopener noreferrer"
              >
                Start Online Application
              </Button>
            </div>

            {/* Phone Application */}
            <div className="bg-white rounded-2xl border-2 border-neutral-200 p-8 hover:border-brand-400 hover:shadow-xl transition-all">
              <div className="w-14 h-14 rounded-xl bg-brand-100 text-brand-600 flex items-center justify-center mb-6">
                <Phone className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-display font-bold text-neutral-900 mb-4">
                Apply by Phone
              </h2>
              <p className="text-neutral-600 mb-6">
                Prefer to talk to someone? Our loan officers are ready to guide you through 
                the application process over the phone.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Personal guidance',
                  'Ask questions in real-time',
                  'Get instant feedback',
                  'Available M-F 9am-6pm',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-neutral-600">
                    <svg className="h-5 w-5 text-green-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <Button 
                href={`tel:${formatPhoneForTel(siteConfig.phone)}`}
                variant="outline" 
                className="w-full"
              >
                <Phone className="h-5 w-5" />
                {siteConfig.phone}
              </Button>
            </div>
          </div>

          {/* Security note */}
          <div className="max-w-2xl mx-auto mt-12 text-center">
            <div className="inline-flex items-center gap-2 text-neutral-600 bg-neutral-100 rounded-full px-4 py-2">
              <Shield className="h-5 w-5 text-green-600" />
              <span className="text-sm">Your information is protected with bank-level encryption</span>
            </div>
          </div>
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
