import { PropertyCard } from '@/components/ui/PropertyCard'
import { Button } from '@/components/ui/Button'
import { sampleProperties, siteConfig } from '@/lib/config'
import { Phone } from 'lucide-react'
import { formatPhoneForTel } from '@/lib/utils'

export const metadata = {
  title: 'Homes for Sale in San Bernardino & Inland Empire',
  description: 'Browse all available homes for sale in San Bernardino, Fontana, Rialto, Ontario, and the Inland Empire. Find your dream home today.',
}

export default function PropertiesPage() {
  const forSaleProperties = sampleProperties.filter((p) => p.status === 'for-sale')
  const pendingProperties = sampleProperties.filter((p) => p.status === 'pending')
  const soldProperties = sampleProperties.filter((p) => p.status === 'sold')

  return (
    <div>
      {/* Hero */}
      <section id="properties-hero" className="bg-gradient-to-br from-brand-900 to-brand-800 text-white py-16">
        <div className="container-wide">
          <h1 id="properties-headline" className="text-display-sm md:text-display-md mb-4">
            Homes for Sale
          </h1>
          <p id="properties-subheadline" className="text-xl text-white/80 max-w-2xl">
            Explore our current listings in San Bernardino and the Inland Empire.
            Contact us to schedule a showing.
          </p>
        </div>
      </section>

      {/* For Sale Listings */}
      {forSaleProperties.length > 0 && (
        <section id="for-sale-listings" className="section">
          <div className="container-wide">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-display-sm text-neutral-900">
                Available Properties
                <span className="ml-2 text-lg font-normal text-neutral-500">
                  ({forSaleProperties.length})
                </span>
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {forSaleProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Pending Listings */}
      {pendingProperties.length > 0 && (
        <section id="pending-listings" className="section bg-neutral-50">
          <div className="container-wide">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-display-sm text-neutral-900">
                Pending Sales
                <span className="ml-2 text-lg font-normal text-neutral-500">
                  ({pendingProperties.length})
                </span>
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pendingProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Recently Sold */}
      {soldProperties.length > 0 && (
        <section id="sold-listings" className="section">
          <div className="container-wide">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-display-sm text-neutral-900">
                Recently Sold
                <span className="ml-2 text-lg font-normal text-neutral-500">
                  ({soldProperties.length})
                </span>
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {soldProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section id="properties-cta" className="section bg-brand-600">
        <div className="container-wide text-center">
          <h2 className="text-display-sm text-white mb-4">
            Don&apos;t See What You&apos;re Looking For?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            We have access to listings not shown here. Contact us and we&apos;ll
            help you find the perfect home.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/contact" size="lg" variant="secondary">
              Contact Us
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
    </div>
  )
}
