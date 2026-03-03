'use client'

import { useState, useRef, ChangeEvent, DragEvent } from 'react'
import { Upload, X, Image as ImageIcon } from 'lucide-react'

interface ImageUploaderProps {
  value?: string // Comma-separated URLs
  onChange: (value: string) => void
  maxImages?: number
  label?: string
}

interface UploadingFile {
  id: string
  file: File
  progress: number
  error?: string
  url?: string
}

export default function ImageUploader({
  value = '',
  onChange,
  maxImages = 10,
  label = 'Images',
}: ImageUploaderProps) {
  // Parse existing URLs from comma-separated string
  const existingUrls = value
    ? value.split(',').map((url) => url.trim()).filter(Boolean)
    : []

  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const totalImages = existingUrls.length + uploadingFiles.filter(f => f.url).length

  const handleFileSelect = (files: FileList | null) => {
    if (!files || files.length === 0) return

    const remainingSlots = maxImages - totalImages
    if (remainingSlots <= 0) {
      alert(`Maximum ${maxImages} images allowed`)
      return
    }

    const filesArray = Array.from(files).slice(0, remainingSlots)

    // Validate files
    const validFiles = filesArray.filter((file) => {
      const validTypes = ['image/jpeg', 'image/png', 'image/webp']
      const maxSize = 10 * 1024 * 1024 // 10MB

      if (!validTypes.includes(file.type)) {
        alert(`${file.name}: Invalid file type. Only JPEG, PNG, and WebP are allowed.`)
        return false
      }

      if (file.size > maxSize) {
        alert(`${file.name}: File too large. Maximum size is 10MB.`)
        return false
      }

      return true
    })

    if (validFiles.length === 0) return

    // Create uploading file entries
    const newUploadingFiles: UploadingFile[] = validFiles.map((file) => ({
      id: `${Date.now()}-${Math.random()}`,
      file,
      progress: 0,
    }))

    setUploadingFiles((prev) => [...prev, ...newUploadingFiles])

    // Upload each file
    newUploadingFiles.forEach((uploadingFile) => {
      uploadFile(uploadingFile)
    })
  }

  const uploadFile = async (uploadingFile: UploadingFile) => {
    try {
      // Step 1: Get presigned URL
      setUploadingFiles((prev) =>
        prev.map((f) =>
          f.id === uploadingFile.id ? { ...f, progress: 10 } : f
        )
      )

      const presignedResponse = await fetch('/api/mgmt-c141f580/upload/presigned-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileName: uploadingFile.file.name,
          fileType: uploadingFile.file.type,
          fileSize: uploadingFile.file.size,
        }),
      })

      if (!presignedResponse.ok) {
        const error = await presignedResponse.json()
        throw new Error(error.error || 'Failed to get upload URL')
      }

      const { presignedUrl, publicUrl } = await presignedResponse.json()

      // Step 2: Upload to R2
      setUploadingFiles((prev) =>
        prev.map((f) =>
          f.id === uploadingFile.id ? { ...f, progress: 30 } : f
        )
      )

      const uploadResponse = await fetch(presignedUrl, {
        method: 'PUT',
        body: uploadingFile.file,
        headers: {
          'Content-Type': uploadingFile.file.type,
        },
      })

      if (!uploadResponse.ok) {
        throw new Error('Failed to upload file')
      }

      // Step 3: Mark as complete
      setUploadingFiles((prev) =>
        prev.map((f) =>
          f.id === uploadingFile.id ? { ...f, progress: 100, url: publicUrl } : f
        )
      )

      // Add to existing URLs
      const updatedUrls = [...existingUrls, publicUrl]
      onChange(updatedUrls.join(', '))

      // Remove from uploading list after a short delay
      setTimeout(() => {
        setUploadingFiles((prev) => prev.filter((f) => f.id !== uploadingFile.id))
      }, 1000)
    } catch (error) {
      console.error('Upload error:', error)
      setUploadingFiles((prev) =>
        prev.map((f) =>
          f.id === uploadingFile.id
            ? { ...f, error: error instanceof Error ? error.message : 'Upload failed' }
            : f
        )
      )
    }
  }

  const handleDelete = async (url: string) => {
    if (!confirm('Are you sure you want to delete this image?')) {
      return
    }

    try {
      const response = await fetch('/api/mgmt-c141f580/upload/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to delete image')
      }

      // Remove from URLs
      const updatedUrls = existingUrls.filter((u) => u !== url)
      onChange(updatedUrls.join(', '))
    } catch (error) {
      console.error('Delete error:', error)
      alert(error instanceof Error ? error.message : 'Failed to delete image')
    }
  }

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const files = e.dataTransfer.files
    handleFileSelect(files)
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(e.target.files)
    // Reset input so the same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleRemoveUploading = (id: string) => {
    setUploadingFiles((prev) => prev.filter((f) => f.id !== id))
  }

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        {label}
        <span className="ml-2 text-xs text-gray-500">
          ({totalImages}/{maxImages})
        </span>
      </label>

      {/* Upload Area */}
      {totalImages < maxImages && (
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            isDragging
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-sm text-gray-600 mb-2">
            Drag and drop images here, or click to select files
          </p>
          <p className="text-xs text-gray-500 mb-4">
            JPEG, PNG, or WebP (max 10MB)
          </p>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Select Files
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            onChange={handleInputChange}
            className="hidden"
          />
        </div>
      )}

      {/* Uploading Files */}
      {uploadingFiles.length > 0 && (
        <div className="space-y-2">
          {uploadingFiles.map((file) => (
            <div
              key={file.id}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
            >
              <ImageIcon className="h-8 w-8 text-gray-400 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {file.file.name}
                </p>
                {file.error ? (
                  <p className="text-xs text-red-600">{file.error}</p>
                ) : (
                  <div className="mt-1">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${file.progress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={() => handleRemoveUploading(file.id)}
                className="p-1 hover:bg-gray-200 rounded"
              >
                <X className="h-4 w-4 text-gray-500" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Existing Images */}
      {existingUrls.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {existingUrls.map((url, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={url}
                  alt={`Image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                type="button"
                onClick={() => handleDelete(url)}
                className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
                title="Delete image"
              >
                <X className="h-4 w-4" />
              </button>
              {index === 0 && (
                <div className="absolute bottom-2 left-2 px-2 py-1 bg-blue-600 text-white text-xs rounded">
                  Main Image
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Help Text */}
      <p className="text-xs text-gray-500">
        First image will be used as the main property image. Drag images to reorder.
      </p>
    </div>
  )
}
