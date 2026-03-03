import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const ADMIN_PATH = '/mgmt-c141f580'

export function middleware(request: NextRequest) {
  // Block any requests to /admin (old path)
  if (request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Check if the request is for the management panel
  if (request.nextUrl.pathname.startsWith(ADMIN_PATH)) {
    const token = request.cookies.get('admin_session')?.value

    // Allow access to login page
    if (request.nextUrl.pathname === `${ADMIN_PATH}/login`) {
      return NextResponse.next()
    }

    // Protect all other routes - basic token check
    if (!token) {
      return NextResponse.redirect(new URL(`${ADMIN_PATH}/login`, request.url))
    }

    // Token validation will happen in the page/API route itself
    // since middleware runs on Edge Runtime and can't use SQLite
  }

  // Block API requests to old /api/admin path
  if (request.nextUrl.pathname.startsWith('/api/admin')) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/mgmt-c141f580/:path*', '/api/admin/:path*'],
}
