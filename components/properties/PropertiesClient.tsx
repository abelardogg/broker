'use client'

import { useState } from 'react'
import { PropertyCard } from '@/components/ui/PropertyCard'
import { PropertyModal } from '@/components/ui/PropertyModal'
import { Button } from '@/components/ui/Button'
import { siteConfig } from '@/lib/config'
import { Phone } from 'lucide-react'
import { formatPhoneForTel } from '@/lib/utils'
import type { Property as DbProperty } from '@/lib/db'
import type { Property } from '@/types'

interface PropertiesClientProps {
  properties: DbProperty[]
}

export function PropertiesClient({ properties }: PropertiesClientProps) {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Transform database property to match frontend Property type
  const transformProperty = (dbProp: DbProperty): Property => {
    // Parse lotSize safely - extract numeric value from strings like "5000 sqft"
    const parseLotSize = (lotSize: string | null): number | undefined => {
      if (!lotSize) return undefined
      const numericValue = parseInt(lotSize.replace(/[^0-9]/g, ''))
      return isNaN(numericValue) ? undefined : numericValue
    }

    // Parse JSON fields safely
    const parseJsonField = (field: string | null | undefined, fallback: any[] = []): any[] => {
      if (!field) return fallback
      if (typeof field === 'string') {
        try {
          const parsed = JSON.parse(field)
          return Array.isArray(parsed) ? parsed : fallback
        } catch {
          return fallback
        }
      }
      return Array.isArray(field) ? field : fallback
    }

    // Map database status to frontend status
    const mapStatus = (dbStatus: string): Property['status'] => {
      switch (dbStatus) {
        case 'active':
          return 'for-sale'
        case 'pending':
          return 'pending'
        case 'sold':
          return 'sold'
        case 'withdrawn':
          return 'sold' // Map withdrawn to sold for display purposes
        default:
          return 'for-sale' // Default to for-sale for unknown statuses
      }
    }

    return {
      id: dbProp.id.toString(),
      slug: dbProp.slug,
      address: {
        street: dbProp.address,
        city: dbProp.city,
        state: dbProp.state,
        zip: dbProp.zipCode,
      },
      price: dbProp.price,
      bedrooms: dbProp.beds,
      bathrooms: dbProp.baths,
      sqft: dbProp.sqft,
      lotSize: parseLotSize(dbProp.lotSize),
      yearBuilt: dbProp.yearBuilt ?? undefined,
      propertyType: dbProp.propertyType as Property['propertyType'],
      status: mapStatus(dbProp.status),
      description: dbProp.description || '',
      features: parseJsonField(dbProp.features),
      images: parseJsonField(dbProp.images),
      mlsNumber: dbProp.mlsNumber || undefined,
      virtualTourUrl: dbProp.virtualTourUrl || undefined,
      createdAt: dbProp.createdAt || new Date().toISOString(),
      updatedAt: dbProp.updatedAt || new Date().toISOString(),
    }
  }

  const forSaleProperties = properties
    .filter((p) => p.status === 'active')
    .map(transformProperty)
  const pendingProperties = properties
    .filter((p) => p.status === 'pending')
    .map(transformProperty)
  const soldProperties = properties
    .filter((p) => p.status === 'sold')
    .map(transformProperty)

  const handlePropertyClick = (property: Property) => {
    setSelectedProperty(property)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedProperty(null), 300)
  }

  return (
    <>
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
                  <PropertyCard
                    key={property.id}
                    property={property}
                    onClick={() => handlePropertyClick(property)}
                  />
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
                  <PropertyCard
                    key={property.id}
                    property={property}
                    onClick={() => handlePropertyClick(property)}
                  />
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
                  <PropertyCard
                    key={property.id}
                    property={property}
                    onClick={() => handlePropertyClick(property)}
                  />
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

      {/* Property Modal */}
      {selectedProperty && (
        <PropertyModal
          property={selectedProperty}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </>
  )
}
