'use client'

import { useState } from 'react'
import { Property } from '@/types'
import { X, Bed, Bath, Ruler, Calendar, MapPin, ExternalLink, Phone, Mail } from 'lucide-react'
import { Button } from './Button'
import { siteConfig } from '@/lib/config'
import { formatPhoneForTel } from '@/lib/utils'

interface PropertyModalProps {
  property: Property
  isOpen: boolean
  onClose: () => void
}

export function PropertyModal({ property, isOpen, onClose }: PropertyModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  if (!isOpen) return null

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num)
  }

  const statusColors = {
    'for-sale': 'bg-green-500',
    'pending': 'bg-yellow-500',
    'sold': 'bg-red-500',
  }

  const statusLabels = {
    'for-sale': 'For Sale',
    'pending': 'Pending',
    'sold': 'Sold',
  }

  const nextImage = () => {
    if (property.images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % property.images.length)
    }
  }

  const prevImage = () => {
    if (property.images.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length)
    }
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto shadow-2xl">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-colors"
          >
            <X className="h-6 w-6 text-neutral-900" />
          </button>

          {/* Image Gallery */}
          {property.images.length > 0 ? (
            <div className="relative h-96 bg-neutral-900">
              <img
                src={property.images[currentImageIndex]}
                alt={`${property.address.street} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />

              {/* Image navigation */}
              {property.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-colors"
                  >
                    ←
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-colors"
                  >
                    →
                  </button>

                  {/* Image counter */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/60 text-white rounded-full text-sm">
                    {currentImageIndex + 1} / {property.images.length}
                  </div>
                </>
              )}

              {/* Status badge */}
              <div className={`absolute top-4 left-4 px-4 py-2 ${statusColors[property.status]} text-white rounded-lg font-semibold`}>
                {statusLabels[property.status]}
              </div>
            </div>
          ) : (
            <div className="h-96 bg-gradient-to-br from-neutral-200 to-neutral-300 flex items-center justify-center">
              <div className="text-center text-neutral-500">
                <MapPin className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p>No images available</p>
              </div>
            </div>
          )}

          {/* Content */}
          <div className="p-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main content - 2/3 width */}
              <div className="lg:col-span-2 space-y-6">
                {/* Price and address */}
                <div>
                  <div className="text-4xl font-display font-bold text-brand-600 mb-2">
                    {formatPrice(property.price)}
                  </div>
                  <div className="flex items-start gap-2 text-lg text-neutral-700">
                    <MapPin className="h-5 w-5 mt-1 text-neutral-500 shrink-0" />
                    <div>
                      <div className="font-semibold">{property.address.street}</div>
                      <div>{property.address.city}, {property.address.state} {property.address.zip}</div>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-y border-neutral-200">
                  {property.bedrooms > 0 && (
                    <div className="flex items-center gap-3">
                      <Bed className="h-5 w-5 text-brand-600" />
                      <div>
                        <div className="text-2xl font-bold text-neutral-900">{property.bedrooms}</div>
                        <div className="text-sm text-neutral-600">Beds</div>
                      </div>
                    </div>
                  )}
                  {property.bathrooms > 0 && (
                    <div className="flex items-center gap-3">
                      <Bath className="h-5 w-5 text-brand-600" />
                      <div>
                        <div className="text-2xl font-bold text-neutral-900">{property.bathrooms}</div>
                        <div className="text-sm text-neutral-600">Baths</div>
                      </div>
                    </div>
                  )}
                  {property.sqft > 0 && (
                    <div className="flex items-center gap-3">
                      <Ruler className="h-5 w-5 text-brand-600" />
                      <div>
                        <div className="text-2xl font-bold text-neutral-900">{formatNumber(property.sqft)}</div>
                        <div className="text-sm text-neutral-600">Sq Ft</div>
                      </div>
                    </div>
                  )}
                  {property.yearBuilt && (
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-brand-600" />
                      <div>
                        <div className="text-2xl font-bold text-neutral-900">{property.yearBuilt}</div>
                        <div className="text-sm text-neutral-600">Built</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Description */}
                {property.description && (
                  <div>
                    <h3 className="text-xl font-display font-semibold text-neutral-900 mb-3">
                      Description
                    </h3>
                    <p className="text-neutral-700 leading-relaxed whitespace-pre-line">
                      {property.description}
                    </p>
                  </div>
                )}

                {/* Features */}
                {property.features.length > 0 && (
                  <div>
                    <h3 className="text-xl font-display font-semibold text-neutral-900 mb-3">
                      Features
                    </h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {property.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2 text-neutral-700">
                          <span className="text-brand-600 mt-1">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Property Details */}
                <div>
                  <h3 className="text-xl font-display font-semibold text-neutral-900 mb-3">
                    Property Details
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {property.listingType && (
                      <div>
                        <div className="text-neutral-600">Listing Type</div>
                        <div className="font-semibold text-neutral-900">{property.listingType}</div>
                      </div>
                    )}
                    {property.mlsNumber && (
                      <div>
                        <div className="text-neutral-600">MLS Number</div>
                        <div className="font-semibold text-neutral-900">{property.mlsNumber}</div>
                      </div>
                    )}
                    <div>
                      <div className="text-neutral-600">Property Type</div>
                      <div className="font-semibold text-neutral-900 capitalize">
                        {property.propertyType.replace('-', ' ')}
                      </div>
                    </div>
                    {property.lotSize && (
                      <div>
                        <div className="text-neutral-600">Lot Size</div>
                        <div className="font-semibold text-neutral-900">{formatNumber(property.lotSize)} sq ft</div>
                      </div>
                    )}
                    {property.daysOnMarket && (
                      <div>
                        <div className="text-neutral-600">Days on Market</div>
                        <div className="font-semibold text-neutral-900">{property.daysOnMarket}</div>
                      </div>
                    )}
                    {property.hoaFees && (
                      <div>
                        <div className="text-neutral-600">HOA Fees</div>
                        <div className="font-semibold text-neutral-900">{formatPrice(property.hoaFees)}/month</div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Listing Information */}
                {property.listingInfo && Object.values(property.listingInfo).some(val => val) && (
                  <div>
                    <h3 className="text-xl font-display font-semibold text-neutral-900 mb-3">
                      Listing Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      {property.listingInfo.source && (
                        <div>
                          <div className="text-neutral-600">Source</div>
                          <div className="font-semibold text-neutral-900">{property.listingInfo.source}</div>
                        </div>
                      )}
                      {property.listingInfo.listingAgent && (
                        <div>
                          <div className="text-neutral-600">Listing Agent</div>
                          <div className="font-semibold text-neutral-900">
                            {property.listingInfo.listingAgent}
                            {property.listingInfo.listingAgentDRE && (
                              <span className="text-neutral-500 text-xs ml-1">
                                (DRE {property.listingInfo.listingAgentDRE})
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                      {property.listingInfo.coListingAgent && (
                        <div>
                          <div className="text-neutral-600">Co-Listing Agent</div>
                          <div className="font-semibold text-neutral-900">
                            {property.listingInfo.coListingAgent}
                            {property.listingInfo.coListingAgentDRE && (
                              <span className="text-neutral-500 text-xs ml-1">
                                (DRE {property.listingInfo.coListingAgentDRE})
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                      {property.listingInfo.listingOffice && (
                        <div>
                          <div className="text-neutral-600">Listing Office</div>
                          <div className="font-semibold text-neutral-900">{property.listingInfo.listingOffice}</div>
                        </div>
                      )}
                      {property.listingInfo.coListingOffice && (
                        <div>
                          <div className="text-neutral-600">Co-Listing Office</div>
                          <div className="font-semibold text-neutral-900">{property.listingInfo.coListingOffice}</div>
                        </div>
                      )}
                      {property.listingInfo.listingUpdated && (
                        <div>
                          <div className="text-neutral-600">Listing Updated</div>
                          <div className="font-semibold text-neutral-900">{property.listingInfo.listingUpdated}</div>
                        </div>
                      )}
                      {property.listingInfo.databaseUpdated && (
                        <div>
                          <div className="text-neutral-600">Database Updated</div>
                          <div className="font-semibold text-neutral-900">{property.listingInfo.databaseUpdated}</div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Virtual Tour */}
                {property.virtualTourUrl && (
                  <div>
                    <a
                      href={property.virtualTourUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors"
                    >
                      <ExternalLink className="h-5 w-5" />
                      View Virtual Tour
                    </a>
                  </div>
                )}
              </div>

              {/* Sidebar - 1/3 width */}
              <div className="space-y-6">
                {/* Contact Card */}
                <div className="bg-neutral-50 rounded-xl p-6 sticky top-6">
                  <h3 className="text-xl font-display font-semibold text-neutral-900 mb-4">
                    Contact Us
                  </h3>
                  <p className="text-neutral-600 mb-6">
                    Interested in this property? Contact us today for more information or to schedule a showing.
                  </p>

                  <div className="space-y-3 mb-6">
                    <a
                      href={`tel:${formatPhoneForTel(siteConfig.phone)}`}
                      className="flex items-center gap-3 text-neutral-700 hover:text-brand-600 transition-colors"
                    >
                      <Phone className="h-5 w-5" />
                      {siteConfig.phone}
                    </a>
                    <a
                      href={`mailto:${siteConfig.email}?subject=Inquiry about ${property.address.street}`}
                      className="flex items-center gap-3 text-neutral-700 hover:text-brand-600 transition-colors"
                    >
                      <Mail className="h-5 w-5" />
                      {siteConfig.email}
                    </a>
                  </div>

                  <Button
                    href={`/contact?property=${encodeURIComponent(property.address.street)}`}
                    variant="primary"
                    className="w-full"
                  >
                    Schedule Showing
                  </Button>
                </div>

                {/* Image thumbnails */}
                {property.images.length > 1 && (
                  <div>
                    <h4 className="text-sm font-semibold text-neutral-900 mb-3">All Photos</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {property.images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`aspect-square rounded-lg overflow-hidden ${
                            currentImageIndex === index
                              ? 'ring-2 ring-brand-600'
                              : 'opacity-70 hover:opacity-100'
                          } transition-all`}
                        >
                          <img
                            src={image}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
