import { Button } from '@/components/ui/Button'
import { Home, DollarSign, MapPin, TrendingUp } from 'lucide-react'

export function PropertyShowcase() {
  return (
    <section id="property-showcase" className="section bg-gradient-to-br from-neutral-50 to-white">
      <div className="container-wide">
        {/* Main content */}
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-brand-600 font-semibold text-sm uppercase tracking-wider">
            Your Dream Home Awaits
          </span>
          <h2 className="text-display-sm md:text-display-md text-neutral-900 mt-3 mb-6">
            Find Properties That Match Your Budget and Lifestyle
          </h2>
          <p className="text-xl text-neutral-600 leading-relaxed mb-8">
            Whether you're looking for luxury estates, family homes, investment properties, or land for development,
            we have an extensive portfolio of real estate opportunities throughout San Bernardino County and the Inland Empire.
            From first-time buyers to seasoned investors, we help you find the perfect property.
          </p>

          {/* Features grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Home className="h-6 w-6 text-brand-600" />
              </div>
              <h3 className="font-semibold text-neutral-900 mb-2">All Property Types</h3>
              <p className="text-sm text-neutral-600">
                Single-family homes, condos, land, and commercial properties
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <DollarSign className="h-6 w-6 text-brand-600" />
              </div>
              <h3 className="font-semibold text-neutral-900 mb-2">Every Budget</h3>
              <p className="text-sm text-neutral-600">
                Starter homes to luxury estates across all price ranges
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <MapPin className="h-6 w-6 text-brand-600" />
              </div>
              <h3 className="font-semibold text-neutral-900 mb-2">Prime Locations</h3>
              <p className="text-sm text-neutral-600">
                San Bernardino, Riverside, and throughout the Inland Empire
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <TrendingUp className="h-6 w-6 text-brand-600" />
              </div>
              <h3 className="font-semibold text-neutral-900 mb-2">Investment Ready</h3>
              <p className="text-sm text-neutral-600">
                Opportunities for investors and first-time home buyers
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button href="/properties" size="lg" variant="primary">
              Explore All Properties
            </Button>
            <Button href="/contact" size="lg" variant="outline">
              Schedule a Consultation
            </Button>
          </div>

          {/* SEO-friendly text */}
          <div className="mt-12 pt-8 border-t border-neutral-200">
            <p className="text-sm text-neutral-600 leading-relaxed">
              <strong className="text-neutral-900">Arrowhead Realty Group</strong> specializes in residential and commercial real estate
              throughout the Inland Empire. Our experienced team helps buyers, sellers, and investors navigate the San Bernardino
              and Riverside County real estate markets. Whether you're searching for affordable starter homes in Fontana,
              luxury properties in Rancho Cucamonga, investment opportunities in Ontario, or land for development in the Inland Empire,
              we provide personalized service and expert local market knowledge to help you achieve your real estate goals.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
