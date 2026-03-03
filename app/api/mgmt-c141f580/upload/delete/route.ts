import { NextRequest, NextResponse } from 'next/server'
import { DeleteObjectCommand } from '@aws-sdk/client-s3'
import { cookies } from 'next/headers'
import { verifySessionToken } from '@/lib/auth'
import { getR2Client, R2_BUCKET_NAME, R2_PUBLIC_URL } from '@/lib/r2-client'

export const runtime = 'nodejs'

interface DeleteRequest {
  url: string
}

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const cookieStore = await cookies()
    const token = cookieStore.get('admin_session')?.value

    if (!token || !verifySessionToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body: DeleteRequest = await request.json()
    const { url } = body

    // Validate required fields
    if (!url) {
      return NextResponse.json(
        { error: 'Missing required field: url' },
        { status: 400 }
      )
    }

    // Extract the key from the URL
    // URL format: https://your-bucket.r2.domain.com/properties/timestamp-id.ext
    let key: string

    try {
      // Check if it's a full URL or just a key
      if (url.startsWith('http://') || url.startsWith('https://')) {
        const urlObj = new URL(url)
        // Remove leading slash from pathname
        key = urlObj.pathname.startsWith('/')
          ? urlObj.pathname.substring(1)
          : urlObj.pathname
      } else {
        // It's already a key
        key = url.startsWith('/') ? url.substring(1) : url
      }
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid URL format' },
        { status: 400 }
      )
    }

    if (!key) {
      return NextResponse.json(
        { error: 'Could not extract key from URL' },
        { status: 400 }
      )
    }

    // Delete the object from R2
    const r2Client = getR2Client()
    const command = new DeleteObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: key,
    })

    await r2Client.send(command)

    return NextResponse.json({
      success: true,
      message: 'Image deleted successfully',
    })
  } catch (error) {
    console.error('Error deleting image:', error)

    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to delete image' },
      { status: 500 }
    )
  }
}
