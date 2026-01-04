'use client'

import { useState } from 'react'
import { Phone, Mail, MapPin, Send, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { siteConfig } from '@/lib/config'
import { formatPhoneForTel, getGoogleMapsUrl } from '@/lib/utils'

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Aquí conectarías con Formspree, Basin, o tu API
    // Por ahora simulamos un envío
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsLoading(false)
    setIsSubmitted(true)
  }

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-900 to-brand-800 text-white py-20">
        <div className="container-wide">
          <h1 className="text-display-sm md:text-display-md mb-6">Contact Us</h1>
          <p className="text-xl text-white/80 max-w-3xl">
            Have questions? We're here to help. Reach out and one of our loan officers 
            will get back to you within 24 hours.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section">
        <div className="container-wide">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact info */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-display font-bold text-neutral-900 mb-6">
                Get in Touch
              </h2>
              
              <div className="space-y-6">
                <a 
                  href={`tel:${formatPhoneForTel(siteConfig.phone)}`}
                  className="flex items-start gap-4 p-4 rounded-xl bg-neutral-50 hover:bg-brand-50 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-lg bg-brand-100 text-brand-600 flex items-center justify-center shrink-0 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-neutral-900">Phone</div>
                    <div className="text-brand-600">{siteConfig.phone}</div>
                  </div>
                </a>

                <a 
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-start gap-4 p-4 rounded-xl bg-neutral-50 hover:bg-brand-50 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-lg bg-brand-100 text-brand-600 flex items-center justify-center shrink-0 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-neutral-900">Email</div>
                    <div className="text-brand-600">{siteConfig.email}</div>
                  </div>
                </a>

                <a 
                  href={getGoogleMapsUrl(siteConfig.address)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-4 rounded-xl bg-neutral-50 hover:bg-brand-50 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-lg bg-brand-100 text-brand-600 flex items-center justify-center shrink-0 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-neutral-900">Office</div>
                    <div className="text-neutral-600">
                      {siteConfig.address.street}<br />
                      {siteConfig.address.city}, {siteConfig.address.state} {siteConfig.address.zip}
                    </div>
                  </div>
                </a>
              </div>

              <div className="mt-8 p-6 bg-brand-50 rounded-xl">
                <h3 className="font-semibold text-neutral-900 mb-2">Office Hours</h3>
                <div className="text-sm text-neutral-600 space-y-1">
                  <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p>Saturday: 10:00 AM - 2:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>

            {/* Contact form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-neutral-200 p-8">
                <h2 className="text-2xl font-display font-bold text-neutral-900 mb-6">
                  Send us a Message
                </h2>

                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-neutral-600 mb-6">
                      Thank you for reaching out. We'll get back to you within 24 hours.
                    </p>
                    <Button onClick={() => setIsSubmitted(false)} variant="outline">
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-neutral-700 mb-2">
                          First Name *
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          required
                          className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-neutral-700 mb-2">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          required
                          className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-2">
                          Phone
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-neutral-700 mb-2">
                        Subject *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all"
                      >
                        <option value="">Select a topic...</option>
                        <option value="purchase">Home Purchase</option>
                        <option value="refinance">Refinance</option>
                        <option value="preapproval">Pre-Approval</option>
                        <option value="rates">Rate Inquiry</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all resize-none"
                        placeholder="Tell us about your mortgage needs..."
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full sm:w-auto" isLoading={isLoading}>
                      <Send className="h-5 w-5" />
                      Send Message
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
