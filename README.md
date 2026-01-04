# Arrowhead Mortgage Website

Modern mortgage website built with Next.js 14, Tailwind CSS, and TypeScript.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Icons**: Lucide React
- **Deployment**: Vercel

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout with fonts & metadata
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles & Tailwind
├── components/
│   ├── layout/             # Header, Footer
│   ├── sections/           # Page sections (Hero, LoanPrograms, etc.)
│   └── ui/                 # Reusable UI components (Button, etc.)
├── lib/
│   ├── config.ts           # Site configuration & data
│   └── utils.ts            # Utility functions
├── types/
│   └── index.ts            # TypeScript type definitions
└── public/                 # Static assets
```

## Configuration

Edit `lib/config.ts` to update:
- Company information (name, NMLS, contact)
- Navigation structure
- Loan programs

## Customization

### Colors
Update `tailwind.config.ts` to change the color palette:
- `brand` - Primary blue colors
- `accent` - Orange CTA colors
- `neutral` - Gray scale

### Fonts
Fonts are configured in `app/layout.tsx`:
- Display font: Plus Jakarta Sans (headings)
- Body font: DM Sans (text)

## Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import project in Vercel
3. Deploy automatically

### Manual
```bash
npm run build
npm start
```

## Next Steps

- [ ] Add Contact page with form (Formspree/Basin)
- [ ] Add Mortgage Calculator component
- [ ] Add About page with team info
- [ ] Add individual Loan Program pages
- [ ] Add Testimonials section
- [ ] Set up Sanity CMS for content management
- [ ] Add Google Analytics / Tag Manager
- [ ] Configure structured data (JSON-LD)

## License

Private - All rights reserved
