import { NextRequest, NextResponse } from 'next/server'
import { db, loanPrograms } from '@/lib/db'
import { eq } from 'drizzle-orm'
import { cookies } from 'next/headers'
import { verifySessionToken } from '@/lib/auth'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// GET - Get single loan program
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const cookieStore = await cookies()
    const token = cookieStore.get('admin_session')?.value
    if (!token || !verifySessionToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const program = await db.query.loanPrograms.findFirst({
      where: eq(loanPrograms.id, parseInt(id)),
    })

    if (!program) {
      return NextResponse.json({ error: 'Loan program not found' }, { status: 404 })
    }

    return NextResponse.json({ loanProgram: program })
  } catch (error) {
    console.error('Error fetching loan program:', error)
    return NextResponse.json({ error: 'Failed to fetch loan program' }, { status: 500 })
  }
}

// PUT - Update loan program
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const cookieStore = await cookies()
    const token = cookieStore.get('admin_session')?.value
    if (!token || !verifySessionToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()

    const updateData: any = {
      updatedAt: new Date().toISOString(),
    }

    if (body.slug !== undefined) updateData.slug = body.slug
    if (body.name !== undefined) updateData.name = body.name
    if (body.shortDescription !== undefined) updateData.shortDescription = body.shortDescription
    if (body.fullDescription !== undefined) updateData.fullDescription = body.fullDescription
    if (body.icon !== undefined) updateData.icon = body.icon
    if (body.minDownPayment !== undefined) updateData.minDownPayment = body.minDownPayment
    if (body.maxLoanAmount !== undefined) updateData.maxLoanAmount = body.maxLoanAmount
    if (body.features !== undefined) updateData.features = JSON.stringify(body.features)
    if (body.requirements !== undefined) updateData.requirements = JSON.stringify(body.requirements)
    if (body.benefits !== undefined) updateData.benefits = JSON.stringify(body.benefits)
    if (body.isActive !== undefined) updateData.isActive = body.isActive
    if (body.displayOrder !== undefined) updateData.displayOrder = body.displayOrder

    const result = await db
      .update(loanPrograms)
      .set(updateData)
      .where(eq(loanPrograms.id, parseInt(id)))
      .returning()

    if (result.length === 0) {
      return NextResponse.json({ error: 'Loan program not found' }, { status: 404 })
    }

    return NextResponse.json({ loanProgram: result[0] })
  } catch (error: any) {
    console.error('Error updating loan program:', error)

    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      return NextResponse.json(
        { error: 'Loan program with this slug already exists' },
        { status: 409 }
      )
    }

    return NextResponse.json({ error: 'Failed to update loan program' }, { status: 500 })
  }
}

// DELETE - Delete loan program
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const cookieStore = await cookies()
    const token = cookieStore.get('admin_session')?.value
    if (!token || !verifySessionToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const result = await db.delete(loanPrograms).where(eq(loanPrograms.id, parseInt(id))).returning()

    if (result.length === 0) {
      return NextResponse.json({ error: 'Loan program not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, loanProgram: result[0] })
  } catch (error) {
    console.error('Error deleting loan program:', error)
    return NextResponse.json({ error: 'Failed to delete loan program' }, { status: 500 })
  }
}
