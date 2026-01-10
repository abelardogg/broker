import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { PropertyCard } from '@/components/ui/PropertyCard'
import { Button } from '@/components/ui/Button'
import type { Property } from '@/types'

interface FeaturedListingsProps {
  properties: Property[]
  title?: string
  subtitle?: string
  showViewAll?: boolean
  limit?: number
}

export function FeaturedListings({
  properties,
  title = 'Featured Listings',
  subtitle = 'Explore our latest properties in the Inland Empire',
  showViewAll = true,
  limit = 6,
}: FeaturedListingsProps) {
  // Filter to show only for-sale and pending, prioritize for-sale
  const displayProperties = properties
    .filter((p) => p.status !== 'sold')
    .slice(0, limit)

  if (displayProperties.length === 0) {
    return null
  }

  return (
    <section id="featured-listings" className="section bg-neutral-50">
      <div className="container-wide">
        {/* Header */}
        <div id="listings-header" className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <span className="text-brand-600 font-semibold text-sm uppercase tracking-wider">
              Properties
            </span>
            <h2 id="listings-headline" className="text-display-sm text-neutral-900 mt-2">
              {title}
            </h2>
            <p id="listings-subheadline" className="text-lg text-neutral-600 mt-2">
              {subtitle}
            </p>
          </div>
          {showViewAll && (
            <Button href="/properties" variant="outline" className="self-start md:self-auto">
              View All Listings
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Listings grid */}
        <div id="listings-grid" className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {/* Mobile CTA */}
        {showViewAll && (
          <div className="mt-8 text-center md:hidden">
            <Button href="/properties" variant="primary">
              View All Listings
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
