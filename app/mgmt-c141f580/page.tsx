import { db, properties, loanPrograms } from '@/lib/db'
import { AdminNav } from '@/components/admin/AdminNav'
import { Building2, FileText } from 'lucide-react'
import Link from 'next/link'
import { requireAuth } from '@/lib/admin-auth'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const ADMIN_PATH = '/mgmt-c141f580'

async function getStats() {
  const [allProperties, allLoanPrograms] = await Promise.all([
    db.select().from(properties),
    db.select().from(loanPrograms),
  ])

  const activeProperties = allProperties.filter((p) => p.status === 'active').length
  const activeLoanPrograms = allLoanPrograms.filter((lp) => lp.isActive === 1).length

  return {
    totalProperties: allProperties.length,
    activeProperties,
    totalLoanPrograms: allLoanPrograms.length,
    activeLoanPrograms,
  }
}

export default async function AdminDashboard() {
  await requireAuth() // Verify authentication
  const stats = await getStats()

  const cards = [
    {
      title: 'Properties',
      value: stats.totalProperties,
      subtitle: `${stats.activeProperties} active`,
      icon: Building2,
      href: `${ADMIN_PATH}/properties`,
      color: 'blue',
    },
    {
      title: 'Loan Programs',
      value: stats.totalLoanPrograms,
      subtitle: `${stats.activeLoanPrograms} active`,
      icon: FileText,
      href: `${ADMIN_PATH}/loan-programs`,
      color: 'green',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-gray-600">Manage your website content</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {cards.map((card) => {
            const Icon = card.icon
            return (
              <Link
                key={card.title}
                href={card.href}
                className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{card.title}</p>
                    <p className="mt-2 text-3xl font-bold text-gray-900">{card.value}</p>
                    <p className="mt-1 text-sm text-gray-500">{card.subtitle}</p>
                  </div>
                  <div
                    className={`p-3 rounded-full ${
                      card.color === 'blue' ? 'bg-blue-100' : 'bg-green-100'
                    }`}
                  >
                    <Icon
                      className={`w-8 h-8 ${
                        card.color === 'blue' ? 'text-blue-600' : 'text-green-600'
                      }`}
                    />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href={`${ADMIN_PATH}/properties/new`}
              className="px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-center"
            >
              Add New Property
            </Link>
            <Link
              href={`${ADMIN_PATH}/loan-programs/new`}
              className="px-4 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition text-center"
            >
              Add New Loan Program
            </Link>
          </div>
        </div>

        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-yellow-800">Database Information</h3>
          <p className="mt-1 text-sm text-yellow-700">
            SQLite database located at: <code className="bg-yellow-100 px-1 rounded">data/arrowhead.db</code>
          </p>
          <p className="mt-1 text-sm text-yellow-700">
            To backup: Copy the database file to a safe location
          </p>
        </div>
      </div>
    </div>
  )
}
