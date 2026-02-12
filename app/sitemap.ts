import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://thearrowheadgroup.com'

  // Static pages
  const staticPages = [
    '',
    '/about',
    '/contact',
    '/mortgage',
    '/purchase',
    '/refinance',
    '/calculators',
    '/loan-programs',
    '/real-estate',
    '/properties',
  ]

  // Loan program pages
  const loanPrograms = [
    '/loan-programs/conventional',
    '/loan-programs/fha',
    '/loan-programs/va',
    '/loan-programs/jumbo',
  ]

  // Property pages
  const properties = [
    '/properties/5571-clover-hill',
    '/properties/3480-hamner-ave',
    '/properties/615-etta-street',
  ]

  // Combine all pages
  const allPages = [...staticPages, ...loanPrograms, ...properties]

  return allPages.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' :
                     route.includes('/properties/') ? 'weekly' :
                     'monthly',
    priority: route === '' ? 1 :
              route === '/contact' ? 0.9 :
              route.includes('/properties/') ? 0.8 :
              0.7,
  }))
}
