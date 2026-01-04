import { clsx, type ClassValue } from 'clsx'

/**
 * Merge class names with clsx
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

/**
 * Format currency
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

/**
 * Format percentage
 */
export function formatPercentage(value: number, decimals = 2): string {
  return `${value.toFixed(decimals)}%`
}

/**
 * Calculate monthly mortgage payment
 */
export function calculateMonthlyPayment(
  principal: number,
  annualRate: number,
  years: number
): number {
  const monthlyRate = annualRate / 100 / 12
  const numPayments = years * 12

  if (monthlyRate === 0) {
    return principal / numPayments
  }

  return (
    (principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
    (Math.pow(1 + monthlyRate, numPayments) - 1)
  )
}

/**
 * Format phone number for tel: links
 */
export function formatPhoneForTel(phone: string): string {
  return phone.replace(/\D/g, '')
}

/**
 * Create Google Maps URL
 */
export function getGoogleMapsUrl(address: {
  street: string
  city: string
  state: string
  zip: string
}): string {
  const query = encodeURIComponent(
    `${address.street}, ${address.city}, ${address.state} ${address.zip}`
  )
  return `https://www.google.com/maps/search/?api=1&query=${query}`
}
