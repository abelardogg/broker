import { Button } from '@/components/ui/Button'
import { siteConfig } from '@/lib/config'
import { Phone, ArrowRight, CheckCircle, Home, Search, FileText, Key } from 'lucide-react'
import { formatPhoneForTel } from '@/lib/utils'

export const metadata = {
  title: 'Real Estate Agent San Bernardino | Buy & Sell Homes Inland Empire',
  description: 'Find your dream home in San Bernardino & Inland Empire. Expert real estate services for buyers and sellers. Combined with mortgage services for a seamless experience.',
}

export default function RealEstatePage() {
  return (
    <div>
      {/* Hero */}
      <section id="realestate-hero" className="bg-gradient-to-br from-brand-900 to-brand-800 text-white py-20">
        <div className="container-wide">
          <div className="max-w-3xl">
            <h1 id="realestate-headline" className="text-display-sm md:text-display-md mb-6">
              San Bernardino Real Estate Services
            </h1>
            <p id="realestate-subheadline" className="text-xl text-white/80 mb-8">
              Find your perfect home in the Inland Empire. Buy or sell with local
              experts who also handle your financing - one team, one seamless
              experience.
            </p>
            <div id="realestate-hero-cta" className="flex flex-wrap gap-4">
              <Button id="realestate-cta-search" href="/contact" variant="secondary" size="lg">
                Start Your Search
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button
                id="realestate-cta-phone"
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

      {/* Services */}
      <section id="realestate-services" className="section">
        <div className="container-wide">
          <div id="realestate-services-header" className="text-center max-w-2xl mx-auto mb-12">
            <h2 id="realestate-services-headline" className="text-display-sm text-neutral-900 mb-4">
              Real Estate Services
            </h2>
            <p id="realestate-services-subheadline" className="text-lg text-neutral-600">
              Whether you&apos;re buying your first home or selling to move up,
              we guide you through every step.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div id="buying-card" className="p-8 bg-brand-50 rounded-2xl">
              <div className="w-14 h-14 rounded-xl bg-brand-100 text-brand-600 flex items-center justify-center mb-6">
                <Home className="h-7 w-7" />
              </div>
              <h3 id="buying-headline" className="text-2xl font-display font-bold text-neutral-900 mb-4">
                Buying a Home
              </h3>
              <p id="buying-description" className="text-neutral-600 mb-6">
                From search to closing, we help you find the right home at the
                right price. Plus, get pre-approved with our mortgage team for
                a smoother process.
              </p>
              <ul id="buying-features" className="space-y-3 mb-6">
                <li className="flex items-center gap-2 text-neutral-700">
                  <CheckCircle className="h-5 w-5 text-brand-600" />
                  Personalized home search
                </li>
                <li className="flex items-center gap-2 text-neutral-700">
                  <CheckCircle className="h-5 w-5 text-brand-600" />
                  Market analysis & pricing guidance
                </li>
                <li className="flex items-center gap-2 text-neutral-700">
                  <CheckCircle className="h-5 w-5 text-brand-600" />
                  Negotiation & offer strategy
                </li>
                <li className="flex items-center gap-2 text-neutral-700">
                  <CheckCircle className="h-5 w-5 text-brand-600" />
                  Coordinated financing
                </li>
              </ul>
              <Button id="buying-cta" href="/contact">Find Your Home</Button>
            </div>

            <div id="selling-card" className="p-8 bg-accent-50 rounded-2xl">
              <div className="w-14 h-14 rounded-xl bg-accent-100 text-accent-600 flex items-center justify-center mb-6">
                <Key className="h-7 w-7" />
              </div>
              <h3 id="selling-headline" className="text-2xl font-display font-bold text-neutral-900 mb-4">
                Selling Your Home
              </h3>
              <p id="selling-description" className="text-neutral-600 mb-6">
                Get top dollar for your property with expert marketing and
                pricing strategies. We know the Inland Empire market and how to
                position your home.
              </p>
              <ul id="selling-features" className="space-y-3 mb-6">
                <li className="flex items-center gap-2 text-neutral-700">
                  <CheckCircle className="h-5 w-5 text-accent-600" />
                  Competitive market analysis
                </li>
                <li className="flex items-center gap-2 text-neutral-700">
                  <CheckCircle className="h-5 w-5 text-accent-600" />
                  Professional marketing
                </li>
                <li className="flex items-center gap-2 text-neutral-700">
                  <CheckCircle className="h-5 w-5 text-accent-600" />
                  Staging recommendations
                </li>
                <li className="flex items-center gap-2 text-neutral-700">
                  <CheckCircle className="h-5 w-5 text-accent-600" />
                  Skilled negotiation
                </li>
              </ul>
              <Button id="selling-cta" href="/contact" variant="primary">Sell Your Home</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section id="realestate-why" className="section bg-neutral-50">
        <div className="container-wide">
          <div id="realestate-why-header" className="text-center max-w-2xl mx-auto mb-12">
            <h2 id="realestate-why-headline" className="text-display-sm text-neutral-900 mb-4">
              Why Choose Arrowhead
            </h2>
            <p id="realestate-why-subheadline" className="text-lg text-neutral-600">
              Get real estate and mortgage services from one trusted team.
            </p>
          </div>

          <div id="realestate-why-grid" className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Search,
                title: 'Local Market Experts',
                description: 'We know San Bernardino, Fontana, Rialto, Ontario, and every neighborhood in the Inland Empire.',
              },
              {
                icon: FileText,
                title: 'One-Stop Service',
                description: 'Find your home AND get your loan with the same team. No juggling multiple companies.',
              },
              {
                icon: Key,
                title: 'Faster Closings',
                description: 'When your agent and lender work together, deals close faster and smoother.',
              },
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm text-center">
                <div className="w-14 h-14 rounded-xl bg-brand-100 text-brand-600 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-display font-bold text-neutral-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-neutral-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Areas */}
      <section id="realestate-areas" className="section">
        <div className="container-wide text-center">
          <h2 id="realestate-areas-headline" className="text-display-sm text-neutral-900 mb-4">
            Areas We Serve
          </h2>
          <p id="realestate-areas-subheadline" className="text-lg text-neutral-600 mb-8">
            Helping families find homes throughout the Inland Empire
          </p>
          <div id="realestate-areas-list" className="flex flex-wrap justify-center gap-3 mb-12">
            {siteConfig.serviceAreas?.map((area) => (
              <span
                key={area}
                className="px-4 py-2 bg-brand-50 text-brand-700 rounded-full text-sm font-medium"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="realestate-cta-section" className="section bg-brand-600">
        <div className="container-wide text-center">
          <h2 id="realestate-cta-headline" className="text-display-sm text-white mb-6">
            Ready to Find Your Home?
          </h2>
          <p id="realestate-cta-subheadline" className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Contact us today to start your home search or get a free home
            valuation if you&apos;re thinking of selling.
          </p>
          <div id="realestate-cta-buttons" className="flex flex-wrap justify-center gap-4">
            <Button id="realestate-final-contact" href="/contact" size="lg" className="bg-white text-brand-600 hover:bg-neutral-100">
              Contact Us
            </Button>
            <Button
              id="realestate-final-phone"
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
