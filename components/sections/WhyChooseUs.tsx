import { MapPin, Home, Award, HeartHandshake } from 'lucide-react'

const features = [
  {
    icon: <MapPin className="h-6 w-6" />,
    title: 'Local Experts',
    description:
      'We live and work in San Bernardino. We know every neighborhood, school, and street in the Inland Empire.',
  },
  {
    icon: <Home className="h-6 w-6" />,
    title: 'Full Service',
    description:
      'From first-time buyers to luxury estates, we handle all property types with expertise and care.',
  },
  {
    icon: <Award className="h-6 w-6" />,
    title: 'Proven Results',
    description:
      'Years of successful transactions and satisfied clients. We get results that exceed expectations.',
  },
  {
    icon: <HeartHandshake className="h-6 w-6" />,
    title: 'Personal Service',
    description:
      'Direct access to your agent throughout the entire process. No call centers, just personal attention.',
  },
]

export function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="section bg-neutral-50">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div id="why-content">
            <span id="why-label" className="text-brand-600 font-semibold text-sm uppercase tracking-wider">
              Why Arrowhead
            </span>
            <h2 id="why-headline" className="text-display-sm md:text-display-md text-neutral-900 mt-3 mb-6">
              Your Trusted Real Estate Partner
            </h2>
            <p id="why-subheadline" className="text-lg text-neutral-600 mb-10">
              Finding the perfect home takes local knowledge, dedication, and expertise.
              We bring all three to help you buy or sell with confidence in San Bernardino
              and the Inland Empire.
            </p>

            <div id="why-features" className="grid sm:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-brand-100 text-brand-600 flex items-center justify-center shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-neutral-900 mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-neutral-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual element */}
          <div id="why-stats-container" className="relative">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 p-1">
              <div className="h-full w-full rounded-xl bg-white flex items-center justify-center">
                {/* Stats */}
                <div id="why-stats" className="text-center p-8">
                  <div className="grid grid-cols-2 gap-8">
                    <div id="stat-families">
                      <div className="text-4xl md:text-5xl font-display font-bold text-brand-600">
                        500+
                      </div>
                      <div className="text-neutral-600 mt-1">
                        Families Helped
                      </div>
                    </div>
                    <div id="stat-years">
                      <div className="text-4xl md:text-5xl font-display font-bold text-brand-600">
                        15+
                      </div>
                      <div className="text-neutral-600 mt-1">
                        Years Experience
                      </div>
                    </div>
                    <div id="stat-rating">
                      <div className="text-4xl md:text-5xl font-display font-bold text-brand-600">
                        4.9
                      </div>
                      <div className="text-neutral-600 mt-1">
                        Google Rating
                      </div>
                    </div>
                    <div id="stat-sales">
                      <div className="text-4xl md:text-5xl font-display font-bold text-brand-600">
                        $50M+
                      </div>
                      <div className="text-neutral-600 mt-1">
                        Properties Sold
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent-400 rounded-full opacity-20 blur-xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-brand-400 rounded-full opacity-20 blur-xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
