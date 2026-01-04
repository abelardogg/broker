import { Users, Clock, Award, HeartHandshake } from 'lucide-react'

const features = [
  {
    icon: <Users className="h-6 w-6" />,
    title: 'Local Expertise',
    description:
      'Deep knowledge of the San Bernardino and Inland Empire real estate markets. We understand your community.',
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: 'Fast Closings',
    description:
      'Streamlined processes and dedicated support to get you from application to keys as quickly as possible.',
  },
  {
    icon: <Award className="h-6 w-6" />,
    title: 'Competitive Rates',
    description:
      'Access to multiple lenders means we can find you the best rates and terms for your situation.',
  },
  {
    icon: <HeartHandshake className="h-6 w-6" />,
    title: 'Personal Service',
    description:
      "You're not just a number. Get direct access to your loan officer throughout the entire process.",
  },
]

export function WhyChooseUs() {
  return (
    <section className="section bg-neutral-50">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <span className="text-brand-600 font-semibold text-sm uppercase tracking-wider">
              Why Arrowhead
            </span>
            <h2 className="text-display-sm md:text-display-md text-neutral-900 mt-3 mb-6">
              Your success is our priority
            </h2>
            <p className="text-lg text-neutral-600 mb-10">
              For years, we&apos;ve been helping families in San Bernardino and
              the surrounding areas achieve their homeownership dreams. Our
              approach combines industry expertise with genuine care for your
              financial well-being.
            </p>

            <div className="grid sm:grid-cols-2 gap-8">
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
          <div className="relative">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 p-1">
              <div className="h-full w-full rounded-xl bg-white flex items-center justify-center">
                {/* Stats */}
                <div className="text-center p-8">
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <div className="text-4xl md:text-5xl font-display font-bold text-brand-600">
                        500+
                      </div>
                      <div className="text-neutral-600 mt-1">
                        Families Helped
                      </div>
                    </div>
                    <div>
                      <div className="text-4xl md:text-5xl font-display font-bold text-brand-600">
                        15+
                      </div>
                      <div className="text-neutral-600 mt-1">
                        Years Experience
                      </div>
                    </div>
                    <div>
                      <div className="text-4xl md:text-5xl font-display font-bold text-brand-600">
                        4.9
                      </div>
                      <div className="text-neutral-600 mt-1">
                        Google Rating
                      </div>
                    </div>
                    <div>
                      <div className="text-4xl md:text-5xl font-display font-bold text-brand-600">
                        21
                      </div>
                      <div className="text-neutral-600 mt-1">
                        Day Avg Close
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
