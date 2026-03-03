import { NextRequest, NextResponse } from 'next/server'
import { db, properties } from '@/lib/db'
import { eq } from 'drizzle-orm'
import { cookies } from 'next/headers'
import { verifySessionToken } from '@/lib/auth'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// GET - Get single property
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    // Verify auth
    const cookieStore = await cookies()
    const token = cookieStore.get('admin_session')?.value
    if (!token || !verifySessionToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const property = await db.query.properties.findFirst({
      where: eq(properties.id, parseInt(id)),
    })

    if (!property) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 })
    }

    return NextResponse.json({ property })
  } catch (error) {
    console.error('Error fetching property:', error)
    return NextResponse.json({ error: 'Failed to fetch property' }, { status: 500 })
  }
}

// PUT - Update property
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    // Verify auth
    const cookieStore = await cookies()
    const token = cookieStore.get('admin_session')?.value
    if (!token || !verifySessionToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()

    // Prepare update data
    const updateData: any = {
      updatedAt: new Date().toISOString(),
    }

    // Only include fields that are provided
    if (body.slug !== undefined) updateData.slug = body.slug
    if (body.address !== undefined) updateData.address = body.address
    if (body.city !== undefined) updateData.city = body.city
    if (body.state !== undefined) updateData.state = body.state
    if (body.zipCode !== undefined) updateData.zipCode = body.zipCode
    if (body.price !== undefined) updateData.price = parseFloat(body.price)
    if (body.beds !== undefined) updateData.beds = parseInt(body.beds)
    if (body.baths !== undefined) updateData.baths = parseFloat(body.baths)
    if (body.sqft !== undefined) updateData.sqft = parseInt(body.sqft)
    if (body.lotSize !== undefined) updateData.lotSize = body.lotSize
    if (body.yearBuilt !== undefined)
      updateData.yearBuilt = body.yearBuilt ? parseInt(body.yearBuilt) : null
    if (body.propertyType !== undefined) updateData.propertyType = body.propertyType
    if (body.status !== undefined) updateData.status = body.status
    if (body.description !== undefined) updateData.description = body.description
    if (body.features !== undefined) updateData.features = JSON.stringify(body.features)
    if (body.images !== undefined) updateData.images = JSON.stringify(body.images)
    if (body.mainImage !== undefined) updateData.mainImage = body.mainImage
    if (body.mlsNumber !== undefined) updateData.mlsNumber = body.mlsNumber
    if (body.virtualTourUrl !== undefined) updateData.virtualTourUrl = body.virtualTourUrl

    const result = await db
      .update(properties)
      .set(updateData)
      .where(eq(properties.id, parseInt(id)))
      .returning()

    if (result.length === 0) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 })
    }

    return NextResponse.json({ property: result[0] })
  } catch (error: any) {
    console.error('Error updating property:', error)

    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      return NextResponse.json({ error: 'Property with this slug already exists' }, { status: 409 })
    }

    return NextResponse.json({ error: 'Failed to update property' }, { status: 500 })
  }
}

// DELETE - Delete property
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // Verify auth
    const cookieStore = await cookies()
    const token = cookieStore.get('admin_session')?.value
    if (!token || !verifySessionToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const result = await db.delete(properties).where(eq(properties.id, parseInt(id))).returning()

    if (result.length === 0) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, property: result[0] })
  } catch (error) {
    console.error('Error deleting property:', error)
    return NextResponse.json({ error: 'Failed to delete property' }, { status: 500 })
  }
}
