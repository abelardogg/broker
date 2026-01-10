'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, X, Expand } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PropertyGalleryProps {
  images: string[]
  address: string
}

export function PropertyGallery({ images, address }: PropertyGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const openLightbox = (index: number) => {
    setCurrentIndex(index)
    setIsLightboxOpen(true)
  }

  if (images.length === 0) {
    return (
      <div className="aspect-[16/9] bg-neutral-200 rounded-2xl flex items-center justify-center">
        <span className="text-neutral-400">No images available</span>
      </div>
    )
  }

  return (
    <>
      {/* Main Gallery Grid */}
      <div id="property-gallery" className="grid grid-cols-4 grid-rows-2 gap-2 h-[400px] md:h-[500px] rounded-2xl overflow-hidden">
        {/* Main large image */}
        <button
          onClick={() => openLightbox(0)}
          className="col-span-4 md:col-span-2 row-span-2 relative group cursor-pointer"
        >
          <img
            src={images[0] || '/img/properties/placeholder-1.jpg'}
            alt={`${address} - Main`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
            <Expand className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </button>

        {/* Thumbnail images */}
        {images.slice(1, 5).map((image, index) => (
          <button
            key={index}
            onClick={() => openLightbox(index + 1)}
            className={cn(
              'relative group cursor-pointer hidden md:block',
              index === 3 && images.length > 5 && 'relative'
            )}
          >
            <img
              src={image}
              alt={`${address} - ${index + 2}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            {/* Show more overlay on last thumbnail */}
            {index === 3 && images.length > 5 && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="text-white font-semibold text-lg">
                  +{images.length - 5} more
                </span>
              </div>
            )}
          </button>
        ))}

        {/* Mobile: Show photo count button */}
        <button
          onClick={() => openLightbox(0)}
          className="md:hidden col-span-4 absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-medium shadow-lg"
        >
          View all {images.length} photos
        </button>
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
          {/* Close button */}
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-4 right-4 z-10 p-2 text-white hover:bg-white/10 rounded-full transition-colors"
            aria-label="Close gallery"
          >
            <X className="h-8 w-8" />
          </button>

          {/* Navigation arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={goToPrev}
                className="absolute left-4 z-10 p-2 text-white hover:bg-white/10 rounded-full transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-10 w-10" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-4 z-10 p-2 text-white hover:bg-white/10 rounded-full transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="h-10 w-10" />
              </button>
            </>
          )}

          {/* Main image */}
          <img
            src={images[currentIndex]}
            alt={`${address} - ${currentIndex + 1}`}
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />

          {/* Image counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
            {currentIndex + 1} / {images.length}
          </div>

          {/* Thumbnail strip */}
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2 max-w-[90vw] overflow-x-auto p-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  'w-16 h-12 rounded overflow-hidden shrink-0 ring-2 transition-all',
                  index === currentIndex
                    ? 'ring-white'
                    : 'ring-transparent hover:ring-white/50'
                )}
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
    </>
  )
}
