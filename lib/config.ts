import type { SiteConfig, NavItem, LoanProgram, Property } from '@/types'
import propertiesData from '@/scripts/data/properties.json'

export const siteConfig: SiteConfig = {
  name: 'Arrowhead Realty Group',
  nmls: '1429245', // Keep for future mortgage integration
  dre: '01847350',
  phone: '(888) 777-3556',
  email: 'carlos@cjrealestate365.com',
  address: {
    street: '225 W. Hospitality Lane, Ste. 201F',
    city: 'San Bernardino',
    state: 'CA',
    zip: '92408',
  },
  serviceAreas: [
    'San Bernardino',
    'Fontana',
    'Rialto',
    'Ontario',
    'Rancho Cucamonga',
    'Redlands',
    'Colton',
    'Highland',
  ],
}

export const navigation: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Properties', href: '/properties' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export const loanPrograms: LoanProgram[] = [
  {
    id: 'conventional',
    name: 'Conventional Loans',
    description:
      'Traditional financing with competitive rates for qualified borrowers.',
    features: [
      'Down payments as low as 3%',
      'Flexible terms (15, 20, 30 years)',
      'No upfront mortgage insurance',
      'Primary, secondary, or investment properties',
    ],
  },
  {
    id: 'fha',
    name: 'FHA Loans',
    description:
      'Government-backed loans ideal for first-time buyers and those with lower credit scores.',
    features: [
      'Down payments as low as 3.5%',
      'More flexible credit requirements',
      'Lower closing costs',
      'Assumable loans',
    ],
  },
  {
    id: 'va',
    name: 'VA Loans',
    description:
      'Exclusive benefits for veterans, active military, and eligible spouses.',
    features: [
      'No down payment required',
      'No private mortgage insurance',
      'Competitive interest rates',
      'Limited closing costs',
    ],
  },
  {
    id: 'jumbo',
    name: 'Jumbo Loans',
    description:
      'Financing for high-value properties that exceed conventional loan limits.',
    features: [
      'Loan amounts above conforming limits',
      'Competitive rates for qualified borrowers',
      'Various term options',
      'Primary and secondary homes',
    ],
  },
]

// Real property listings from extracted data
export const sampleProperties: Property[] = propertiesData as Property[]
