'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Phone, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { siteConfig, navigation } from '@/lib/config'
import { formatPhoneForTel, cn } from '@/lib/utils'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-neutral-200">
      {/* Top bar */}
      <div className="bg-brand-900 text-white py-2">
        <div className="container-wide flex items-center justify-between text-sm">
          <span className="hidden sm:block">NMLS #{siteConfig.nmls}</span>
          <a
            href={`tel:${formatPhoneForTel(siteConfig.phone)}`}
            className="flex items-center gap-2 hover:text-brand-200 transition-colors"
          >
            <Phone className="h-4 w-4" />
            {siteConfig.phone}
          </a>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="container-wide py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <div className="hidden sm:block">
              <span className="font-display font-bold text-xl text-brand-900">
                Arrowhead
              </span>
              <span className="font-display font-bold text-xl text-brand-600 ml-1">
                Mortgage
              </span>
            </div>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <div key={item.label} className="relative group">
                {item.children ? (
                  <>
                    <button
                      className="flex items-center gap-1 px-4 py-2 text-neutral-700 hover:text-brand-600 transition-colors rounded-lg hover:bg-neutral-50"
                      onMouseEnter={() => setOpenDropdown(item.label)}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      {item.label}
                      <ChevronDown className="h-4 w-4" />
                    </button>
                    <div
                      className={cn(
                        'absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-xl border border-neutral-200 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200',
                        openDropdown === item.label && 'opacity-100 visible'
                      )}
                      onMouseEnter={() => setOpenDropdown(item.label)}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="block px-4 py-2 text-neutral-700 hover:bg-brand-50 hover:text-brand-600 transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="px-4 py-2 text-neutral-700 hover:text-brand-600 transition-colors rounded-lg hover:bg-neutral-50"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* CTA + Mobile menu button */}
          <div className="flex items-center gap-4">
            <Button href="/apply" size="sm" className="hidden sm:inline-flex">
              Apply Now
            </Button>
            <button
              className="lg:hidden p-2 text-neutral-700 hover:bg-neutral-100 rounded-lg"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 py-4 border-t border-neutral-200">
            <div className="flex flex-col gap-2">
              {navigation.map((item) => (
                <div key={item.label}>
                  <Link
                    href={item.href}
                    className="block px-4 py-3 text-neutral-700 hover:bg-neutral-100 rounded-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <div className="ml-4 border-l-2 border-neutral-200">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="block px-4 py-2 text-sm text-neutral-600 hover:bg-neutral-100"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="mt-4 px-4">
                <Button href="/apply" className="w-full">
                  Apply Now
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
