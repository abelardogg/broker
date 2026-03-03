# Security Implementation

**Last Updated:** 2026-03-02

---

## 🔐 Security Features Implemented

### 1. Obscure Admin Path

The admin panel is **NOT** accessible at `/admin`. Instead, it uses an obscured path:

**Admin URL:** `/mgmt-c141f580`

**Critical:** Keep this URL private. Only share with authorized users.

### 2. SEO & Search Engine Protection

- **robots.txt:** Blocks all admin paths from search engines
- **Sitemap:** Admin routes excluded from sitemap.xml
- **No public links:** No references to admin panel in public-facing pages

### 3. Authentication & Authorization

- **Session-based auth** with HTTP-only cookies
- **Token-based sessions** with HMAC signing
- **24-hour token expiration**
- **bcrypt password hashing** (10 rounds)
- **Protected middleware:** Redirects unauthorized access

### 4. Rate Limiting

**Login Endpoint:**
- **5 attempts per 15 minutes** per IP address
- Returns HTTP 429 (Too Many Requests) when exceeded
- Automatic cleanup of old rate limit entries

**Protection against:**
- Brute force attacks
- Credential stuffing
- Automated bot attacks

### 5. Input Validation & Sanitization

**All API endpoints validate:**
- **Required fields:** Presence checks
- **Data types:** String, number, array validation
- **String lengths:** Maximum length enforcement
- **Numeric ranges:** Min/max value validation
- **Enum values:** Whitelist validation for status, propertyType, etc.
- **Array limits:** Maximum array size (20 images, 50 features)
- **XSS prevention:** Input trimming and length limits

**Example validations:**
```typescript
// Price: $0 - $100M
price >= 0 && price <= 100000000

// Beds/Baths: 0-20
beds >= 0 && beds <= 20

// Description: max 5000 characters
description.substring(0, 5000)

// State: 2 characters uppercase
state.substring(0, 2).toUpperCase()
```

### 6. File Upload Security

**Cloudflare R2 Upload Protection:**
- **Requires authentication:** Admin session token required
- **File type whitelist:** Only JPEG, PNG, WebP allowed
- **File size limit:** Maximum 10MB per file
- **Maximum files:** 20 images per property
- **Unique filenames:** nanoid(16) + timestamp prevents collisions
- **Presigned URLs:** 1-hour expiration, no direct bucket access
- **CORS configured:** Only authorized origins

**Validation chain:**
```
1. Check auth token
2. Validate file type (image/jpeg, image/png, image/webp)
3. Validate file size (1 byte - 10MB)
4. Generate unique key: properties/{timestamp}-{nanoid}.{ext}
5. Generate presigned URL (expires in 1 hour)
6. Upload happens client → R2 directly (no server proxy)
```

### 7. SQL Injection Prevention

- **Drizzle ORM:** Parameterized queries by default
- **No raw SQL:** All queries use ORM methods
- **Type-safe:** TypeScript enforces correct types

### 8. Environment Variable Protection

**Sensitive data in `.env.local`:**
- Never committed to git (in `.gitignore`)
- Loaded only on server-side
- Not exposed to client

**Critical variables:**
```env
SESSION_SECRET=<random-32-byte-hex>
R2_SECRET_ACCESS_KEY=<cloudflare-secret>
EMAIL_PASS=<gmail-app-password>
ADMIN_PASSWORD=<bcrypt-hashed-on-use>
```

---

## 🚫 Attack Vectors Mitigated

| Attack Type | Mitigation |
|-------------|------------|
| **Brute Force Login** | Rate limiting (5/15min) |
| **SQL Injection** | Drizzle ORM parameterized queries |
| **XSS (Cross-Site Scripting)** | Input sanitization, length limits |
| **CSRF** | HTTPOnly cookies, SameSite=Lax |
| **Path Traversal** | No file system access, R2 object storage |
| **Unauthorized Access** | Session tokens, middleware protection |
| **Search Engine Exposure** | robots.txt, obscured paths |
| **File Upload Abuse** | Type/size validation, rate limits |
| **Session Hijacking** | HTTPOnly cookies, secure in production |

---

## ⚠️ Security Checklist for Production

Before going live, ensure:

- [ ] **Change SESSION_SECRET** to random 32-byte hex:
  ```bash
  openssl rand -hex 32
  ```

- [ ] **Change ADMIN_PASSWORD** in .env.local, then:
  ```bash
  rm data/arrowhead.db
  npm run db:setup
  ```

- [ ] **Update Cloudflare R2 CORS** to only allow your domain:
  ```json
  {
    "AllowedOrigins": ["https://thearrowheadgroup.com"],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
    "AllowedHeaders": ["*"]
  }
  ```

- [ ] **Verify robots.txt** is deployed and blocking admin paths

- [ ] **Test rate limiting** by attempting 6 login failures

- [ ] **Remove development origins** from R2 CORS (localhost:3000)

- [ ] **Enable HTTPS** (already done via Let's Encrypt)

- [ ] **Backup database** regularly:
  ```bash
  cp data/arrowhead.db data/backup-$(date +%Y%m%d).db
  ```

---

## 🔧 Security Maintenance

### Regular Tasks

**Weekly:**
- Review PM2 logs for suspicious activity:
  ```bash
  pm2 logs arrowhead-realty --lines 500 | grep "401\|429\|500"
  ```

**Monthly:**
- Update npm dependencies:
  ```bash
  npm audit
  npm update
  ```

- Rotate SESSION_SECRET:
  1. Generate new secret
  2. Update .env.local
  3. Restart PM2 (logs out all users)

**Quarterly:**
- Review and update ADMIN_PASSWORD
- Audit database for suspicious entries
- Check R2 storage usage and costs

### Monitoring Recommendations

**Watch for:**
- Multiple 401 (Unauthorized) responses
- Multiple 429 (Rate Limit) responses
- Unusual R2 upload patterns
- Database file size growth
- Failed login attempts in logs

**Log Analysis:**
```bash
# Check for failed logins
pm2 logs arrowhead-realty | grep "Invalid credentials"

# Check for rate limit hits
pm2 logs arrowhead-realty | grep "Too many login attempts"

# Check for 500 errors
pm2 logs arrowhead-realty | grep "500"
```

---

## 📞 Incident Response

### If Admin Panel is Compromised:

1. **Immediately change SESSION_SECRET** in .env.local
2. **Restart PM2** to invalidate all sessions
3. **Change ADMIN_PASSWORD**
4. **Regenerate database** if needed
5. **Review R2 bucket** for unauthorized uploads
6. **Check database** for malicious entries
7. **Review server logs** for intrusion patterns

### If R2 Credentials are Exposed:

1. **Revoke compromised API token** in Cloudflare dashboard
2. **Generate new R2 API token**
3. **Update .env.local** with new credentials
4. **Review R2 bucket** for unauthorized files
5. **Check R2 usage** for unusual bandwidth
6. **Restart PM2** with new credentials

---

## 🛡️ Additional Recommendations

### Optional Security Enhancements

**For high-security needs:**

1. **Two-Factor Authentication (2FA)**
   - Implement TOTP (Google Authenticator)
   - Requires additional npm packages (speakeasy, qrcode)

2. **IP Whitelist**
   - Restrict admin access to specific IPs
   - Add check in middleware:
     ```typescript
     const allowedIPs = ['your-ip-here']
     if (!allowedIPs.includes(ip)) return 401
     ```

3. **Audit Logging**
   - Log all admin actions to database
   - Track: user, action, timestamp, IP
   - Helps with forensics if breach occurs

4. **Content Security Policy (CSP)**
   - Add CSP headers to prevent XSS
   - Configure in next.config.mjs

5. **Database Encryption**
   - Encrypt SQLite database at rest
   - Use SQLCipher or similar

---

## 📚 Security Resources

**Learn More:**
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Next.js Security Best Practices](https://nextjs.org/docs/app/building-your-application/configuring/security)
- [Cloudflare R2 Security](https://developers.cloudflare.com/r2/security/)

**Tools:**
- `npm audit` - Check for vulnerable dependencies
- `openssl` - Generate random secrets
- `pm2 logs` - Monitor application logs

---

**Document Version:** 1.0.0
**Last Security Audit:** 2026-03-02
**Next Audit Due:** 2026-06-02
