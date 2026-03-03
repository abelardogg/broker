'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Home, Building2, FileText, LogOut } from 'lucide-react'

const ADMIN_PATH = '/mgmt-c141f580'

export function AdminNav() {
  const pathname = usePathname()
  const router = useRouter()

  async function handleLogout() {
    await fetch(`/api${ADMIN_PATH}/auth/logout`, { method: 'POST' })
    router.push(`${ADMIN_PATH}/login`)
    router.refresh()
  }

  const navItems = [
    { href: ADMIN_PATH, label: 'Dashboard', icon: Home },
    { href: `${ADMIN_PATH}/properties`, label: 'Properties', icon: Building2 },
    { href: `${ADMIN_PATH}/loan-programs`, label: 'Loan Programs', icon: FileText },
  ]

  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <div className="flex-shrink-0">
              <span className="text-xl font-bold">Management Portal</span>
            </div>
            <div className="flex space-x-4">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition ${
                      isActive
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  )
}
