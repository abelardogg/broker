# Arrowhead Realty Group

Modern real estate website built with Next.js 14, Tailwind CSS, and TypeScript.

**Live Site:** https://thearrowheadgroup.com

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Icons**: Lucide React
- **Email**: Nodemailer (Gmail SMTP)
- **Database**: SQLite with Drizzle ORM
- **Image Storage**: Cloudflare R2 (FREE 10GB)
- **Deployment**: Digital Ocean Droplet with PM2 & Nginx
- **Analytics**: Google Analytics (G-WNMTKLDNRY) & Google Tag Manager (GTM-KFZSRT8G)

## Key Features

- **SEO optimized** with canonical links, Open Graph, and structured data (JSON-LD)
- **Dynamic sitemap** generation for Google Search Console
- **Responsive design** with Tailwind CSS
- **Contact form** with email notifications
- **Admin Panel** with SQLite CMS for managing properties and loan programs
- **Property listings** with modal gallery
- **Image uploads** to Cloudflare R2 storage
- **Mortgage calculator**
- **Google Tag Manager** page view tracking

📋 **For complete technical specification, see [SPEC.md](./SPEC.md)**

## Getting Started (Local Development)

```bash
# Install dependencies
npm install

# Setup database (first time only)
npm run db:setup

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Admin Panel

Access the admin panel at `/admin/login` to manage:
- Properties (create, edit, delete)
- Loan Programs
- Upload images to Cloudflare R2

**Default credentials:**
- Username: `admin`
- Password: `admin123`

⚠️ **Change these in production!**

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout with fonts & metadata
│   ├── page.tsx            # Home page
│   ├── about/              # About page
│   ├── contact/            # Contact page with form
│   ├── properties/         # Property listings
│   ├── api/contact/        # Contact form API endpoint
│   └── globals.css         # Global styles & Tailwind
├── components/
│   ├── layout/             # Header, Footer
│   ├── sections/           # Page sections (Hero, FeaturedListings, etc.)
│   └── ui/                 # Reusable UI components (Button, PropertyCard, etc.)
├── lib/
│   ├── config.ts           # Site configuration & data
│   └── utils.ts            # Utility functions
├── types/
│   └── index.ts            # TypeScript type definitions
└── public/                 # Static assets (images, logos)
```

## Environment Variables

Create a `.env.local` file in the root directory:

```env
# Email Configuration (for contact form)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
EMAIL_TO=recipient@example.com

# Database
DATABASE_PATH=./data/arrowhead.db

# Security (CHANGE IN PRODUCTION!)
SESSION_SECRET=change-this-to-a-random-secret-in-production

# Admin credentials (used for initial seed)
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
ADMIN_EMAIL=your-email@example.com

# Cloudflare R2 Storage
R2_ACCOUNT_ID=your-cloudflare-account-id
R2_ACCESS_KEY_ID=your-r2-access-key-id
R2_SECRET_ACCESS_KEY=your-r2-secret-access-key
R2_BUCKET_NAME=your-bucket-name
R2_PUBLIC_URL=https://your-bucket-url.r2.dev
```

**Note:** Never commit `.env.local` to git (already in `.gitignore`)

---

# Deployment Guide - Digital Ocean

## Current Production Setup

- **Domain:** thearrowheadgroup.com
- **Server:** Digital Ocean Droplet
- **SSH User:** dev
- **App Directory:** /var/www/arrowhead-realty/broker
- **Status:** ✅ Live with HTTPS

---

## Initial Setup (One-time only)

### 1. Create Non-Root User

```bash
# Connect as root
ssh root@your-droplet-ip

# Create user 'dev'
adduser dev
usermod -aG sudo dev
usermod -aG www-data dev

# Setup SSH keys
mkdir -p /home/dev
chown dev:dev /home/dev
mkdir -p /home/dev/.ssh
cp /root/.ssh/authorized_keys /home/dev/.ssh/
chown -R dev:dev /home/dev/.ssh
chmod 700 /home/dev/.ssh
chmod 600 /home/dev/.ssh/authorized_keys

# Test connection
ssh dev@your-droplet-ip
```

### 2. Install Node.js 20 & PM2

```bash
# As user 'dev'
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
sudo apt-get install -y nodejs

# Verify
node --version  # Should show v20.x
npm --version

# Install PM2
sudo npm install -g pm2
```

### 3. Create Swap (CRITICAL for low-RAM droplets)

**Problem:** npm install and build fail with "Killed" or "Bus error"
**Solution:** Create 2-4GB swap file

```bash
# Create 2GB swap
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile

# Make permanent (survives reboots)
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab

# Verify
swapon --show
free -h
```

### 4. Clone Repository

```bash
# Create directory
sudo mkdir -p /var/www/arrowhead-realty
sudo chown -R dev:www-data /var/www/arrowhead-realty

# Clone repo
cd /var/www/arrowhead-realty
git clone https://github.com/your-username/your-repo.git broker
cd broker
```

### 5. Install Dependencies

```bash
cd /var/www/arrowhead-realty/broker
npm install
```

### 6. Configure Environment Variables

```bash
nano /var/www/arrowhead-realty/broker/.env.local
```

Add (replace with your actual values):
```env
# Email Configuration
EMAIL_USER=arrowheadrealty.contact@gmail.com
EMAIL_PASS=your-gmail-app-password
EMAIL_TO=abelardogg.dev@gmail.com

# Database
DATABASE_PATH=./data/arrowhead.db

# Security - GENERATE NEW SECRET!
# Generate with: openssl rand -base64 32
SESSION_SECRET=CHANGE-THIS-TO-RANDOM-SECRET-IN-PRODUCTION

# Admin credentials (change password!)
ADMIN_USERNAME=admin
ADMIN_PASSWORD=CHANGE-THIS-PASSWORD
ADMIN_EMAIL=your-email@example.com

# Cloudflare R2 Storage
R2_ACCOUNT_ID=98790d4f49ee22e1f1c64c0427ee77cf
R2_ACCESS_KEY_ID=your-access-key-id
R2_SECRET_ACCESS_KEY=your-secret-access-key
R2_BUCKET_NAME=arrowhead
R2_PUBLIC_URL=https://pub-xxxxxxxx.r2.dev
```

Save with `Ctrl+O`, Enter, `Ctrl+X`

**IMPORTANT:** Generate a random SESSION_SECRET:
```bash
openssl rand -base64 32
```

### 7. Build Application

**CRITICAL:** Server has low RAM (~469MB) - build fails with "Bus error"
**SOLUTION:** Build locally and upload via SCP

#### On your local machine (Windows):
```bash
npm run build
```

#### Upload build to server:
```powershell
# From PowerShell in project folder
scp -r .next dev@your-droplet-ip:/var/www/arrowhead-realty/broker/

# Also ensure .env.local is on server
scp .env.local dev@your-droplet-ip:/var/www/arrowhead-realty/broker/
```

### 8. Setup Database (First Time Only)

```bash
cd /var/www/arrowhead-realty/broker

# Create data directory
mkdir -p data

# Run database setup (creates tables and seeds initial data)
npm run db:setup
```

This will:
- Create `data/arrowhead.db` SQLite database
- Create tables for properties, loan programs, and admin users
- Seed initial data

### 9. Setup PM2 (Process Manager)

```bash
# On the server
cd /var/www/arrowhead-realty/broker

# Start app with PM2
pm2 start npm --name "arrowhead-realty" -- start

# Configure auto-start on reboot
pm2 startup
# Execute the command PM2 suggests (with sudo)

# Save PM2 configuration
pm2 save

# Verify
pm2 status
pm2 logs arrowhead-realty
```

### 10. Configure Nginx

```bash
# Create Nginx config
sudo nano /etc/nginx/sites-available/arrowhead-realty
```

Paste this configuration:
```nginx
server {
    listen 80;
    server_name thearrowheadgroup.com www.thearrowheadgroup.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/arrowhead-realty /etc/nginx/sites-enabled/

# Remove default site
sudo rm /etc/nginx/sites-enabled/default

# Test configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

### 11. Setup SSL (Let's Encrypt)

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d thearrowheadgroup.com -d www.thearrowheadgroup.com

# Follow prompts:
# - Enter your email
# - Accept terms (Y)
# - Certbot will auto-configure HTTPS

# Verify auto-renewal
sudo certbot renew --dry-run
```

### 12. Configure Firewall (Optional)

```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
sudo ufw status
```

---

## Regular Updates (When you make changes)

### Full Update (Code + Build)

**1. On local machine:**
```bash
# Make your code changes
# Commit to git
git add .
git commit -m "description"
git push

# Build locally
npm run build
```

**2. Upload build to server:**
```powershell
# From PowerShell
scp -r .next dev@your-droplet-ip:/var/www/arrowhead-realty/broker/
```

**3. On server:**
```bash
# SSH to server
ssh dev@your-droplet-ip

# Update code
cd /var/www/arrowhead-realty/broker
git pull

# Reinstall dependencies (only if package.json changed)
npm install

# Restart app
pm2 restart arrowhead-realty

# Check logs
pm2 logs arrowhead-realty --lines 50
```

### Quick Update (Code only, no rebuild needed)

```bash
ssh dev@your-droplet-ip
cd /var/www/arrowhead-realty/broker
git pull
pm2 restart arrowhead-realty
```

### Update Environment Variables

```bash
ssh dev@your-droplet-ip
cd /var/www/arrowhead-realty/broker
nano .env.local
# Make changes, save
pm2 restart arrowhead-realty
```

---

## Useful Commands

### PM2
```bash
pm2 status                    # View all apps
pm2 logs arrowhead-realty     # Live logs
pm2 logs arrowhead-realty --lines 100  # Last 100 lines
pm2 restart arrowhead-realty  # Restart app
pm2 stop arrowhead-realty     # Stop app
pm2 start arrowhead-realty    # Start app
pm2 delete arrowhead-realty   # Remove from PM2
pm2 monit                     # Resource monitor
pm2 save                      # Save current config
```

### Nginx
```bash
sudo systemctl status nginx         # Check status
sudo systemctl restart nginx        # Restart
sudo systemctl reload nginx         # Reload config
sudo nginx -t                       # Test config
tail -f /var/log/nginx/access.log  # Access logs
tail -f /var/log/nginx/error.log   # Error logs
```

### SSL/Certbot
```bash
sudo certbot certificates      # View certificates
sudo certbot renew            # Manual renewal
sudo certbot renew --dry-run  # Test renewal
```

### System
```bash
swapon --show    # View active swap
free -h          # Memory usage
df -h            # Disk usage
```

---

## Troubleshooting

### Error: "502 Bad Gateway"
**Cause:** App not running

```bash
pm2 status
pm2 logs arrowhead-realty
pm2 restart arrowhead-realty
```

### Error: npm install fails with "Killed"
**Cause:** Out of memory

```bash
# Check swap
swapon --show

# If no swap, create it (see section 3)
# If swap exists but too small:
sudo swapoff /swapfile
sudo fallocate -l 4G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
```

### Error: npm build fails with "Bus error (core dumped)"
**Cause:** Server has < 512MB RAM

**Solution:** Build locally and upload via SCP (see section 7)

### Contact form not sending emails
1. Check environment variables:
```bash
cat /var/www/arrowhead-realty/broker/.env.local
```

2. Verify Gmail App Password is correct
3. Check logs:
```bash
pm2 logs arrowhead-realty
```

### SSL not working or expired
```bash
sudo certbot certificates
sudo certbot renew
sudo tail -f /var/log/letsencrypt/letsencrypt.log
```

### Code changes not reflecting
```bash
# Ensure you:
# 1. Built locally (npm run build)
# 2. Uploaded .next via SCP
# 3. Restarted PM2

pm2 restart arrowhead-realty

# Or clear PM2 cache
pm2 delete arrowhead-realty
pm2 start npm --name "arrowhead-realty" -- start
pm2 save
```

---

## Important Notes

### Files NOT to commit
Already in `.gitignore`:
- `.env.local` - Environment variables with secrets
- `.next/` - Next.js build output
- `node_modules/` - Dependencies
- `.claude/` - Development files

### Recommended Workflow

1. **Develop locally**
   - Make changes
   - Test with `npm run dev`

2. **Build locally**
   - `npm run build`
   - Verify no errors

3. **Commit changes**
   ```bash
   git add .
   git commit -m "description"
   git push
   ```

4. **Deploy to production**
   - Upload: `scp -r .next dev@droplet-ip:/var/www/arrowhead-realty/broker/`
   - SSH to server
   - `git pull`
   - `pm2 restart arrowhead-realty`

### Recommended Backups

Backup these periodically:
- `/var/www/arrowhead-realty/broker/.env.local` - Environment variables
- `/var/www/arrowhead-realty/broker/data/arrowhead.db` - **CRITICAL: Database file**
- `/etc/nginx/sites-available/arrowhead-realty` - Nginx config
- SSL certificates auto-renew (no backup needed)

**Database Backup Script:**
```bash
# On server
cd /var/www/arrowhead-realty/broker
cp data/arrowhead.db data/arrowhead.db.backup-$(date +%Y%m%d)

# Download to local machine
scp dev@your-droplet-ip:/var/www/arrowhead-realty/broker/data/arrowhead.db ./arrowhead-backup.db
```

---

## Server Information

- **IP:** (Set in Digital Ocean)
- **Domain:** thearrowheadgroup.com
- **SSH User:** dev
- **SSH Port:** 22 (default)
- **App Directory:** /var/www/arrowhead-realty/broker

---

## License

Private - All rights reserved

---

## SEO & Metadata

### Implemented
- ✅ Canonical links on all pages
- ✅ Per-page metadata with Open Graph tags
- ✅ JSON-LD structured data (RealEstateAgent, LocalBusiness, Website)
- ✅ Dynamic sitemap at `/sitemap.xml`
- ✅ Google Tag Manager integration with page view tracking
- ✅ Google Analytics 4 integration
- ✅ Robots.txt configuration

### Target Keywords
- houses for sale California
- homes for sale San Bernardino
- real estate agent California
- buy a house California
- sell your house California
- first time home buyer
- mortgage options California
- property for sale Inland Empire

### Testing Tools
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Google Search Console](https://search.google.com/search-console)
- [PageSpeed Insights](https://pagespeed.web.dev/)

---

## Known Issues

### Critical: Build Process on Server

The server has limited RAM (469MB) which causes `npm run build` to fail with "Bus error (core dumped)".

**Current workaround:** Build locally and upload via SCP (see deployment steps above).

**Potential solutions documented in [SPEC.md](./SPEC.md#known-issues--challenges):**
1. Static Export (`output: 'export'`) - **Recommended**
2. Upgrade to larger droplet ($6/month with 1GB RAM)
3. Use GitHub Actions for CI/CD builds
4. Migrate to Vercel free tier

---

## Additional Documentation

- **[SPEC.md](./SPEC.md)** - Complete technical specification and architecture
- **[deployment-checklist.md](./deployment-checklist.md)** - Deployment procedures

---

**Last Updated:** 2026-02-12
**Version:** 1.0.0 Production
