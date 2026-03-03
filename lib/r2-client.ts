import { S3Client } from '@aws-sdk/client-s3'

// Validate R2 configuration
function validateR2Config() {
  const required = [
    'R2_ACCOUNT_ID',
    'R2_ACCESS_KEY_ID',
    'R2_SECRET_ACCESS_KEY',
    'R2_BUCKET_NAME',
  ]

  const missing = required.filter((key) => !process.env[key])

  if (missing.length > 0) {
    throw new Error(
      `Missing required R2 environment variables: ${missing.join(', ')}`
    )
  }
}

// Initialize R2 client
let r2Client: S3Client | null = null

export function getR2Client(): S3Client {
  if (r2Client) {
    return r2Client
  }

  validateR2Config()

  const accountId = process.env.R2_ACCOUNT_ID!
  const accessKeyId = process.env.R2_ACCESS_KEY_ID!
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY!

  r2Client = new S3Client({
    region: 'auto',
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  })

  return r2Client
}

export const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME || ''
export const R2_PUBLIC_URL = process.env.R2_PUBLIC_URL || ''

// Allowed file types
export const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp']
export const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

// Validate file type
export function isValidFileType(contentType: string): boolean {
  return ALLOWED_FILE_TYPES.includes(contentType)
}

// Validate file size
export function isValidFileSize(size: number): boolean {
  return size > 0 && size <= MAX_FILE_SIZE
}

// Get file extension from content type
export function getFileExtension(contentType: string): string {
  const map: Record<string, string> = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp',
  }
  return map[contentType] || 'jpg'
}
