# The Arrowhead Group - Technical Specification

**Version:** 2.0.0
**Last Updated:** 2026-03-02
**Project Status:** Production (Fully Deployed with CMS)

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
| `/mgmt-c141f580` | Server | **OBSCURED** Admin dashboard with statistics | ✅ Live |
| `/mgmt-c141f580/login` | Server | **OBSCURED** Admin authentication | ✅ Live |
| `/mgmt-c141f580/properties` | Server | **OBSCURED** Property CRUD management | ✅ Live |
| `/mgmt-c141f580/properties/new` | Server | **OBSCURED** Add new property | ✅ Live |
| `/mgmt-c141f580/properties/[id]/edit` | Server | **OBSCURED** Edit property | ✅ Live |
| `/mgmt-c141f580/loan-programs` | Server | **OBSCURED** Loan program management | ✅ Live |
| `/api/mgmt-c141f580/*` | API | **OBSCURED** Admin CRUD endpoints | ✅ Live |
| `/api/mgmt-c141f580/upload/*` | API | **OBSCURED** R2 image upload/delete | ✅ Live |

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

## Security Implementation

### Admin Panel Security

**Obscured Access Path:**
- Admin panel is NOT accessible at `/admin`
- Uses obscured path: `/mgmt-c141f580`
- Path stored in private `.admin-url` file (gitignored)
- All admin routes use this obscured path consistently

**Authentication & Authorization:**
- Session-based authentication with HTTP-only cookies
- HMAC-signed tokens (24-hour expiration)
- bcrypt password hashing (10 rounds)
- Middleware protection on all admin routes
- Automatic redirect to login for unauthorized access

**Rate Limiting:**
- Login endpoint: 5 attempts per 15 minutes per IP
- Returns HTTP 429 (Too Many Requests) when exceeded
- Automatic cleanup of old rate limit entries
- Protects against brute force attacks

**Input Validation & Sanitization:**
All API endpoints validate:
- Required fields presence
- Data types (string, number, array)
- String lengths (max limits enforced)
- Numeric ranges (min/max values)
- Enum values (whitelist validation)
- Array limits (max 20 images, 50 features)

**Example Validations:**
```typescript
// Price: $0 - $100M
price >= 0 && price <= 100000000

// Beds/Baths: 0-20
beds >= 0 && beds <= 20

// Description: max 5000 characters
description.substring(0, 5000)
```

**File Upload Security (Cloudflare R2):**
- Requires authentication (admin session token)
- File type whitelist: JPEG, PNG, WebP only
- File size limit: 10MB maximum
- Maximum 20 images per property
- Unique filenames: `nanoid(16) + timestamp`
- Presigned URLs: 1-hour expiration
- CORS configured for authorized origins only

**SEO & Search Engine Protection:**
- robots.txt blocks all admin paths
- Sitemap excludes admin routes
- No public links to admin panel
- Middleware blocks old `/admin` path

**Database Security:**
- Drizzle ORM with parameterized queries
- No raw SQL execution
- Type-safe queries via TypeScript
- SQLite database file-based (./data/arrowhead.db)

**Environment Variable Protection:**
- Sensitive data in `.env.local` (gitignored)
- Never committed to repository
- Loaded only on server-side
- Not exposed to client

**Critical Variables:**
```env
SESSION_SECRET=<random-32-byte-hex>
R2_SECRET_ACCESS_KEY=<cloudflare-secret>
EMAIL_PASS=<gmail-app-password>
ADMIN_PASSWORD=<bcrypt-hashed-on-use>
```

**Attack Vectors Mitigated:**

| Attack Type | Mitigation |
|-------------|------------|
| Brute Force Login | Rate limiting (5/15min) |
| SQL Injection | Drizzle ORM parameterized queries |
| XSS (Cross-Site Scripting) | Input sanitization, length limits |
| CSRF | HTTPOnly cookies, SameSite=Lax |
| Path Traversal | No file system access, R2 object storage |
| Unauthorized Access | Session tokens, middleware protection |
| Search Engine Exposure | robots.txt, obscured paths |
| File Upload Abuse | Type/size validation, authentication |
| Session Hijacking | HTTPOnly cookies, secure in production |

**Security Maintenance:**

For detailed security documentation, see [SECURITY.md](./SECURITY.md)

**Incident Response:**
- Change SESSION_SECRET and restart PM2
- Change ADMIN_PASSWORD and regenerate database
- Review R2 bucket for unauthorized uploads
- Check PM2 logs for suspicious activity

---

## Known Issues & Challenges

### Critical Issues

#### 1. Build Process Failure on Server
**Problem:**
- `npm run build` crashes with "Bus error (core dumped)"
- Server has only 469MB RAM, insufficient for Next.js build

**Current Solution (✅ IMPLEMENTED):**
```bash
# 1. Build locally on Windows
npm run build

# 2. Commit .next to git (temporarily uncommented in .gitignore)
git add .
git commit -m "Production build"
git push

# 3. Update on server
ssh dev@server
cd /var/www/arrowhead-realty/broker
git pull
pm2 restart arrowhead-realty
```

**Note:** `.next/` is temporarily uncommented in `.gitignore` to allow committing the build. This is necessary because the server cannot build due to RAM constraints.

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

### Phase 2: Content Management System (✅ COMPLETED - 2026-03-02)
- [x] SQLite database with Drizzle ORM
- [x] Admin panel with bcrypt authentication
- [x] Property CRUD operations
- [x] Loan program management
- [x] Cloudflare R2 image storage integration
- [x] User-friendly forms (comma-separated values)
- [x] **Security hardening:** Obscured admin path (`/mgmt-c141f580`)
- [x] **Rate limiting:** 5 login attempts per 15 minutes
- [x] **Input sanitization:** All forms validated and sanitized
- [x] **Session security:** HTTP-only cookies with HMAC signing
- [x] **robots.txt:** Admin routes blocked from search engines
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
# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
EMAIL_TO=recipient@example.com

# Database
DATABASE_PATH=./data/arrowhead.db

# Security (CRITICAL - Change in production!)
SESSION_SECRET=<generate-with-openssl-rand-hex-32>

# Admin Credentials (used for database seed)
ADMIN_USERNAME=your-custom-username
ADMIN_PASSWORD=your-strong-password
ADMIN_EMAIL=your-email@example.com

# Cloudflare R2 Storage
R2_ACCOUNT_ID=your-cloudflare-account-id
R2_ACCESS_KEY_ID=your-r2-access-key-id
R2_SECRET_ACCESS_KEY=your-r2-secret-access-key
R2_BUCKET_NAME=your-bucket-name
R2_PUBLIC_URL=https://your-bucket-url.r2.dev
```

**Security Notes:**
- Generate SESSION_SECRET with: `openssl rand -hex 32`
- Use a strong ADMIN_PASSWORD (12+ characters, mixed case, numbers, symbols)
- Never commit `.env.local` to git
- Admin URL is stored in `.admin-url` file (also gitignored)

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

### Current Deployment (✅ ACTIVE)

**Prerequisites:**
- SSH access to DigitalOcean droplet
- Git repository access
- Local development environment with 8GB+ RAM

**Deployment Steps:**
```bash
# 1. LOCAL: Make changes and commit
git add .
git commit -m "Description of changes"
git push

# 2. LOCAL: Build project
npm run build
# Note: Build includes .next in git (/.next/ commented in .gitignore)

# 3. LOCAL: Commit build
git add .next
git commit -m "Production build"
git push

# 4. SERVER: Update and restart
ssh dev@thearrowhead
cd /var/www/arrowhead-realty/broker
git pull
pm2 restart arrowhead-realty

# 5. SERVER: Check logs
pm2 logs arrowhead-realty --lines 50

# 6. VERIFY: Test website
# Visit https://thearrowheadgroup.com
# Visit https://thearrowheadgroup.com/mgmt-c141f580/login
```

**Important Notes:**
- `.next/` must be uncommented in `.gitignore` to commit builds
- Server cannot build due to RAM constraints (469MB)
- Database file (`data/arrowhead.db`) is gitignored
- Admin credentials are in `.env.local` on server

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
│   ├── admin/
│   │   ├── AdminNav.tsx          # Admin panel navigation
│   │   ├── PropertyForm.tsx      # Property CRUD form
│   │   ├── ImageUploader.tsx     # R2 image uploader
│   │   └── DeletePropertyButton.tsx
│   ├── analytics/
│   │   └── PageView.tsx          # GTM page view tracking
│   └── seo/
│       └── StructuredData.tsx    # JSON-LD schemas
│
├── lib/
│   ├── config.ts                 # Site configuration, sample data
│   ├── utils.ts                  # Utility functions
│   ├── db/
│   │   ├── index.ts              # Drizzle ORM setup, schema
│   │   ├── migrate.ts            # Database migration runner
│   │   └── seed.ts               # Database seeding script
│   ├── auth.ts                   # Session token management
│   ├── admin-auth.ts             # Admin authentication middleware
│   └── rate-limit.ts             # Rate limiting implementation
│
├── types/
│   └── index.ts                  # TypeScript type definitions
│
├── public/
│   └── img/                      # Static images, logos
│
├── data/
│   └── arrowhead.db              # SQLite database (gitignored)
│
├── .env.local                    # Environment variables (gitignored)
├── .admin-url                    # Admin URL reference (gitignored)
├── .gitignore
├── next.config.mjs               # Next.js configuration
├── tailwind.config.ts            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
├── drizzle.config.ts             # Drizzle ORM configuration
├── package.json
├── README.md                     # User documentation
├── SPEC.md                       # This file - technical specification
├── SECURITY.md                   # Security documentation
└── PROJECT_OVERVIEW.md           # Project overview for CMS team
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
| 2.0.0 | 2026-03-02 | Added CMS, security implementation, deployment updates | Claude Code |

---

**End of Specification**
