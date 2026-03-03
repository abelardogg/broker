'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import type { Property } from '@/lib/db'
import ImageUploader from './ImageUploader'

interface PropertyFormProps {
  property?: Property
  mode: 'create' | 'edit'
}

export function PropertyForm({ property, mode }: PropertyFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  // Helper function to convert array/JSON to comma-separated string
  const arrayToString = (data: any) => {
    if (!data) return ''
    if (typeof data === 'string') {
      try {
        const parsed = JSON.parse(data)
        return Array.isArray(parsed) ? parsed.join(', ') : ''
      } catch {
        return data
      }
    }
    if (Array.isArray(data)) {
      return data.join(', ')
    }
    return ''
  }

  const [formData, setFormData] = useState({
    slug: property?.slug || '',
    address: property?.address || '',
    city: property?.city || '',
    state: property?.state || 'CA',
    zipCode: property?.zipCode || '',
    price: property?.price || '',
    beds: property?.beds || '',
    baths: property?.baths || '',
    sqft: property?.sqft || '',
    lotSize: property?.lotSize || '',
    yearBuilt: property?.yearBuilt || '',
    propertyType: property?.propertyType || 'single-family',
    status: property?.status || 'active',
    description: property?.description || '',
    mlsNumber: property?.mlsNumber || '',
    virtualTourUrl: property?.virtualTourUrl || '',
    mainImage: property?.mainImage || '',
    images: arrayToString(property?.images),
    features: arrayToString(property?.features),
  })

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      // Convert comma-separated strings to arrays
      const images = formData.images
        .split(',')
        .map((url) => url.trim())
        .filter((url) => url.length > 0)

      const features = formData.features
        .split(',')
        .map((feature) => feature.trim())
        .filter((feature) => feature.length > 0)

      // Set mainImage to first image if not set
      const mainImage = formData.mainImage || images[0] || ''

      const payload = {
        ...formData,
        images,
        features,
        mainImage,
        price: parseFloat(formData.price as any),
        beds: parseInt(formData.beds as any),
        baths: parseFloat(formData.baths as any),
        sqft: parseInt(formData.sqft as any),
        yearBuilt: formData.yearBuilt ? parseInt(formData.yearBuilt as any) : null,
      }

      const url =
        mode === 'create' ? '/api/mgmt-c141f580/properties' : `/api/mgmt-c141f580/properties/${property?.id}`

      const response = await fetch(url, {
        method: mode === 'create' ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (response.ok) {
        router.push('/mgmt-c141f580/properties')
        router.refresh()
      } else {
        setError(data.error || 'Failed to save property')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  function updateField(field: string, value: any) {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Basic Info */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Slug (URL) *
            </label>
            <input
              type="text"
              required
              value={formData.slug}
              onChange={(e) => updateField('slug', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="123-main-street"
            />
            <p className="text-xs text-gray-500 mt-1">
              URL-friendly name (no spaces, use hyphens)
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">MLS Number</label>
            <input
              type="text"
              value={formData.mlsNumber}
              onChange={(e) => updateField('mlsNumber', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
            <input
              type="text"
              required
              value={formData.address}
              onChange={(e) => updateField('address', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="123 Main Street"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
            <input
              type="text"
              required
              value={formData.city}
              onChange={(e) => updateField('city', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
            <input
              type="text"
              required
              value={formData.state}
              onChange={(e) => updateField('state', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              maxLength={2}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code *</label>
            <input
              type="text"
              required
              value={formData.zipCode}
              onChange={(e) => updateField('zipCode', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status *</label>
            <select
              required
              value={formData.status}
              onChange={(e) => updateField('status', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="active">Active (For Sale)</option>
              <option value="pending">Pending</option>
              <option value="sold">Sold</option>
              <option value="withdrawn">Withdrawn</option>
            </select>
          </div>
        </div>
      </div>

      {/* Property Details */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price *</label>
            <input
              type="number"
              required
              value={formData.price}
              onChange={(e) => updateField('price', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              step="0.01"
              placeholder="450000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bedrooms *</label>
            <input
              type="number"
              required
              value={formData.beds}
              onChange={(e) => updateField('beds', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bathrooms *</label>
            <input
              type="number"
              required
              value={formData.baths}
              onChange={(e) => updateField('baths', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              step="0.5"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Square Feet *
            </label>
            <input
              type="number"
              required
              value={formData.sqft}
              onChange={(e) => updateField('sqft', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Lot Size</label>
            <input
              type="text"
              value={formData.lotSize}
              onChange={(e) => updateField('lotSize', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., 5000 sqft"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Year Built</label>
            <input
              type="number"
              value={formData.yearBuilt}
              onChange={(e) => updateField('yearBuilt', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="lg:col-span-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Property Type *
            </label>
            <select
              required
              value={formData.propertyType}
              onChange={(e) => updateField('propertyType', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="single-family">Single Family</option>
              <option value="condo">Condo</option>
              <option value="townhouse">Townhouse</option>
              <option value="multi-family">Multi-Family</option>
              <option value="land">Land</option>
            </select>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Description</h3>
        <textarea
          value={formData.description}
          onChange={(e) => updateField('description', e.target.value)}
          rows={6}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter property description..."
        />
      </div>

      {/* Features */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Features</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Property Features
            </label>
            <textarea
              value={formData.features}
              onChange={(e) => updateField('features', e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter features separated by commas (e.g., Granite Counters, Hardwood Floors, Pool, Central AC)"
            />
            <p className="text-xs text-gray-500 mt-1">
              Separate each feature with a comma
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Virtual Tour URL
            </label>
            <input
              type="url"
              value={formData.virtualTourUrl}
              onChange={(e) => updateField('virtualTourUrl', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://matterport.com/..."
            />
          </div>
        </div>
      </div>

      {/* Images */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Images</h3>
        <ImageUploader
          value={formData.images}
          onChange={(urls) => updateField('images', urls)}
          maxImages={20}
          label="Upload Images"
        />
        <p className="text-xs text-gray-500 mt-2">
          Drag & drop images or click to select. Maximum 20 images, 10MB each.
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end space-x-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Saving...' : mode === 'create' ? 'Create Property' : 'Update Property'}
        </button>
      </div>
    </form>
  )
}
