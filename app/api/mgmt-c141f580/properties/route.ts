import { NextRequest, NextResponse } from 'next/server'
import { db, properties } from '@/lib/db'
import { desc } from 'drizzle-orm'
import { cookies } from 'next/headers'
import { verifySessionToken } from '@/lib/auth'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// GET - List all properties
export async function GET() {
  try {
    // Verify auth
    const cookieStore = await cookies()
    const token = cookieStore.get('admin_session')?.value
    if (!token || !verifySessionToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const allProperties = await db.select().from(properties).orderBy(desc(properties.createdAt))

    return NextResponse.json({ properties: allProperties })
  } catch (error) {
    console.error('Error fetching properties:', error)
    return NextResponse.json({ error: 'Failed to fetch properties' }, { status: 500 })
  }
}

// POST - Create new property
export async function POST(request: NextRequest) {
  try {
    // Verify auth
    const cookieStore = await cookies()
    const token = cookieStore.get('admin_session')?.value
    if (!token || !verifySessionToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()

    // Validate required fields
    const required = ['slug', 'address', 'city', 'state', 'zipCode', 'price', 'beds', 'baths', 'sqft']
    for (const field of required) {
      if (!body[field]) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    // Sanitize and validate inputs
    const slug = String(body.slug).trim().substring(0, 200)
    const address = String(body.address).trim().substring(0, 200)
    const city = String(body.city).trim().substring(0, 100)
    const state = String(body.state || 'CA').trim().substring(0, 2).toUpperCase()
    const zipCode = String(body.zipCode).trim().substring(0, 10)

    // Validate numeric values
    const price = parseFloat(body.price)
    const beds = parseInt(body.beds)
    const baths = parseFloat(body.baths)
    const sqft = parseInt(body.sqft)

    if (isNaN(price) || price < 0 || price > 100000000) {
      return NextResponse.json({ error: 'Invalid price' }, { status: 400 })
    }
    if (isNaN(beds) || beds < 0 || beds > 20) {
      return NextResponse.json({ error: 'Invalid beds count' }, { status: 400 })
    }
    if (isNaN(baths) || baths < 0 || baths > 20) {
      return NextResponse.json({ error: 'Invalid baths count' }, { status: 400 })
    }
    if (isNaN(sqft) || sqft < 0 || sqft > 50000) {
      return NextResponse.json({ error: 'Invalid sqft' }, { status: 400 })
    }

    // Validate arrays
    const features = Array.isArray(body.features) ? body.features.slice(0, 50) : []
    const images = Array.isArray(body.images) ? body.images.slice(0, 20) : []

    // Prepare data
    const propertyData = {
      slug,
      address,
      city,
      state,
      zipCode,
      price,
      beds,
      baths,
      sqft,
      lotSize: body.lotSize ? String(body.lotSize).trim().substring(0, 50) : null,
      yearBuilt: body.yearBuilt ? parseInt(body.yearBuilt) : null,
      propertyType: ['single-family', 'condo', 'townhouse', 'multi-family', 'land'].includes(body.propertyType)
        ? body.propertyType
        : 'single-family',
      status: ['active', 'pending', 'sold', 'withdrawn'].includes(body.status)
        ? body.status
        : 'active',
      description: body.description ? String(body.description).trim().substring(0, 5000) : null,
      features: JSON.stringify(features),
      images: JSON.stringify(images),
      mainImage: body.mainImage || (images[0]) || '',
      mlsNumber: body.mlsNumber ? String(body.mlsNumber).trim().substring(0, 50) : null,
      virtualTourUrl: body.virtualTourUrl ? String(body.virtualTourUrl).trim().substring(0, 500) : null,
    }

    const result = await db.insert(properties).values(propertyData).returning()

    return NextResponse.json({ property: result[0] }, { status: 201 })
  } catch (error: any) {
    console.error('Error creating property:', error)

    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      return NextResponse.json({ error: 'Property with this slug already exists' }, { status: 409 })
    }

    return NextResponse.json({ error: 'Failed to create property' }, { status: 500 })
  }
}
