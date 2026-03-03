import { config } from 'dotenv'
import { resolve } from 'path'

// Load .env.local file
config({ path: resolve(process.cwd(), '.env.local') })

import { db, properties, loanPrograms, adminUsers } from './index'
import { hash } from 'bcryptjs'

// Import existing data
import propertiesData from '../../scripts/data/properties.json'

async function seed() {
  console.log('🌱 Seeding database...')

  try {
    // 1. Create default admin user
    console.log('Creating admin user...')
    const username = process.env.ADMIN_USERNAME || 'admin'
    const password = process.env.ADMIN_PASSWORD || 'admin123'
    const email = process.env.ADMIN_EMAIL || 'abelardogg.dev@gmail.com'

    const passwordHash = await hash(password, 10)

    await db.insert(adminUsers).values({
      username,
      passwordHash,
      email,
      isActive: 1,
    })
    console.log(`✅ Admin user created (username: ${username}, password: ${password})`)
    console.log('   ⚠️  CHANGE THIS PASSWORD IMMEDIATELY IN PRODUCTION!')

    // 2. Seed loan programs from config
    console.log('Seeding loan programs...')
    const loanProgramsData = [
      {
        slug: 'conventional',
        name: 'Conventional Loans',
        shortDescription: 'Traditional financing with competitive rates for qualified borrowers.',
        fullDescription:
          'Conventional loans offer flexible terms and competitive rates for homebuyers who meet standard lending requirements. These loans are not backed by government agencies and typically require higher credit scores and down payments than government-backed loans.',
        icon: 'Home',
        minDownPayment: '3%',
        maxLoanAmount: 'Up to conforming loan limits',
        features: JSON.stringify([
          'Down payments as low as 3%',
          'Flexible terms (15, 20, 30 years)',
          'No upfront mortgage insurance with 20% down',
          'Primary, secondary, or investment properties',
        ]),
        requirements: JSON.stringify([
          'Credit score typically 620 or higher',
          'Debt-to-income ratio below 43%',
          'Stable employment history',
          'Documented income and assets',
        ]),
        benefits: JSON.stringify([
          'Lower interest rates for qualified borrowers',
          'No upfront mortgage insurance with 20% down',
          'More flexible property types allowed',
          'Can be used for investment properties',
        ]),
        isActive: 1,
        displayOrder: 1,
      },
      {
        slug: 'fha',
        name: 'FHA Loans',
        shortDescription:
          'Government-backed loans ideal for first-time buyers and those with lower credit scores.',
        fullDescription:
          'FHA (Federal Housing Administration) loans are government-backed mortgages designed to help first-time homebuyers and those with less-than-perfect credit achieve homeownership. These loans offer more lenient credit requirements and lower down payment options.',
        icon: 'Shield',
        minDownPayment: '3.5%',
        maxLoanAmount: 'Varies by county',
        features: JSON.stringify([
          'Down payments as low as 3.5%',
          'More flexible credit requirements',
          'Lower closing costs',
          'Assumable loans',
        ]),
        requirements: JSON.stringify([
          'Credit score as low as 580 for 3.5% down',
          'Credit score 500-579 requires 10% down',
          'Steady employment history',
          'Property must be primary residence',
        ]),
        benefits: JSON.stringify([
          'Lower down payment requirements',
          'More lenient credit score requirements',
          'Seller can pay up to 6% of closing costs',
          'Loan is assumable by qualified buyers',
        ]),
        isActive: 1,
        displayOrder: 2,
      },
      {
        slug: 'va',
        name: 'VA Loans',
        shortDescription: 'Exclusive benefits for veterans, active military, and eligible spouses.',
        fullDescription:
          'VA (Veterans Affairs) loans are government-backed mortgages available to eligible veterans, active-duty service members, and surviving spouses. These loans offer exceptional benefits including no down payment and no private mortgage insurance requirements.',
        icon: 'Flag',
        minDownPayment: '0%',
        maxLoanAmount: 'No upper limit (varies by entitlement)',
        features: JSON.stringify([
          'No down payment required',
          'No private mortgage insurance (PMI)',
          'Competitive interest rates',
          'Limited closing costs',
        ]),
        requirements: JSON.stringify([
          'Certificate of Eligibility (COE) required',
          'Meet service requirements',
          'Property must meet VA standards',
          'Property must be primary residence',
        ]),
        benefits: JSON.stringify([
          '100% financing available',
          'No PMI regardless of down payment',
          'VA funding fee can be rolled into loan',
          'Easier to qualify than conventional loans',
        ]),
        isActive: 1,
        displayOrder: 3,
      },
      {
        slug: 'jumbo',
        name: 'Jumbo Loans',
        shortDescription:
          'Financing for high-value properties that exceed conventional loan limits.',
        fullDescription:
          'Jumbo loans are designed for borrowers purchasing high-value properties that exceed the conforming loan limits set by Fannie Mae and Freddie Mac. These loans typically require stronger credit profiles and larger down payments.',
        icon: 'TrendingUp',
        minDownPayment: '10-20%',
        maxLoanAmount: 'No upper limit',
        features: JSON.stringify([
          'Loan amounts above conforming limits',
          'Competitive rates for qualified borrowers',
          'Various term options (15, 20, 30 years)',
          'Primary and secondary homes',
        ]),
        requirements: JSON.stringify([
          'Excellent credit score (typically 700+)',
          'Low debt-to-income ratio',
          'Significant cash reserves',
          'Comprehensive income documentation',
        ]),
        benefits: JSON.stringify([
          'Finance luxury and high-value properties',
          'Flexible loan structures',
          'Potentially tax-deductible interest',
          'No PMI with 20% down payment',
        ]),
        isActive: 1,
        displayOrder: 4,
      },
    ]

    await db.insert(loanPrograms).values(loanProgramsData)
    console.log(`✅ Seeded ${loanProgramsData.length} loan programs`)

    // 3. Seed properties from JSON
    console.log('Seeding properties...')
    const propertiesToInsert = propertiesData.map((prop: any) => ({
      slug: prop.slug,
      address: prop.address.street,
      city: prop.address.city,
      state: prop.address.state,
      zipCode: prop.address.zip,
      price: prop.price,
      beds: prop.bedrooms,
      baths: prop.bathrooms,
      sqft: prop.sqft,
      lotSize: prop.lotSize?.toString() || null,
      yearBuilt: prop.yearBuilt,
      propertyType: prop.propertyType,
      status: prop.status === 'for-sale' ? 'active' : prop.status,
      description: prop.description,
      features: JSON.stringify(prop.features),
      images: JSON.stringify(prop.images),
      mainImage: prop.images[0],
      mlsNumber: prop.mlsNumber,
      virtualTourUrl: prop.virtualTourUrl,
    }))

    await db.insert(properties).values(propertiesToInsert)
    console.log(`✅ Seeded ${propertiesToInsert.length} properties`)

    console.log('\n🎉 Database seeding completed successfully!')
    console.log('\n📝 Default admin credentials:')
    console.log('   Username: admin')
    console.log('   Password: admin123')
    console.log('   ⚠️  CHANGE THIS PASSWORD IMMEDIATELY!\n')
  } catch (error) {
    console.error('❌ Seeding failed:', error)
    throw error
  }
}

// Run seed
seed()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
