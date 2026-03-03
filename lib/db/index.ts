import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import * as schema from './schema'
import { join, dirname } from 'path'
import { existsSync, mkdirSync } from 'fs'

// Get database path from environment or use default
const DATABASE_PATH = process.env.DATABASE_PATH || './data/arrowhead.db'
const dbPath = join(process.cwd(), DATABASE_PATH)

// Ensure data directory exists
const dataDir = dirname(dbPath)
if (!existsSync(dataDir)) {
  mkdirSync(dataDir, { recursive: true })
}

// Create SQLite database connection
const sqlite = new Database(dbPath)

// Enable WAL mode for better concurrency
sqlite.pragma('journal_mode = WAL')

// Create Drizzle instance
export const db = drizzle(sqlite, { schema })

// Export schema for use in queries
export * from './schema'
