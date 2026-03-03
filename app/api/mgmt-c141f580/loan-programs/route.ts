import { NextRequest, NextResponse } from 'next/server'
import { db, loanPrograms } from '@/lib/db'
import { desc } from 'drizzle-orm'
import { cookies } from 'next/headers'
import { verifySessionToken } from '@/lib/auth'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// GET - List all loan programs
export async function GET() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('admin_session')?.value
    if (!token || !verifySessionToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const programs = await db.select().from(loanPrograms).orderBy(loanPrograms.displayOrder)

    return NextResponse.json({ loanPrograms: programs })
  } catch (error) {
    console.error('Error fetching loan programs:', error)
    return NextResponse.json({ error: 'Failed to fetch loan programs' }, { status: 500 })
  }
}

// POST - Create new loan program
export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('admin_session')?.value
    if (!token || !verifySessionToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()

    const required = ['slug', 'name', 'shortDescription', 'fullDescription', 'icon']
    for (const field of required) {
      if (!body[field]) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    const programData = {
      slug: body.slug,
      name: body.name,
      shortDescription: body.shortDescription,
      fullDescription: body.fullDescription,
      icon: body.icon,
      minDownPayment: body.minDownPayment || null,
      maxLoanAmount: body.maxLoanAmount || null,
      features: body.features ? JSON.stringify(body.features) : JSON.stringify([]),
      requirements: body.requirements ? JSON.stringify(body.requirements) : null,
      benefits: body.benefits ? JSON.stringify(body.benefits) : null,
      isActive: body.isActive !== undefined ? body.isActive : 1,
      displayOrder: body.displayOrder || 0,
    }

    const result = await db.insert(loanPrograms).values(programData).returning()

    return NextResponse.json({ loanProgram: result[0] }, { status: 201 })
  } catch (error: any) {
    console.error('Error creating loan program:', error)

    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      return NextResponse.json(
        { error: 'Loan program with this slug already exists' },
        { status: 409 }
      )
    }

    return NextResponse.json({ error: 'Failed to create loan program' }, { status: 500 })
  }
}
