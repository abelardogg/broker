# The Arrowhead Group - Technical Specification

**Version:** 1.0.0
**Last Updated:** 2026-02-12
**Project Status:** Production (with deployment challenges)

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Technical Stack](#technical-stack)
3. [Architecture](#architecture)
4. [Features](#features)
5. [Infrastructure](#infrastructure)
6. [SEO & Analytics](#seo--analytics)
7. [Known Issues & Challenges](#known-issues--challenges)
8. [Future Roadmap](#future-roadmap)
9. [Development Workflow](#development-workflow)
10. [Deployment Process](#deployment-process)

---

## Project Overview

### Business Description
The Arrowhead Group is a full-service real estate and mortgage brokerage serving San Bernardino and the Inland Empire in California. The website provides property listings, mortgage information, loan program details, and lead generation through contact forms.

### Project Goals
- Generate leads for real estate and mortgage services
- Showcase property listings
- Educate potential clients about loan programs
- Provide mortgage calculators and tools
- Rank for local real estate keywords in Google

### Target Audience
- First-time home buyers in California
- Homeowners looking to refinance
- People searching for houses for sale in San Bernardino
- Real estate investors in the Inland Empire

---

## Technical Stack

### Frontend Framework
```json
{
  "framework": "Next.js 14.2.21",
  "router": "App Router",
  "language": "TypeScript",
  "styling": "Tailwind CSS 3.x",
  "fonts": {
    "body": "DM Sans (Google Fonts)",
    "display": "Plus Jakarta Sans (Google Fonts)"
  },
  "icons": "Lucide React"
}
```

### Key Dependencies
```json
{
  "dependencies": {
    "next": "14.2.21",
    "react": "^18",
    "react-dom": "^18",
    "typescript": "^5",
    "tailwindcss": "^3.4.1",
    "lucide-react": "latest",
    "nodemailer": "^7.0.13",
    "better-sqlite3": "^11.8.1",
    "drizzle-orm": "^0.39.3",
    "bcryptjs": "^2.4.3",
    "@aws-sdk/client-s3": "^3.x",
    "@aws-sdk/s3-request-presigner": "^3.x",
    "nanoid": "^5.x"
  }
}
```

### Build Output
- **Development:** Hot-reload dev server (port 3000)
- **Production:** Server-side rendered (SSR) or Static Export
- **Current Constraint:** Cannot build on server due to RAM limitations

---

## Architecture

### Current Architecture (SSR - Next.js with Node.js server)

```
┌─────────────────────────────────────────┐
│  Production (DigitalOcean Droplet)      │
│  RAM: 469MB | Storage: Limited          │
│                                         │
│  ┌────────────────────────────────┐    │
│  │  Nginx (Port 80/443)           │    │
│  │  - SSL: Let's Encrypt          │    │
│  │  - Reverse Proxy               │    │
│  └────────────┬───────────────────┘    │
│               │                         │
│  ┌────────────▼───────────────────┐    │
│  │  PM2 Process Manager           │    │
│  │  - App: "arrowhead-realty"     │    │
│  │  - Auto-restart enabled        │    │
│  └────────────┬───────────────────┘    │
│               │                         │
│  ┌────────────▼───────────────────┐    │
│  │  Next.js Server (Port 3000)    │    │
│  │  - Node.js v20.x               │    │
│  │  - Serves .next build          │    │
│  └────────────────────────────────┘    │
└─────────────────────────────────────────┘
```

### Proposed Architecture (Static Export)

```
┌─────────────────────────────────────────┐
│  Production (DigitalOcean Droplet)      │
│  RAM: 469MB | Storage: Limited          │
│                                         │
│  ┌────────────────────────────────┐    │
│  │  Nginx (Port 80/443)           │    │
│  │  - SSL: Let's Encrypt          │    │
│  │  - Serves static files         │    │
│  │  - No PM2/Node.js needed       │    │
│  └────────────────────────────────┘    │
│         Serves: /var/www/html/          │
│         (Static HTML/CSS/JS files)      │
└─────────────────────────────────────────┘
              │
              │ API Calls (AJAX)
              ▼
┌─────────────────────────────────────────┐
│  Cloudflare Workers (FREE)              │
│  - Contact form API endpoint            │
│  - Email sending via Nodemailer         │
│  - 100k requests/day free tier          │
└─────────────────────────────────────────┘
```

---

## Features

### Pages & Routes

| Route | Type | Description | Status |
|-------|------|-------------|--------|
| `/` | Static | Homepage with hero, featured properties | ✅ Live |
| `/about` | Static | Company info, team, values | ✅ Live |
| `/contact` | Client | Contact form with validation | ✅ Live |
| `/properties` | Client | Property listings grid with modal | ✅ Live |
| `/properties/[slug]` | Static | Individual property detail pages | ✅ Live |
| `/mortgage` | Static | Mortgage services overview | ✅ Live |
| `/real-estate` | Static | Real estate services | ✅ Live |
| `/loan-programs` | Static | Loan programs overview | ✅ Live |
| `/loan-programs/[slug]` | Static | Individual loan program pages | ✅ Live |
| `/purchase` | Static | Home purchase information | ✅ Live |
| `/refinance` | Static | Refinance information | ✅ Live |
| `/calculators` | Client | Mortgage calculator tool | ✅ Live |
| `/apply` | Static | Mortgage application form | ❌ Disabled |
| `/api/contact` | API | Contact form submission handler | ✅ Live |
| `/admin` | Server | Admin dashboard with statistics | ✅ Live |
| `/admin/login` | Server | Admin authentication | ✅ Live |
| `/admin/properties` | Server | Property CRUD management | ✅ Live |
| `/admin/loan-programs` | Server | Loan program management | ✅ Live |
| `/api/admin/*` | API | Admin CRUD endpoints | ✅ Live |
| `/api/admin/upload/*` | API | R2 image upload/delete | ✅ Live |

### Key Components

**Layout Components:**
- `Header` - Navigation with mobile menu, phone CTA
- `Footer` - Company info, links, disclaimer
- `PageView` - GTM page view tracking

**Section Components:**
- `Hero` - Full-width hero with carousel background
- `WhyChooseUs` - Features grid with stats
- `PropertyShowcase` - Featured listings
- `CTASection` - Call-to-action with gradient background

**UI Components:**
- `Button` - Primary/secondary/outline variants
- `PropertyCard` - Property listing card
- `PropertyModal` - Full property details modal
- `PropertyGallery` - Image gallery with lightbox
- `Carousel` - Auto-playing image carousel

**SEO Components:**
- `StructuredData` - JSON-LD schema markup
- Per-page metadata with canonical links
- Dynamic sitemap generation

---

## Infrastructure

### Hosting Details

**Primary Server:**
- **Provider:** DigitalOcean
- **Plan:** $4/month droplet
- **RAM:** 469MB (critical constraint)
- **OS:** Ubuntu
- **Domain:** thearrowheadgroup.com
- **SSL:** Let's Encrypt (auto-renewal configured)

**Server Software:**
- **Web Server:** Nginx
- **Process Manager:** PM2 (currently used)
- **Node.js:** v20.x LTS
- **Swap:** 2GB (required for npm install)
- **Database:** SQLite (file-based, ./data/arrowhead.db)

**Image Storage:**
- **Provider:** Cloudflare R2
- **Plan:** FREE (10GB storage, unlimited egress)
- **Bucket:** arrowhead
- **Public URL:** https://pub-dda599f3c7434fd6afc5efb94beed866.r2.dev
- **Cost:** $0/month

**SSH Access:**
- **User:** dev (non-root)
- **Directory:** /var/www/arrowhead-realty/broker
- **Authentication:** SSH key

### DNS Configuration
- **Domain:** thearrowheadgroup.com
- **Nameservers:** [Configured with domain registrar]
- **A Record:** Points to DigitalOcean droplet IP
- **WWW Record:** CNAME to root domain

---

## SEO & Analytics

### SEO Implementation

**Metadata:**
- Per-page title, description, canonical links
- Open Graph tags for social sharing
- Twitter Card metadata
- Structured data (JSON-LD) for organization, local business, website

**Keywords Targeted:**
- houses for sale California
- homes for sale San Bernardino
- real estate agent California
- buy a house California
- sell your house California
- first time home buyer
- mortgage options California
- property for sale Inland Empire

**Technical SEO:**
- Sitemap: `/sitemap.xml` (dynamically generated)
- Robots.txt: Configured for indexing
- Canonical URLs: Implemented on all pages
- HTTPS: Enabled with Let's Encrypt
- Mobile responsive: Tailwind CSS responsive design

### Analytics & Tracking

**Google Analytics:**
- Property ID: `G-WNMTKLDNRY`
- Implementation: gtag.js via next/script

**Google Tag Manager:**
- Container ID: `GTM-KFZSRT8G`
- Custom Events: page_view tracking via PageView component

**Conversion Tracking:**
- Contact form submissions (planned)
- Phone click tracking (planned)
- Property inquiry tracking (planned)

---

## Known Issues & Challenges

### Critical Issues

#### 1. Build Process Failure on Server
**Problem:**
- `npm run build` crashes with "Bus error (core dumped)"
- Server has only 469MB RAM, insufficient for Next.js build

**Current Workaround:**
```bash
# Build locally on Windows
npm run build

# Upload compiled .next to server
scp -r .next dev@server:/var/www/arrowhead-realty/broker/

# Update code and restart
ssh dev@server
cd /var/www/arrowhead-realty/broker
git pull
pm2 restart arrowhead-realty
```

**Impact:**
- Manual deployment required
- Time-consuming workflow
- Error-prone process
- No CI/CD possible

**Proposed Solutions:**
1. **Static Export (RECOMMENDED):** Convert to `output: 'export'` in next.config.js
2. **Upgrade Droplet:** Increase to $6/month plan with 1GB RAM
3. **GitHub Actions:** Build in CI/CD, deploy automatically
4. **Move to Vercel:** Free tier with automatic builds

#### 2. API Route in Static Export
**Problem:**
- `/api/contact` route won't work with static export
- Nodemailer requires server-side execution

**Solution:**
- Move contact form API to Cloudflare Workers (free tier)
- Or use third-party service (Formspree, Basin, Web3Forms)

### Minor Issues

#### 3. Image Optimization Warnings
**Problem:** Using `<img>` instead of Next.js `<Image>` component
**Impact:** Build warnings, slower performance
**Status:** Low priority, not blocking

#### 4. npm Vulnerabilities
**Problem:** Some package dependencies have known vulnerabilities
**Impact:** Mostly dev dependencies, low risk
**Status:** To be reviewed

#### 5. Incomplete Apply Form
**Problem:** `/apply` route exists but form is incomplete
**Current State:** Route disabled, button redirects to `/contact`
**Status:** Future development

---

## Future Roadmap

### Phase 1: Stabilize Deployment (URGENT)
- [ ] Implement static export configuration
- [ ] Move contact API to Cloudflare Workers
- [ ] Test full static deployment workflow
- [ ] Update deployment documentation

### Phase 2: Content Management System (✅ COMPLETED)
- [x] SQLite database with Drizzle ORM
- [x] Admin panel with authentication
- [x] Property CRUD operations
- [x] Loan program management
- [x] Cloudflare R2 image storage integration
- [x] User-friendly forms (comma-separated values)
- [ ] Integrate frontend properties page with database
- [ ] Add blog functionality

### Phase 3: Feature Completion
- [ ] Complete mortgage application form
- [ ] Add property search/filtering
- [ ] Implement blog functionality
- [ ] Add team member profiles
- [ ] Create testimonials section

### Phase 4: Optimization
- [ ] Convert images to next/image
- [ ] Implement lazy loading
- [ ] Add service worker/PWA
- [ ] Performance optimization
- [ ] Accessibility audit (WCAG AA)

### Phase 5: Marketing & Growth
- [ ] Add Google Reviews integration
- [ ] Implement lead capture popups
- [ ] Email marketing integration
- [ ] Social media feed integration
- [ ] A/B testing setup

---

## Development Workflow

### Local Development

**Setup:**
```bash
# Clone repository
git clone https://github.com/yourusername/arrowhead-realty.git
cd arrowhead-realty/broker

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env.local
# Edit .env.local with your credentials

# Start development server
npm run dev
# Open http://localhost:3000
```

**Environment Variables (.env.local):**
```env
# Email
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
EMAIL_TO=recipient@example.com

# Database
DATABASE_PATH=./data/arrowhead.db

# Security
SESSION_SECRET=change-this-to-a-random-secret-in-production

# Admin (used for initial seed)
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
ADMIN_EMAIL=your-email@example.com

# Cloudflare R2
R2_ACCOUNT_ID=your-cloudflare-account-id
R2_ACCESS_KEY_ID=your-r2-access-key-id
R2_SECRET_ACCESS_KEY=your-r2-secret-access-key
R2_BUCKET_NAME=your-bucket-name
R2_PUBLIC_URL=https://your-bucket-url.r2.dev
```

### Code Standards

**TypeScript:**
- Strict mode enabled
- All components strongly typed
- Props interfaces defined

**Styling:**
- Tailwind utility classes preferred
- Custom CSS minimal
- Responsive-first approach

**Component Structure:**
```typescript
// Preferred pattern
export function ComponentName() {
  // Hooks
  // Handlers
  // Render
  return (...)
}
```

---

## Deployment Process

### Current Deployment (Manual)

**Prerequisites:**
- SSH access to DigitalOcean droplet
- Git repository access
- Local development environment

**Steps:**
```bash
# 1. LOCAL: Make changes and commit
git add .
git commit -m "Description of changes"
git push origin main

# 2. LOCAL: Build project
npm run build

# 3. LOCAL: Upload build to server
scp -r .next dev@your-ip:/var/www/arrowhead-realty/broker/

# 4. SERVER: Update code and restart
ssh dev@your-ip
cd /var/www/arrowhead-realty/broker
git pull
pm2 restart arrowhead-realty
pm2 logs arrowhead-realty --lines 50

# 5. VERIFY: Check website
# Visit https://thearrowheadgroup.com
```

### Proposed Deployment (Static Export)

**Prerequisites:**
- GitHub repository
- Cloudflare account (for Workers)
- SSH access to server (for file upload)

**Steps:**
```bash
# 1. LOCAL: Configure static export
# Add to next.config.js:
# output: 'export'

# 2. LOCAL: Build static site
npm run build
# Generates ./out/ directory

# 3. LOCAL: Upload to server
scp -r out/* dev@your-ip:/var/www/html/

# 4. DONE: No restart needed, Nginx serves static files
```

**Benefits:**
- No PM2/Node.js required on server
- Instant updates
- Lower resource usage
- Simpler deployment

---

## File Structure

```
broker/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout (fonts, analytics, SEO)
│   ├── page.tsx                  # Homepage
│   ├── globals.css               # Global styles
│   ├── about/
│   │   └── page.tsx
│   ├── contact/
│   │   ├── layout.tsx            # Contact page metadata
│   │   └── page.tsx              # Contact form (client component)
│   ├── properties/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── mortgage/
│   ├── real-estate/
│   ├── loan-programs/
│   ├── purchase/
│   ├── refinance/
│   ├── calculators/
│   ├── api/
│   │   └── contact/
│   │       └── route.ts          # Email API endpoint
│   └── sitemap.ts                # Dynamic sitemap generation
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── WhyChooseUs.tsx
│   │   ├── PropertyShowcase.tsx
│   │   └── CTASection.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── PropertyCard.tsx
│   │   ├── PropertyModal.tsx
│   │   ├── PropertyGallery.tsx
│   │   └── Carousel.tsx
│   ├── analytics/
│   │   └── PageView.tsx          # GTM page view tracking
│   └── seo/
│       └── StructuredData.tsx    # JSON-LD schemas
│
├── lib/
│   ├── config.ts                 # Site configuration, sample data
│   └── utils.ts                  # Utility functions
│
├── types/
│   └── index.ts                  # TypeScript type definitions
│
├── public/
│   └── img/                      # Static images, logos
│
├── .env.local                    # Environment variables (not in git)
├── .gitignore
├── next.config.mjs               # Next.js configuration
├── tailwind.config.ts            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
├── package.json
├── README.md                     # User documentation
├── SPEC.md                       # This file - technical specification
├── PROJECT_OVERVIEW.md           # Project overview for CMS team
└── deployment-checklist.md       # Deployment procedures
```

---

## Contact & Support

**Project Owner:**
- Email: abelardogg.dev@gmail.com

**Business Contact:**
- Website: https://thearrowheadgroup.com
- Email: info@thearrowheadgroup.com
- Phone: (909) 915-9500
- License: DRE #01847350

---

## Document History

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0.0 | 2026-02-12 | Initial specification document | Claude Code |

---

**End of Specification**
