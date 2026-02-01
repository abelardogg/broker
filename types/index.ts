// Site configuration types
export interface SiteConfig {
  name: string
  nmls: string
  dre?: string
  phone: string
  email: string
  address: {
    street: string
    city: string
    state: string
    zip: string
  }
  serviceAreas?: string[]
}

// Navigation types
export interface NavItem {
  label: string
  href: string
  children?: NavItem[]
}

// Loan program types
export interface LoanProgram {
  id: string
  name: string
  description: string
  features: string[]
  icon?: string
}

// Testimonial types
export interface Testimonial {
  id: string
  name: string
  location: string
  quote: string
  rating: number
  image?: string
}

// Team member types
export interface TeamMember {
  id: string
  name: string
  title: string
  nmls?: string
  phone?: string
  email?: string
  image?: string
  bio?: string
}

// Calculator types
export interface MortgageCalculatorInputs {
  loanAmount: number
  interestRate: number
  loanTermYears: number
  downPayment: number
  propertyTax?: number
  homeInsurance?: number
  pmi?: number
}

export interface MortgageCalculatorResult {
  monthlyPayment: number
  principalAndInterest: number
  propertyTax: number
  homeInsurance: number
  pmi: number
  totalPayment: number
  totalInterest: number
}

// Property listing types
export interface Property {
  id: string
  slug: string
  listingType?: string // Sale, Rent, Lease, etc (raw string from site)
  status: 'for-sale' | 'pending' | 'sold'
  price: number
  address: {
    street: string
    city: string
    state: string
    zip: string
  }
  bedrooms: number
  bathrooms: number
  sqft: number
  lotSize?: number
  yearBuilt?: number
  propertyType: 'single-family' | 'condo' | 'townhouse' | 'multi-family' | 'land'
  description: string
  features: string[]
  images: string[]
  virtualTourUrl?: string
  mlsNumber?: string
  daysOnMarket?: number
  hoaFees?: number
  listingInfo?: {
    source?: string | null
    listingAgent?: string | null
    listingAgentDRE?: string | null
    coListingAgent?: string | null
    coListingAgentDRE?: string | null
    listingUpdated?: string | null
    listingOffice?: string | null
    coListingOffice?: string | null
    databaseUpdated?: string | null
  }
  createdAt: string
  updatedAt: string
}
