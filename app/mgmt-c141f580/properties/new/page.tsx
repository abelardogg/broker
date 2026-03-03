import { AdminNav } from '@/components/admin/AdminNav'
import { PropertyForm } from '@/components/admin/PropertyForm'
import { requireAuth } from '@/lib/admin-auth'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export default async function NewPropertyPage() {
  await requireAuth()

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNav />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link
            href="/admin/properties"
            className="inline-flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Properties</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Add New Property</h1>
          <p className="mt-2 text-gray-600">Fill in the details to create a new property listing</p>
        </div>

        <PropertyForm mode="create" />
      </div>
    </div>
  )
}
