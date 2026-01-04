import { Users, Target, Heart } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { siteConfig } from '@/lib/config'

export const metadata = {
  title: 'About Us',
  description: 'Learn about Arrowhead Mortgage and our commitment to helping families achieve homeownership in San Bernardino and the Inland Empire.',
}

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-900 to-brand-800 text-white py-20">
        <div className="container-wide">
          <h1 className="text-display-sm md:text-display-md mb-6">About Arrowhead Mortgage</h1>
          <p className="text-xl text-white/80 max-w-3xl">
            For over 15 years, we've been helping families in San Bernardino and the Inland Empire 
            achieve their dreams of homeownership.
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
                  Arrowhead Mortgage was founded with a simple mission: to make the mortgage process 
                  straightforward, transparent, and accessible to everyone in our community.
                </p>
                <p>
                  Based in San Bernardino, we understand the unique challenges and opportunities 
                  of the Inland Empire real estate market. Our deep local knowledge, combined with 
                  access to a wide range of lending options, allows us to find the perfect solution 
                  for each client's unique situation.
                </p>
                <p>
                  We believe that everyone deserves a chance at homeownership, and we work tirelessly 
                  to make that dream a reality for our clients.
                </p>
              </div>
            </div>
            <div className="bg-neutral-100 rounded-2xl aspect-video flex items-center justify-center">
              <span className="text-neutral-400">Team Photo</span>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section bg-neutral-50">
        <div className="container-wide">
          <h2 className="text-display-sm text-neutral-900 mb-12 text-center">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: 'Client First',
                description: 'Your success is our success. We take the time to understand your goals and find the best solution for your unique situation.',
              },
              {
                icon: Target,
                title: 'Transparency',
                description: 'No hidden fees, no surprises. We explain every step of the process and keep you informed throughout your loan journey.',
              },
              {
                icon: Heart,
                title: 'Community',
                description: 'We\'re proud to serve San Bernardino and the Inland Empire. Helping our neighbors achieve homeownership strengthens our community.',
              },
            ].map((value, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm">
                <div className="w-14 h-14 rounded-xl bg-brand-100 text-brand-600 flex items-center justify-center mb-6">
                  <value.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-display font-bold text-neutral-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-neutral-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-brand-600">
        <div className="container-wide text-center">
          <h2 className="text-display-sm text-white mb-6">Ready to work with us?</h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Let's discuss your mortgage needs and find the perfect loan for your situation.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/apply" variant="secondary" size="lg" className="bg-white text-brand-600 hover:bg-neutral-100">
              Start Application
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
