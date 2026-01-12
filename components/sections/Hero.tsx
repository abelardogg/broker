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
    <section id="hero" className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Background Carousel */}
      <div className="absolute inset-0">
        <Carousel images={heroImages} interval={6000} />
        {/* Overlay - negro con gradiente sutil */}
        <div id="hero-overlay" className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-black/75" />
      </div>

      <div id="hero-content" className="container-wide relative z-10 py-20">
        <div className="max-w-3xl">
          {/* Badge */}
          <div id="hero-badge" className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-8 animate-fade-in">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm text-white/90">
              Real Estate & Mortgage Services in the Inland Empire
            </span>
          </div>

          {/* Headline - SEO optimized */}
          <h1 id="hero-headline" className="text-display-md md:text-display-lg lg:text-display-xl text-white mb-6 animate-slide-up">
            San Bernardino{' '}
            <span id="hero-headline-accent" className="text-gradient bg-gradient-to-r from-brand-300 to-accent-400">
              Mortgage Broker
            </span>{' '}
            & Real Estate.
          </h1>

          {/* Subheadline - SEO optimized */}
          <p id="hero-subheadline" className="text-xl md:text-2xl text-white/80 mb-10 max-w-2xl animate-slide-up animation-delay-100">
            Buy your home and get your loan in one place. FHA, VA, Conventional
            & Jumbo loans with competitive rates for the Inland Empire.
          </p>

          {/* CTAs */}
          <div id="hero-cta-container" className="flex flex-wrap items-center gap-4 animate-slide-up animation-delay-200">
            <Button id="hero-cta-primary" href="/apply" variant="secondary" size="lg">
              Get Pre-Approved
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button
              id="hero-cta-phone"
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
          <div id="hero-trust-indicators" className="mt-16 flex flex-wrap items-center gap-6 text-white/70 animate-fade-in animation-delay-300">
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-brand-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">NMLS #{siteConfig.nmls}</span>
            </div>
            {siteConfig.dre && (
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-brand-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm">DRE #{siteConfig.dre}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-brand-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">Equal Housing Lender</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
