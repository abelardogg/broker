import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core'
import { sql } from 'drizzle-orm'

// Properties table
export const properties = sqliteTable('properties', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  slug: text('slug').notNull().unique(),
  address: text('address').notNull(),
  city: text('city').notNull(),
  state: text('state').notNull().default('CA'),
  zipCode: text('zip_code').notNull(),
  price: real('price').notNull(),
  beds: integer('beds').notNull(),
  baths: real('baths').notNull(),
  sqft: integer('sqft').notNull(),
  lotSize: text('lot_size'),
  yearBuilt: integer('year_built'),
  propertyType: text('property_type').notNull(), // Single Family, Condo, Townhouse, etc.
  status: text('status').notNull().default('active'), // active, pending, sold, withdrawn
  description: text('description'),
  features: text('features'), // JSON array stored as text
  images: text('images').notNull(), // JSON array of image URLs
  mainImage: text('main_image').notNull(),
  mlsNumber: text('mls_number'),
  virtualTourUrl: text('virtual_tour_url'),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
})

// Loan Programs table
export const loanPrograms = sqliteTable('loan_programs', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  shortDescription: text('short_description').notNull(),
  fullDescription: text('full_description').notNull(),
  icon: text('icon').notNull(), // Lucide icon name
  minDownPayment: text('min_down_payment'),
  maxLoanAmount: text('max_loan_amount'),
  features: text('features').notNull(), // JSON array stored as text
  requirements: text('requirements'), // JSON array stored as text
  benefits: text('benefits'), // JSON array stored as text
  isActive: integer('is_active').notNull().default(1), // 1 = active, 0 = inactive
  displayOrder: integer('display_order').notNull().default(0),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
})

// Admin users table
export const adminUsers = sqliteTable('admin_users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  username: text('username').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  email: text('email'),
  isActive: integer('is_active').notNull().default(1),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  lastLogin: text('last_login'),
})

// Type exports for use in the application
export type Property = typeof properties.$inferSelect
export type NewProperty = typeof properties.$inferInsert
export type LoanProgram = typeof loanPrograms.$inferSelect
export type NewLoanProgram = typeof loanPrograms.$inferInsert
export type AdminUser = typeof adminUsers.$inferSelect
export type NewAdminUser = typeof adminUsers.$inferInsert
