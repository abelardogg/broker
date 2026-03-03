import { compare } from 'bcryptjs'
import { db, adminUsers } from './db'
import { eq } from 'drizzle-orm'

export interface AuthUser {
  id: number
  username: string
  email: string | null
}

export async function verifyCredentials(
  username: string,
  password: string
): Promise<AuthUser | null> {
  try {
    const user = await db.query.adminUsers.findFirst({
      where: eq(adminUsers.username, username),
    })

    if (!user || !user.isActive) {
      return null
    }

    const isValid = await compare(password, user.passwordHash)

    if (!isValid) {
      return null
    }

    // Update last login
    await db
      .update(adminUsers)
      .set({ lastLogin: new Date().toISOString() })
      .where(eq(adminUsers.id, user.id))

    return {
      id: user.id,
      username: user.username,
      email: user.email,
    }
  } catch (error) {
    console.error('Auth error:', error)
    return null
  }
}

export function createSessionToken(user: AuthUser): string {
  const secret = process.env.SESSION_SECRET || 'default-secret-change-in-production'

  const payload = {
    id: user.id,
    username: user.username,
    exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
  }

  // Create a simple signed token (HMAC-like)
  const data = JSON.stringify(payload)
  const signature = Buffer.from(secret + data).toString('base64')

  return Buffer.from(JSON.stringify({ data, signature })).toString('base64')
}

export function verifySessionToken(token: string): AuthUser | null {
  try {
    const secret = process.env.SESSION_SECRET || 'default-secret-change-in-production'
    const decoded = JSON.parse(Buffer.from(token, 'base64').toString())

    // Verify signature
    const expectedSignature = Buffer.from(secret + decoded.data).toString('base64')
    if (decoded.signature !== expectedSignature) {
      return null // Token tampered
    }

    const payload = JSON.parse(decoded.data)

    if (payload.exp < Date.now()) {
      return null // Token expired
    }

    return {
      id: payload.id,
      username: payload.username,
      email: null,
    }
  } catch {
    return null
  }
}
