import { Users, Target, Heart, Award } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { siteConfig } from '@/lib/config'

export const metadata = {
  title: 'About Us | San Bernardino Real Estate & Mortgage Experts',
  description: 'Meet the team at Arrowhead Realty & Mortgage. Local experts helping families buy homes and secure financing in San Bernardino and the Inland Empire.',
}

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-900 to-brand-800 text-white py-20">
        <div className="container-wide">
          <h1 className="text-display-sm md:text-display-md mb-6">
            About Arrowhead Realty & Mortgage
          </h1>
          <p className="text-xl text-white/80 max-w-3xl">
            Your local experts for real estate and home financing in San Bernardino
            and the Inland Empire. One team, one goal: getting you home.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="section">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-display-sm text-neutral-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-neutral-600">
                <p>
                  Arrowhead Realty & Mortgage was founded with a simple idea: buying a home
                  shouldn&apos;t mean juggling multiple companies. We combine real estate
                  expertise with mortgage services under one roof.
                </p>
                <p>
                  Based in San Bernardino, we know the Inland Empire inside and out. From
                  Fontana to Rancho Cucamonga, from Rialto to Redlands, we understand each
                  neighborhood&apos;s unique market and help our clients make informed decisions.
                </p>
                <p>
                  Whether you&apos;re a first-time buyer looking for an FHA loan, a veteran
                  exploring VA benefits, or searching for your dream home, we&apos;re here to
                  guide you every step of the way.
                </p>
              </div>
            </div>
            <div className="bg-neutral-100 rounded-2xl aspect-video flex items-center justify-center">
              <span className="text-neutral-400">Team Photo Coming Soon</span>
            </div>
          </div>
        </div>
      </section>

      {/* Team placeholder */}
      <section className="section bg-white">
        <div className="container-wide">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-display-sm text-neutral-900 mb-4">Meet Our Team</h2>
            <p className="text-lg text-neutral-600">
              Our experienced professionals are ready to help you achieve your
              homeownership goals.
            </p>
          </div>

          {/* Team member placeholder */}
          <div className="max-w-md mx-auto">
            <div className="bg-neutral-50 rounded-2xl p-8 text-center">
              <div className="w-32 h-32 bg-neutral-200 rounded-full mx-auto mb-6 flex items-center justify-center">
                <Users className="h-12 w-12 text-neutral-400" />
              </div>
              <h3 className="text-xl font-display font-bold text-neutral-900 mb-1">
                Carlos Jaramillo
              </h3>
              <p className="text-brand-600 mb-4">Broker / Owner</p>
              <div className="text-sm text-neutral-500 space-y-1">
                <p>NMLS #{siteConfig.nmls}</p>
                {siteConfig.dre && <p>DRE #{siteConfig.dre}</p>}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section bg-neutral-50">
        <div className="container-wide">
          <h2 className="text-display-sm text-neutral-900 mb-12 text-center">Why Work With Us</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Users,
                title: 'One Team',
                description: 'Real estate and mortgage services together. No need to coordinate between multiple companies.',
              },
              {
                icon: Target,
                title: 'Local Experts',
                description: 'We live and work in the Inland Empire. We know the neighborhoods, schools, and market trends.',
              },
              {
                icon: Award,
                title: 'Licensed & Trusted',
                description: 'Fully licensed mortgage broker and real estate professionals you can count on.',
              },
              {
                icon: Heart,
                title: 'Client Focused',
                description: 'Your goals are our priority. We guide you through every step, from search to keys.',
              },
            ].map((value, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-brand-100 text-brand-600 flex items-center justify-center mb-4">
                  <value.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-display font-bold text-neutral-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-neutral-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="section">
        <div className="container-wide text-center">
          <h2 className="text-display-sm text-neutral-900 mb-4">Areas We Serve</h2>
          <p className="text-lg text-neutral-600 mb-8">
            Proudly serving families throughout the Inland Empire
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {siteConfig.serviceAreas?.map((area) => (
              <span
                key={area}
                className="px-4 py-2 bg-brand-50 text-brand-700 rounded-full text-sm font-medium"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-brand-600">
        <div className="container-wide text-center">
          <h2 className="text-display-sm text-white mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Whether you&apos;re buying, selling, or refinancing, we&apos;re here to help.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/apply" variant="secondary" size="lg" className="bg-white text-brand-600 hover:bg-neutral-100">
              Get Pre-Approved
            </Button>
            <Button href="/contact" variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
