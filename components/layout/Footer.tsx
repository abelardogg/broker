import Link from 'next/link'
import { Phone, Mail, MapPin } from 'lucide-react'
import { siteConfig, navigation } from '@/lib/config'
import { formatPhoneForTel, getGoogleMapsUrl } from '@/lib/utils'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-brand-950 text-white">
      <div className="container-wide section">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company info */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <img
                src="/img/arrowhead-logos-v2/concept-03-lineal/logo-principal-fondo-oscuro.svg"
                alt="Arrowhead Realty Group"
                className="h-14 w-auto"
              />
            </div>
            <p className="text-neutral-300 mb-6 max-w-md">
              Your trusted real estate partner in San Bernardino and the Inland
              Empire. Expert services for buyers and sellers.
            </p>
            <div className="space-y-3">
              <a
                href={`tel:${formatPhoneForTel(siteConfig.phone)}`}
                className="flex items-center gap-3 text-neutral-300 hover:text-white transition-colors"
              >
                <Phone className="h-5 w-5 text-brand-400" />
                {siteConfig.phone}
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-3 text-neutral-300 hover:text-white transition-colors"
              >
                <Mail className="h-5 w-5 text-brand-400" />
                {siteConfig.email}
              </a>
              <a
                href={getGoogleMapsUrl(siteConfig.address)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-neutral-300 hover:text-white transition-colors"
              >
                <MapPin className="h-5 w-5 text-brand-400 mt-0.5" />
                <span>
                  {siteConfig.address.street}
                  <br />
                  {siteConfig.address.city}, {siteConfig.address.state}{' '}
                  {siteConfig.address.zip}
                </span>
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {navigation
                .filter((item) => !item.children)
                .map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-neutral-300 hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">
              Services
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/properties"
                  className="text-neutral-300 hover:text-white transition-colors"
                >
                  Browse Properties
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-neutral-300 hover:text-white transition-colors"
                >
                  Buy a Home
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-neutral-300 hover:text-white transition-colors"
                >
                  Sell Your Home
                </Link>
              </li>
              <li>
                <Link
                  href="/apply"
                  className="text-neutral-300 hover:text-white transition-colors"
                >
                  Schedule Showing
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-wide py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-neutral-400">
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
              <span>© {currentYear} Arrowhead Realty Group</span>
              {siteConfig.dre && <span>DRE #{siteConfig.dre}</span>}
              <span>Equal Housing Opportunity</span>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/privacy"
                className="hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="hover:text-white transition-colors"
              >
                Terms of Use
              </Link>
              <Link
                href="/licensing"
                className="hover:text-white transition-colors"
              >
                Licensing
              </Link>
            </div>
          </div>
          <p className="mt-4 text-xs text-neutral-500 text-center md:text-left">
            Equal Housing Opportunity. All properties subject to prior sale, change,
            or withdrawal. Information deemed reliable but not guaranteed. DRE #{siteConfig.dre}
          </p>
        </div>
      </div>
    </footer>
  )
}
