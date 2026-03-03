import { db, properties } from '@/lib/db'
import { PropertiesClient } from '@/components/properties/PropertiesClient'
import { desc } from 'drizzle-orm'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export default async function PropertiesPage() {
  const allProperties = await db.select().from(properties).orderBy(desc(properties.createdAt))

  return <PropertiesClient properties={allProperties} />
}
