/**
 * TypeScript types for R2 integration
 */

export interface PresignedUrlRequest {
  fileName: string
  fileType: string
  fileSize: number
}

export interface PresignedUrlResponse {
  presignedUrl: string
  publicUrl: string
  key: string
}

export interface DeleteImageRequest {
  url: string
}

export interface DeleteImageResponse {
  success: boolean
  message: string
}

export interface R2ErrorResponse {
  error: string
}

export interface UploadingFile {
  id: string
  file: File
  progress: number
  error?: string
  url?: string
}

export interface ImageUploaderProps {
  value?: string
  onChange: (value: string) => void
  maxImages?: number
  label?: string
}

export const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
] as const

export type AllowedMimeType = typeof ALLOWED_MIME_TYPES[number]

export const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
export const MIN_FILE_SIZE = 1 // 1 byte

export interface FileValidationResult {
  valid: boolean
  error?: string
}

export function validateFile(file: File): FileValidationResult {
  // Check file type
  if (!ALLOWED_MIME_TYPES.includes(file.type as AllowedMimeType)) {
    return {
      valid: false,
      error: `Invalid file type "${file.type}". Only JPEG, PNG, and WebP images are allowed.`,
    }
  }

  // Check file size
  if (file.size < MIN_FILE_SIZE || file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `File size ${(file.size / 1024 / 1024).toFixed(2)}MB is outside allowed range (${MIN_FILE_SIZE} bytes - ${MAX_FILE_SIZE / 1024 / 1024}MB).`,
    }
  }

  return { valid: true }
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

export function parseImageUrls(urlString: string): string[] {
  if (!urlString || urlString.trim() === '') return []
  return urlString
    .split(',')
    .map((url) => url.trim())
    .filter(Boolean)
}

export function joinImageUrls(urls: string[]): string {
  return urls.filter(Boolean).join(', ')
}
