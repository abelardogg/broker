import type { SiteConfig, NavItem, LoanProgram } from '@/types'

export const siteConfig: SiteConfig = {
  name: 'Arrowhead Realty & Mortgage',
  nmls: '1429245',
  dre: '01847350',
  phone: '(888) 777-3556',
  email: 'info@arrowheadmtg.com',
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
  { label: 'Mortgage', href: '/mortgage' },
  { label: 'Real Estate', href: '/real-estate' },
  { label: 'Calculators', href: '/calculators' },
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
