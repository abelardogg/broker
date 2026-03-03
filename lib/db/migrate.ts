import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import { migrate } from 'drizzle-orm/better-sqlite3/migrator'
import { join } from 'path'
import { existsSync, mkdirSync } from 'fs'

// Ensure data directory exists
const dataDir = join(process.cwd(), 'data')
if (!existsSync(dataDir)) {
  mkdirSync(dataDir, { recursive: true })
}

const dbPath = join(dataDir, 'arrowhead.db')
const sqlite = new Database(dbPath)
const db = drizzle(sqlite)

async function main() {
  console.log('🚀 Running database migrations...')

  try {
    await migrate(db, { migrationsFolder: './lib/db/migrations' })
    console.log('✅ Migrations completed successfully!')
  } catch (error) {
    console.error('❌ Migration failed:', error)
    process.exit(1)
  }

  sqlite.close()
}

main()
