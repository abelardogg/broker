export function StructuredData() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    '@id': 'https://thearrowheadgroup.com/#organization',
    name: 'The Arrowhead Group',
    legalName: 'The Arrowhead Group Real Estate & Mortgage',
    url: 'https://thearrowheadgroup.com',
    logo: 'https://thearrowheadgroup.com/img/arrowhead-logos-v2/concept-03-lineal/logo-horizontal-fondo-claro.svg',
    image: 'https://thearrowheadgroup.com/img/arrowhead-logos-v2/concept-03-lineal/logo-horizontal-fondo-claro.svg',
    description: 'The Arrowhead Group provides expert real estate and mortgage services in San Bernardino and the Inland Empire. Licensed real estate brokerage (DRE #01847350) specializing in home buying, selling, and mortgage financing.',
    telephone: '+1-909-915-9500',
    email: 'info@thearrowheadgroup.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'San Bernardino',
      addressRegion: 'CA',
      addressCountry: 'US',
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'San Bernardino',
        '@id': 'https://en.wikipedia.org/wiki/San_Bernardino,_California',
      },
      {
        '@type': 'City',
        name: 'Fontana',
      },
      {
        '@type': 'City',
        name: 'Rialto',
      },
      {
        '@type': 'City',
        name: 'Ontario',
      },
      {
        '@type': 'City',
        name: 'Rancho Cucamonga',
      },
      {
        '@type': 'City',
        name: 'Redlands',
      },
      {
        '@type': 'State',
        name: 'California',
      },
    ],
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 34.1083,
      longitude: -117.2898,
    },
    sameAs: [
      // Add social media profiles here when available
      // 'https://www.facebook.com/arrowheadgroup',
      // 'https://www.instagram.com/arrowheadgroup',
      // 'https://www.linkedin.com/company/arrowheadgroup',
    ],
    // TODO: Add aggregateRating once reviews are collected
    // aggregateRating: {
    //   '@type': 'AggregateRating',
    //   ratingValue: '5',
    //   reviewCount: '24',
    // },
    priceRange: '$$',
    knowsAbout: [
      'Real Estate',
      'Home Buying',
      'Home Selling',
      'Mortgage Financing',
      'Property Investment',
      'Conventional Loans',
      'FHA Loans',
      'VA Loans',
      'Jumbo Loans',
      'Home Refinancing',
    ],
    makesOffer: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Real Estate Services',
          description: 'Residential real estate buying and selling services',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Mortgage Services',
          description: 'Home loan financing and mortgage consultation',
        },
      },
    ],
  }

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://thearrowheadgroup.com/#localbusiness',
    name: 'The Arrowhead Group',
    image: 'https://thearrowheadgroup.com/img/arrowhead-logos-v2/concept-03-lineal/logo-horizontal-fondo-claro.svg',
    url: 'https://thearrowheadgroup.com',
    telephone: '+1-909-915-9500',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'San Bernardino',
      addressRegion: 'CA',
      addressCountry: 'US',
    },
    priceRange: '$$',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '10:00',
        closes: '16:00',
      },
    ],
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://thearrowheadgroup.com/#website',
    name: 'The Arrowhead Group',
    url: 'https://thearrowheadgroup.com',
    description: 'Find your dream home in San Bernardino and the Inland Empire with The Arrowhead Group. Expert real estate and mortgage services.',
    publisher: {
      '@id': 'https://thearrowheadgroup.com/#organization',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://thearrowheadgroup.com/properties?search={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
    inLanguage: 'en-US',
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://thearrowheadgroup.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Real Estate',
        item: 'https://thearrowheadgroup.com/real-estate',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Mortgage',
        item: 'https://thearrowheadgroup.com/mortgage',
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'Properties',
        item: 'https://thearrowheadgroup.com/properties',
      },
      {
        '@type': 'ListItem',
        position: 5,
        name: 'Contact',
        item: 'https://thearrowheadgroup.com/contact',
      },
    ],
  }

  return (
    <>
      {/* Organization & Real Estate Agent Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      {/* Local Business Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      {/* Website Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  )
}
