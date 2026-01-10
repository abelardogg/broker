import Link from 'next/link'
import { Bed, Bath, Square, MapPin } from 'lucide-react'
import type { Property } from '@/types'
import { cn } from '@/lib/utils'

interface PropertyCardProps {
  property: Property
  className?: string
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

export function PropertyCard({ property, className }: PropertyCardProps) {
  return (
    <Link
      href={`/properties/${property.slug}`}
      className={cn(
        'group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1',
        className
      )}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-200">
        <img
          src={property.images[0] || '/img/properties/placeholder-1.jpg'}
          alt={property.address.street}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Status badge */}
        <div className="absolute top-3 left-3">
          <span
            className={cn(
              'px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide',
              statusStyles[property.status]
            )}
          >
            {statusLabels[property.status]}
          </span>
        </div>
        {/* Days on market */}
        {property.daysOnMarket && property.status === 'for-sale' && (
          <div className="absolute top-3 right-3">
            <span className="px-2 py-1 bg-black/60 text-white rounded text-xs">
              {property.daysOnMarket} days
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Price */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-2xl font-display font-bold text-brand-600">
            {formatPrice(property.price)}
          </span>
          {property.mlsNumber && (
            <span className="text-xs text-neutral-400">
              MLS# {property.mlsNumber}
            </span>
          )}
        </div>

        {/* Address */}
        <div className="flex items-start gap-1 text-neutral-600 mb-4">
          <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-neutral-400" />
          <span className="text-sm">
            {property.address.street}, {property.address.city},{' '}
            {property.address.state} {property.address.zip}
          </span>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 text-neutral-600">
          <div className="flex items-center gap-1.5">
            <Bed className="h-4 w-4 text-neutral-400" />
            <span className="text-sm font-medium">{property.bedrooms}</span>
            <span className="text-xs text-neutral-400">beds</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bath className="h-4 w-4 text-neutral-400" />
            <span className="text-sm font-medium">{property.bathrooms}</span>
            <span className="text-xs text-neutral-400">baths</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Square className="h-4 w-4 text-neutral-400" />
            <span className="text-sm font-medium">
              {formatNumber(property.sqft)}
            </span>
            <span className="text-xs text-neutral-400">sqft</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
