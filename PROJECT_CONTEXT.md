# Arrowhead Realty - Project Context

## Project Overview
Landing page for Arrowhead Realty Group, a real estate agency serving San Bernardino and the Inland Empire in California.

**Business Owner:** Carlos Jaramillo
**DRE License:** #01847350
**Phone:** (888) 777-3556
**Email:** info@arrowheadmtg.com
**Address:** 225 W. Hospitality Lane, Ste. 201F, San Bernardino, CA 92408

## Current Phase: v1.0 - Real Estate Focus
**Status:** Converting from dual Real Estate + Mortgage to Real Estate only landing page

### What We're Building
A clean, SEO-optimized landing page showcasing real estate services in the Inland Empire with property listings.

### Technology Stack
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Deployment:**
  - QA: Vercel
  - Production: Digital Ocean Droplet

### Design System
**Color Palette:**
- Primary (Navy Blue): #1e3a5f (main), #2d4a6f (light), #0f1f33 (dark)
- Accent (Gold): #f59e0b (main), #d97706 (hover)
- Neutrals: Tailwind default grays

**Logo:**
- Light backgrounds: `/img/arrowhead-logos-v2/concept-03-lineal/logo-principal-fondo-claro.svg`
- Dark backgrounds: `/img/arrowhead-logos-v2/concept-03-lineal/logo-principal-fondo-oscuro.svg`
- Favicon: `/img/arrowhead-logos-v2/concept-03-lineal/icono-fondo-oscuro.svg`

## Site Structure (v1.0)

### Active Pages
1. **Home (/)** - Main landing page with featured listings
2. **About Us (/about)** - Team information (Carlos Jaramillo placeholder)
3. **Contact (/contact)** - Contact form and information
4. **Apply (/apply)** - Application/inquiry form
5. **Properties (/properties)** - All property listings
6. **Property Detail (/properties/[slug])** - Individual property pages with gallery

### Removed/Inactive for v1.0
- `/mortgage` - Mortgage broker services page (to be added in future version)
- `/real-estate` - Merged into home page
- `/calculators` - Mortgage calculators (future feature)

### Components Architecture

#### Layout Components
- `Header.tsx` - Navigation with logo, links, phone CTA
- `Footer.tsx` - Company info, links, licenses, contact details

#### Section Components
- `Hero.tsx` - Home page hero with carousel background
- `Services.tsx` - Combined Real Estate + Mortgage services (will be Real Estate only)
- `FeaturedListings.tsx` - Property listings grid
- `WhyChooseUs.tsx` - Value propositions

#### UI Components
- `Button.tsx` - Styled button with variants (primary, secondary, outline, ghost)
- `Carousel.tsx` - Image carousel for hero
- `PropertyCard.tsx` - Property listing card
- `PropertyGallery.tsx` - Full property photo gallery with lightbox

### Data Structure

#### Property Listings
Located in `lib/config.ts` as `sampleProperties[]`

Properties include:
- Price, address, beds, baths, square footage
- Status: for-sale, pending, sold
- Images array, features list
- MLS number, days on market
- Property type (single-family, condo, townhouse, etc.)

**Note:** Currently using placeholder data. Will need real property data/API integration.

## Key Features Implemented

### Real Estate Features ✅
- Property listing cards with photos
- Property detail pages with image galleries
- Lightbox photo viewer
- Status badges (For Sale, Pending, Sold)
- Property filtering by status
- Similar properties suggestions
- SEO-optimized URLs with slugs

### UI/UX Features ✅
- Responsive design (mobile-first)
- Hot reload for development
- ID attributes on key elements for easy updates
- Accessible navigation
- Contact CTAs throughout
- Navy blue + Gold branding

### SEO Optimization ✅
- Semantic HTML
- Meta tags with Open Graph
- Local keywords (San Bernardino, Inland Empire)
- Descriptive URLs
- Alt text on images

## Pending Updates for v1.0

### Content Changes Needed
1. Remove mortgage-specific language from:
   - Home page hero
   - Services section (focus only on Real Estate)
   - Footer
   - About page

2. Update navigation:
   - Remove "Mortgage" link
   - Remove "Calculators" link
   - Keep: Home, Properties, About, Contact

3. Update site config:
   - Change name from "Arrowhead Realty & Mortgage" to "Arrowhead Realty Group"
   - Remove NMLS reference (keep DRE only)

4. Update metadata/SEO:
   - Focus on Real Estate keywords only
   - Remove mortgage-related keywords
   - Update descriptions

### Future Features (v2.0+)
- Mortgage services integration
- Mortgage calculators
- IDX/MLS integration for live property data
- Property search filters
- Saved properties/favorites
- Virtual tour integration
- Contact form submissions to CRM/email
- Blog for SEO

## Service Areas
San Bernardino, Fontana, Rialto, Ontario, Rancho Cucamonga, Redlands, Colton, Highland

## Development Notes

### Hot Reload
Configured webpack polling in `next.config.js` for OneDrive/cloud storage compatibility

### File Organization
```
/app
  /page.tsx (home)
  /about/page.tsx
  /contact/page.tsx
  /apply/page.tsx
  /properties/page.tsx (all listings)
  /properties/[slug]/page.tsx (property detail)
  /mortgage/page.tsx (INACTIVE for v1.0)
  /real-estate/page.tsx (TO BE MERGED into home)

/components
  /layout (Header, Footer)
  /sections (Hero, Services, FeaturedListings, WhyChooseUs)
  /ui (Button, PropertyCard, PropertyGallery, Carousel)

/lib
  config.ts (site config, properties data)
  utils.ts (helper functions)

/types
  index.ts (TypeScript definitions)
```

### Environment Setup
- Node.js + npm
- TypeScript with strict mode
- Tailwind CSS v3
- Next.js 14 with App Router

## Deployment Strategy
- **QA/Staging:** Vercel (automatic deployments)
- **Production:** Digital Ocean Droplet (manual deployments, cost-effective)

## Brand Identity
**Arrowhead Realty Group**
- Established, trustworthy real estate agency
- Local experts in Inland Empire
- Led by Carlos Jaramillo (DRE #01847350)
- Focus on personalized service
- Eventually will offer combined Real Estate + Mortgage (one-stop-shop)

## Contact & Support
- GitHub: (to be added)
- Documentation: This file + inline code comments
- Support: (internal team only)

---
**Last Updated:** 2024-01-31
**Version:** 1.0.0-rc (Release Candidate - Real Estate Focus)
**Next Milestone:** Remove mortgage references, deploy v1.0 to production
