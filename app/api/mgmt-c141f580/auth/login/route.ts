import { NextRequest, NextResponse } from 'next/server'
import { verifyCredentials, createSessionToken } from '@/lib/auth'
import { cookies } from 'next/headers'
import { checkRateLimit, getRateLimitHeaders } from '@/lib/rate-limit'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    // Rate limiting: 5 attempts per 15 minutes per IP
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    const rateLimit = checkRateLimit(`login:${ip}`, {
      maxAttempts: 5,
      windowMs: 15 * 60 * 1000, // 15 minutes
    })

    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: 'Too many login attempts. Please try again later.' },
        {
          status: 429,
          headers: getRateLimitHeaders(rateLimit.remaining, rateLimit.resetTime)
        }
      )
    }

    const body = await request.json()
    const { username, password } = body

    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password required' }, { status: 400 })
    }

    // Sanitize inputs
    const sanitizedUsername = username.trim().substring(0, 50)
    const sanitizedPassword = password.substring(0, 100)

    const user = await verifyCredentials(sanitizedUsername, sanitizedPassword)

    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    // Create session token
    const token = createSessionToken(user)

    // Set cookie
    const cookieStore = await cookies()
    cookieStore.set('admin_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60, // 24 hours
      path: '/',
    })

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
      },
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
