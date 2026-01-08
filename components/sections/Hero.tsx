import { Button } from '@/components/ui/Button'
import { Carousel } from '@/components/ui/Carousel'
import { Phone, ArrowRight } from 'lucide-react'
import { siteConfig } from '@/lib/config'
import { formatPhoneForTel } from '@/lib/utils'

export function Hero() {
  const heroImages = [
    '/img/bhills.jpg',
    '/img/city1.jpg',
    '/img/hollywood.jpg'
  ]

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden herosectiontest">
      {/* Background Carousel */}
      <div className="absolute inset-0">
        <Carousel images={heroImages} interval={6000} />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-950/80 via-brand-900/70 to-brand-800/80">
          {/* Decorative elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-72 h-72 bg-brand-400 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-400 rounded-full blur-3xl" />
          </div>
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
              backgroundSize: '64px 64px',
            }}
          />
        </div>
      </div>

      <div className="container-wide relative z-10 py-20">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-8 animate-fade-in">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm text-white/90">
              Serving San Bernardino & Inland Empire
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-display-md md:text-display-lg lg:text-display-xl text-white mb-6 animate-slide-up">
            Your Home,{' '}
            <span className="text-gradient bg-gradient-to-r from-brand-300 to-accent-400">
              Your Future
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-white/80 mb-10 max-w-2xl animate-slide-up animation-delay-100">
            Expert mortgage guidance to help you find the perfect loan for your
            dream home. Competitive rates, personalized service, local
            expertise.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 animate-slide-up animation-delay-200">
            <Button href="/apply" variant="secondary" size="lg">
              Apply Now
              <ArrowRight className="h-5 w-5" />
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

          {/* Trust indicators */}
          <div className="mt-16 flex flex-wrap items-center gap-8 text-white/60 animate-fade-in animation-delay-300">
            <div className="flex items-center gap-2">
              <svg
                className="h-5 w-5 text-brand-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm">NMLS #{siteConfig.nmls}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="h-5 w-5 text-brand-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm">Equal Housing Lender</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="h-5 w-5 text-brand-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm">Licensed in California</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
