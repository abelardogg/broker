import { Button } from '@/components/ui/Button'
import { ArrowRight, Phone } from 'lucide-react'
import { siteConfig } from '@/lib/config'
import { formatPhoneForTel } from '@/lib/utils'

export function CTASection() {
  return (
    <section className="section bg-brand-600 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />
      </div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500 rounded-full blur-3xl opacity-50 translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-500 rounded-full blur-3xl opacity-30 -translate-x-1/2 translate-y-1/2" />

      <div className="container-wide relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-display-sm md:text-display-md text-white mb-6">
            Ready to start your home journey?
          </h2>
          <p className="text-xl text-white/80 mb-10">
            Get pre-approved in minutes. Our team is here to guide you every
            step of the way, from application to closing.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              href="/apply"
              variant="secondary"
              size="lg"
              className="bg-white text-brand-600 hover:bg-neutral-100"
            >
              Start Your Application
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button
              href={`tel:${formatPhoneForTel(siteConfig.phone)}`}
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10"
            >
              <Phone className="h-5 w-5" />
              Call Us Today
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
