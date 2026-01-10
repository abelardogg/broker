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
