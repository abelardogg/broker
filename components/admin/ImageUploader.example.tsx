/**
 * EXAMPLE: How to use ImageUploader in your admin forms
 *
 * This file demonstrates how to integrate the ImageUploader component
 * into your property forms or any other admin forms that need image uploads.
 */

'use client'

import { useState } from 'react'
import ImageUploader from './ImageUploader'

export default function PropertyFormExample() {
  // Form state
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    price: '',
    images: '', // Comma-separated image URLs
    features: '', // Comma-separated features
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // The images are already stored as a comma-separated string
    // You can send this directly to your API
    console.log('Form data:', formData)

    // Convert to appropriate format for API
    const propertyData = {
      ...formData,
      // Images are already comma-separated string - perfect for the API!
      images: formData.images,

      // Features can be split if needed by the API
      // Or keep as comma-separated string
      features: formData.features,
    }

    try {
      const response = await fetch('/api/admin/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(propertyData),
      })

      if (response.ok) {
        alert('Property created successfully!')
        // Reset form or redirect
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Failed to create property')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold">Create Property</h2>

      {/* Regular text inputs */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Address
        </label>
        <input
          type="text"
          value={formData.address}
          onChange={(e) =>
            setFormData({ ...formData, address: e.target.value })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          City
        </label>
        <input
          type="text"
          value={formData.city}
          onChange={(e) =>
            setFormData({ ...formData, city: e.target.value })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Price
        </label>
        <input
          type="number"
          value={formData.price}
          onChange={(e) =>
            setFormData({ ...formData, price: e.target.value })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>

      {/* Features as comma-separated text */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Features
        </label>
        <input
          type="text"
          value={formData.features}
          onChange={(e) =>
            setFormData({ ...formData, features: e.target.value })
          }
          placeholder="e.g., Pool, Garage, Fireplace"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
        <p className="mt-1 text-xs text-gray-500">
          Separate features with commas
        </p>
      </div>

      {/* Image Uploader Component */}
      <ImageUploader
        value={formData.images}
        onChange={(images) => setFormData({ ...formData, images })}
        maxImages={10}
        label="Property Images"
      />

      {/* Submit Button */}
      <div className="flex gap-4">
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Create Property
        </button>
        <button
          type="button"
          onClick={() => setFormData({
            address: '',
            city: '',
            price: '',
            images: '',
            features: '',
          })}
          className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
        >
          Clear Form
        </button>
      </div>

      {/* Debug: Show current form state */}
      <div className="mt-8 p-4 bg-gray-50 rounded-md">
        <h3 className="text-sm font-semibold mb-2">Current Form State:</h3>
        <pre className="text-xs overflow-auto">
          {JSON.stringify(formData, null, 2)}
        </pre>
      </div>
    </form>
  )
}

/**
 * USAGE NOTES:
 *
 * 1. The ImageUploader returns a comma-separated string of URLs
 *    Example: "https://bucket.com/image1.jpg, https://bucket.com/image2.jpg"
 *
 * 2. This is perfect for storing in the database as a TEXT field
 *
 * 3. To convert back to an array:
 *    const imageArray = formData.images.split(',').map(url => url.trim()).filter(Boolean)
 *
 * 4. The first image in the list is automatically the main image
 *
 * 5. Users can delete images by clicking the X button on each thumbnail
 *
 * 6. The component handles all the upload logic internally:
 *    - Gets presigned URL from API
 *    - Uploads to R2
 *    - Shows progress
 *    - Updates the parent component with the final URL
 *
 * 7. File validation is built-in:
 *    - Only JPEG, PNG, WebP allowed
 *    - Max 10MB per file
 *    - Configurable max number of images
 */
