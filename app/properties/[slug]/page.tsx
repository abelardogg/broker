import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  Bed,
  Bath,
  Square,
  MapPin,
  Calendar,
  Home,
  ArrowLeft,
  Phone,
  Mail,
  CheckCircle,
  Share2,
  Heart,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { PropertyGallery } from '@/components/ui/PropertyGallery'
import { PropertyCard } from '@/components/ui/PropertyCard'
import { siteConfig, sampleProperties } from '@/lib/config'
import { formatPhoneForTel } from '@/lib/utils'
import type { Metadata } from 'next'

interface PropertyPageProps {
  params: Promise<{ slug: string }>
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price)
}

function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num)
}

// Generate static params for all properties
export async function generateStaticParams() {
  return sampleProperties.map((property) => ({
    slug: property.slug,
  }))
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: PropertyPageProps): Promise<Metadata> {
  const { slug } = await params
  const property = sampleProperties.find((p) => p.slug === slug)

  if (!property) {
    return {
      title: 'Property Not Found',
    }
  }

  const fullAddress = `${property.address.street}, ${property.address.city}, ${property.address.state} ${property.address.zip}`

  return {
    title: `${fullAddress} | ${formatPrice(property.price)}`,
    description: `${property.bedrooms} bed, ${property.bathrooms} bath, ${formatNumber(property.sqft)} sqft home for sale in ${property.address.city}. ${property.description.slice(0, 150)}...`,
    openGraph: {
      title: `${fullAddress} | ${formatPrice(property.price)}`,
      description: property.description,
      images: property.images[0] ? [property.images[0]] : [],
    },
  }
}

const statusStyles = {
  'for-sale': 'bg-green-500 text-white',
  pending: 'bg-accent-500 text-neutral-900',
  sold: 'bg-neutral-500 text-white',
}

const statusLabels = {
  'for-sale': 'For Sale',
  pending: 'Pending',
  sold: 'Sold',
}

const propertyTypeLabels = {
  'single-family': 'Single Family Home',
  condo: 'Condominium',
  townhouse: 'Townhouse',
  'multi-family': 'Multi-Family',
  land: 'Land',
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { slug } = await params
  const property = sampleProperties.find((p) => p.slug === slug)

  if (!property) {
    notFound()
  }

  const fullAddress = `${property.address.street}, ${property.address.city}, ${property.address.state} ${property.address.zip}`

  // Get similar properties (same city, excluding current)
  const similarProperties = sampleProperties
    .filter(
      (p) =>
        p.id !== property.id &&
        p.status !== 'sold' &&
        p.address.city === property.address.city
    )
    .slice(0, 3)

  return (
    <div>
      {/* Back navigation */}
      <div className="bg-neutral-50 border-b border-neutral-200">
        <div className="container-wide py-4">
          <Link
            href="/real-estate"
            className="inline-flex items-center gap-2 text-neutral-600 hover:text-brand-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Listings
          </Link>
        </div>
      </div>

      {/* Gallery */}
      <section className="container-wide py-6">
        <PropertyGallery images={property.images} address={fullAddress} />
      </section>

      {/* Property Details */}
      <section className="container-wide pb-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div id="property-header">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold uppercase tracking-wide ${statusStyles[property.status]}`}
                >
                  {statusLabels[property.status]}
                </span>
                <span className="text-sm text-neutral-500">
                  {propertyTypeLabels[property.propertyType]}
                </span>
                {property.mlsNumber && (
                  <span className="text-sm text-neutral-400">
                    MLS# {property.mlsNumber}
                  </span>
                )}
              </div>

              <h1 id="property-price" className="text-display-sm md:text-display-md text-brand-600 font-bold mb-2">
                {formatPrice(property.price)}
              </h1>

              <div id="property-address" className="flex items-start gap-2 text-lg text-neutral-700 mb-6">
                <MapPin className="h-5 w-5 mt-1 shrink-0 text-neutral-400" />
                <span>{fullAddress}</span>
              </div>

              {/* Quick stats */}
              <div id="property-stats" className="flex flex-wrap items-center gap-6 py-4 border-y border-neutral-200">
                <div className="flex items-center gap-2">
                  <Bed className="h-5 w-5 text-brand-600" />
                  <div>
                    <span className="text-xl font-bold text-neutral-900">
                      {property.bedrooms}
                    </span>
                    <span className="text-neutral-500 ml-1">Beds</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Bath className="h-5 w-5 text-brand-600" />
                  <div>
                    <span className="text-xl font-bold text-neutral-900">
                      {property.bathrooms}
                    </span>
                    <span className="text-neutral-500 ml-1">Baths</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Square className="h-5 w-5 text-brand-600" />
                  <div>
                    <span className="text-xl font-bold text-neutral-900">
                      {formatNumber(property.sqft)}
                    </span>
                    <span className="text-neutral-500 ml-1">Sq Ft</span>
                  </div>
                </div>
                {property.yearBuilt && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-brand-600" />
                    <div>
                      <span className="text-xl font-bold text-neutral-900">
                        {property.yearBuilt}
                      </span>
                      <span className="text-neutral-500 ml-1">Built</span>
                    </div>
                  </div>
                )}
                {property.lotSize && (
                  <div className="flex items-center gap-2">
                    <Home className="h-5 w-5 text-brand-600" />
                    <div>
                      <span className="text-xl font-bold text-neutral-900">
                        {formatNumber(property.lotSize)}
                      </span>
                      <span className="text-neutral-500 ml-1">Lot Sq Ft</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div id="property-description">
              <h2 className="text-xl font-display font-bold text-neutral-900 mb-4">
                About This Property
              </h2>
              <p className="text-neutral-600 leading-relaxed">
                {property.description}
              </p>
            </div>

            {/* Features */}
            <div id="property-features">
              <h2 className="text-xl font-display font-bold text-neutral-900 mb-4">
                Features & Amenities
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {property.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-neutral-700"
                  >
                    <CheckCircle className="h-4 w-4 text-brand-600 shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Details */}
            <div id="property-details" className="bg-neutral-50 rounded-2xl p-6">
              <h2 className="text-xl font-display font-bold text-neutral-900 mb-4">
                Property Details
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <span className="text-sm text-neutral-500">Property Type</span>
                  <p className="font-medium text-neutral-900">
                    {propertyTypeLabels[property.propertyType]}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-neutral-500">Bedrooms</span>
                  <p className="font-medium text-neutral-900">
                    {property.bedrooms}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-neutral-500">Bathrooms</span>
                  <p className="font-medium text-neutral-900">
                    {property.bathrooms}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-neutral-500">Square Feet</span>
                  <p className="font-medium text-neutral-900">
                    {formatNumber(property.sqft)}
                  </p>
                </div>
                {property.lotSize && (
                  <div>
                    <span className="text-sm text-neutral-500">Lot Size</span>
                    <p className="font-medium text-neutral-900">
                      {formatNumber(property.lotSize)} sq ft
                    </p>
                  </div>
                )}
                {property.yearBuilt && (
                  <div>
                    <span className="text-sm text-neutral-500">Year Built</span>
                    <p className="font-medium text-neutral-900">
                      {property.yearBuilt}
                    </p>
                  </div>
                )}
                {property.hoaFees && (
                  <div>
                    <span className="text-sm text-neutral-500">HOA Fees</span>
                    <p className="font-medium text-neutral-900">
                      ${property.hoaFees}/month
                    </p>
                  </div>
                )}
                {property.daysOnMarket && (
                  <div>
                    <span className="text-sm text-neutral-500">Days on Market</span>
                    <p className="font-medium text-neutral-900">
                      {property.daysOnMarket}
                    </p>
                  </div>
                )}
                {property.mlsNumber && (
                  <div>
                    <span className="text-sm text-neutral-500">MLS Number</span>
                    <p className="font-medium text-neutral-900">
                      {property.mlsNumber}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar - Contact Form */}
          <div className="lg:col-span-1">
            <div
              id="property-contact"
              className="sticky top-24 bg-white rounded-2xl shadow-lg border border-neutral-200 p-6"
            >
              <h3 className="text-lg font-display font-bold text-neutral-900 mb-2">
                Interested in this property?
              </h3>
              <p className="text-sm text-neutral-600 mb-6">
                Contact us today to schedule a showing or get more information.
              </p>

              <div className="space-y-3 mb-6">
                <Button
                  href={`tel:${formatPhoneForTel(siteConfig.phone)}`}
                  variant="primary"
                  className="w-full"
                >
                  <Phone className="h-4 w-4" />
                  {siteConfig.phone}
                </Button>
                <Button
                  href={`mailto:${siteConfig.email}?subject=Inquiry: ${fullAddress}`}
                  variant="outline"
                  className="w-full"
                >
                  <Mail className="h-4 w-4" />
                  Email Us
                </Button>
              </div>

              <div className="pt-4 border-t border-neutral-200">
                <p className="text-xs text-neutral-500 mb-4">
                  {siteConfig.name}
                  <br />
                  NMLS #{siteConfig.nmls}
                  {siteConfig.dre && (
                    <>
                      <br />
                      DRE #{siteConfig.dre}
                    </>
                  )}
                </p>

                <div className="flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-2 py-2 text-sm text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors">
                    <Heart className="h-4 w-4" />
                    Save
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 py-2 text-sm text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors">
                    <Share2 className="h-4 w-4" />
                    Share
                  </button>
                </div>
              </div>

              {/* Mortgage CTA */}
              <div className="mt-6 p-4 bg-brand-50 rounded-xl">
                <p className="text-sm font-medium text-brand-900 mb-2">
                  Need financing?
                </p>
                <p className="text-xs text-brand-700 mb-3">
                  Get pre-approved for this home with our mortgage team.
                </p>
                <Button href="/apply" variant="secondary" size="sm" className="w-full">
                  Get Pre-Approved
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Similar Properties */}
      {similarProperties.length > 0 && (
        <section id="similar-properties" className="section bg-neutral-50">
          <div className="container-wide">
            <h2 className="text-display-sm text-neutral-900 mb-8">
              Similar Properties in {property.address.city}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarProperties.map((prop) => (
                <PropertyCard key={prop.id} property={prop} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
