import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin',
          '/admin/*',
          '/mgmt-c141f580',
          '/mgmt-c141f580/*',
          '/api/admin',
          '/api/admin/*',
          '/api/mgmt-c141f580',
          '/api/mgmt-c141f580/*',
        ],
      },
    ],
    sitemap: 'https://thearrowheadgroup.com/sitemap.xml',
  }
}
