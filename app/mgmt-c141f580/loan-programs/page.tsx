import { db, loanPrograms } from '@/lib/db'
import { AdminNav } from '@/components/admin/AdminNav'
import { requireAuth } from '@/lib/admin-auth'
import Link from 'next/link'
import { Plus, Edit } from 'lucide-react'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const ADMIN_PATH = '/mgmt-c141f580'

export default async function LoanProgramsPage() {
  await requireAuth()

  const programs = await db.select().from(loanPrograms).orderBy(loanPrograms.displayOrder)

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Loan Programs</h1>
            <p className="mt-2 text-gray-600">Manage your loan program offerings</p>
          </div>
          <Link
            href={`${ADMIN_PATH}/loan-programs/new`}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          >
            <Plus className="w-5 h-5" />
            <span>Add Loan Program</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((program) => {
            const features = program.features
              ? JSON.parse(typeof program.features === 'string' ? program.features : JSON.stringify(program.features))
              : []

            return (
              <div key={program.id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{program.name}</h3>
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      program.isActive === 1
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {program.isActive === 1 ? 'Active' : 'Inactive'}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{program.shortDescription}</p>

                <div className="space-y-2 mb-4">
                  {program.minDownPayment && (
                    <div className="text-sm">
                      <span className="text-gray-500">Down Payment:</span>{' '}
                      <span className="font-medium">{program.minDownPayment}</span>
                    </div>
                  )}
                  {program.maxLoanAmount && (
                    <div className="text-sm">
                      <span className="text-gray-500">Max Loan:</span>{' '}
                      <span className="font-medium">{program.maxLoanAmount}</span>
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-2">Features:</p>
                  <ul className="text-sm space-y-1">
                    {features.slice(0, 3).map((feature: string, idx: number) => (
                      <li key={idx} className="text-gray-700">
                        • {feature}
                      </li>
                    ))}
                    {features.length > 3 && (
                      <li className="text-gray-500 text-xs">+ {features.length - 3} more</li>
                    )}
                  </ul>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <span className="text-xs text-gray-500">Order: {program.displayOrder}</span>
                  <Link
                    href={`${ADMIN_PATH}/loan-programs/${program.id}/edit`}
                    className="inline-flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-700"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Edit</span>
                  </Link>
                </div>
              </div>
            )
          })}
        </div>

        {programs.length === 0 && (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <p className="text-gray-500 mb-4">No loan programs found</p>
            <Link
              href={`${ADMIN_PATH}/loan-programs/new`}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
            >
              <Plus className="w-5 h-5" />
              <span>Add Your First Loan Program</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
