import { NextRequest, NextResponse } from 'next/server'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { nanoid } from 'nanoid'
import { cookies } from 'next/headers'
import { verifySessionToken } from '@/lib/auth'
import {
  getR2Client,
  R2_BUCKET_NAME,
  R2_PUBLIC_URL,
  isValidFileType,
  isValidFileSize,
  getFileExtension,
} from '@/lib/r2-client'

export const runtime = 'nodejs'

interface PresignedUrlRequest {
  fileName: string
  fileType: string
  fileSize: number
}

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const cookieStore = await cookies()
    const token = cookieStore.get('admin_session')?.value

    if (!token || !verifySessionToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body: PresignedUrlRequest = await request.json()
    const { fileName, fileType, fileSize } = body

    // Validate required fields
    if (!fileName || !fileType || !fileSize) {
      return NextResponse.json(
        { error: 'Missing required fields: fileName, fileType, fileSize' },
        { status: 400 }
      )
    }

    // Validate file type
    if (!isValidFileType(fileType)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPEG, PNG, and WebP images are allowed.' },
        { status: 400 }
      )
    }

    // Validate file size
    if (!isValidFileSize(fileSize)) {
      return NextResponse.json(
        { error: 'File size must be between 1 byte and 10MB' },
        { status: 400 }
      )
    }

    // Generate unique file name
    const fileExtension = getFileExtension(fileType)
    const uniqueId = nanoid(16)
    const timestamp = Date.now()
    const key = `properties/${timestamp}-${uniqueId}.${fileExtension}`

    // Generate presigned URL
    const r2Client = getR2Client()
    const command = new PutObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: key,
      ContentType: fileType,
    })

    const presignedUrl = await getSignedUrl(r2Client, command, {
      expiresIn: 3600, // URL expires in 1 hour
    })

    // Construct the public URL
    const publicUrl = `${R2_PUBLIC_URL}/${key}`

    return NextResponse.json({
      presignedUrl,
      publicUrl,
      key,
    })
  } catch (error) {
    console.error('Error generating presigned URL:', error)

    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to generate presigned URL' },
      { status: 500 }
    )
  }
}
