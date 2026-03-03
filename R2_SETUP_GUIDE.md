# Cloudflare R2 Object Storage Integration Guide

This guide will help you set up Cloudflare R2 object storage for image uploads in your Next.js real estate website.

## Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Cloudflare R2 Setup](#cloudflare-r2-setup)
4. [Environment Configuration](#environment-configuration)
5. [Usage Guide](#usage-guide)
6. [API Routes](#api-routes)
7. [Components](#components)
8. [Troubleshooting](#troubleshooting)

---

## Overview

The R2 integration provides:
- **Secure uploads** using presigned URLs
- **Image management** with upload, preview, and delete functionality
- **Drag & drop** file uploads
- **Progress indicators** for uploads
- **File validation** (type, size)
- **User-friendly interface** - no JSON syntax required

### Architecture

```
┌─────────────┐      ┌──────────────┐      ┌──────────────┐
│  Admin UI   │─────>│  Next.js API │─────>│ Cloudflare R2│
│ImageUploader│      │   /presigned │      │   (Storage)  │
└─────────────┘      └──────────────┘      └──────────────┘
       │                     │
       │                     ▼
       │              ┌──────────────┐
       └─────────────>│   Direct     │
              PUT     │   Upload     │
                      └──────────────┘
```

---

## Prerequisites

Before setting up R2, ensure you have:

1. **Cloudflare Account** - Sign up at [cloudflare.com](https://cloudflare.com)
2. **R2 Access** - Enable R2 in your Cloudflare dashboard
3. **Node.js** - Version 18+ recommended
4. **Dependencies Installed** - Already done via npm install

### Installed Packages

```json
{
  "@aws-sdk/client-s3": "^3.x",
  "@aws-sdk/s3-request-presigner": "^3.x",
  "nanoid": "^5.x"
}
```

---

## Cloudflare R2 Setup

### Step 1: Create an R2 Bucket

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to **R2** in the sidebar
3. Click **Create bucket**
4. Choose a bucket name (e.g., `arrowhead-properties`)
5. Select a location (optional)
6. Click **Create bucket**

### Step 2: Generate R2 API Tokens

1. In the R2 dashboard, click **Manage R2 API Tokens**
2. Click **Create API token**
3. Configure the token:
   - **Token name**: `arrowhead-website-upload`
   - **Permissions**: Object Read & Write
   - **Specify bucket** (recommended): Select your bucket
   - **TTL**: Never expire (or set expiration as needed)
4. Click **Create API Token**
5. **IMPORTANT**: Save these credentials immediately (they won't be shown again):
   - Access Key ID
   - Secret Access Key
   - Account ID (shown in dashboard)

### Step 3: Configure Public Access (Optional)

For public image access:

1. In your bucket settings, click **Settings**
2. Under **Public Access**, click **Allow Access**
3. Note your **Public Bucket URL** (e.g., `https://bucket-name.account-id.r2.dev`)

**OR** use a custom domain:

1. Click **Connect Domain**
2. Enter your domain (e.g., `cdn.arrowheadrealty.com`)
3. Follow DNS setup instructions
4. Wait for DNS propagation

---

## Environment Configuration

### Step 4: Update .env.local

Add your R2 credentials to `.env.local`:

```bash
# Cloudflare R2 Storage Configuration
R2_ACCOUNT_ID=98790d4f49ee22e1f1c64c0427ee77cf
R2_ACCESS_KEY_ID=your-access-key-id-here
R2_SECRET_ACCESS_KEY=your-secret-access-key-here
R2_BUCKET_NAME=arrowhead-properties
R2_PUBLIC_URL=https://arrowhead-properties.98790d4f49ee22e1f1c64c0427ee77cf.r2.dev
```

**Finding your values:**

| Variable | Where to find |
|----------|---------------|
| `R2_ACCOUNT_ID` | Cloudflare Dashboard → R2 → Overview |
| `R2_ACCESS_KEY_ID` | From API token creation (Step 2) |
| `R2_SECRET_ACCESS_KEY` | From API token creation (Step 2) |
| `R2_BUCKET_NAME` | Your bucket name from Step 1 |
| `R2_PUBLIC_URL` | Bucket Settings → Public Access URL |

### Step 5: Update next.config.js (if using custom domain)

If you're using a custom domain for R2:

```javascript
images: {
  remotePatterns: [
    // ... existing patterns
    {
      protocol: 'https',
      hostname: 'cdn.arrowheadrealty.com', // Your custom domain
    },
  ],
}
```

The config already includes patterns for:
- `**.r2.dev`
- `**.r2.cloudflarestorage.com`
- `**.cloudfront.net`

---

## Usage Guide

### Using the ImageUploader Component

The `ImageUploader` component is designed to be simple and user-friendly.

#### Basic Usage

```tsx
import ImageUploader from '@/components/admin/ImageUploader'

function PropertyForm() {
  const [images, setImages] = useState('')

  return (
    <form>
      {/* Other form fields */}

      <ImageUploader
        value={images}
        onChange={setImages}
        maxImages={10}
        label="Property Images"
      />

      {/* Submit button */}
    </form>
  )
}
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | `''` | Comma-separated image URLs |
| `onChange` | `(value: string) => void` | required | Callback with updated URLs |
| `maxImages` | `number` | `10` | Maximum number of images |
| `label` | `string` | `'Images'` | Label for the uploader |

#### What the user sees

1. **Upload Area**: Drag & drop zone or click to select files
2. **Progress Indicators**: Real-time upload progress
3. **Image Thumbnails**: Grid of uploaded images with delete buttons
4. **Main Image Indicator**: First image is marked as "Main Image"

#### Output Format

The component returns a **comma-separated string** of URLs:

```
"https://bucket.r2.dev/properties/123-abc.jpg, https://bucket.r2.dev/properties/456-def.jpg"
```

**NOT** JSON - this is intentional for user-friendliness!

#### Converting to Array (if needed)

```typescript
const imageArray = images
  .split(',')
  .map(url => url.trim())
  .filter(Boolean)

// Result: ['https://...', 'https://...']
```

---

## API Routes

### POST /api/admin/upload/presigned-url

Generates a presigned URL for uploading files to R2.

**Authentication**: Required (admin session token)

**Request Body:**

```json
{
  "fileName": "house-photo.jpg",
  "fileType": "image/jpeg",
  "fileSize": 2048576
}
```

**Response:**

```json
{
  "presignedUrl": "https://...s3.cloudflarestorage.com/...",
  "publicUrl": "https://bucket.r2.dev/properties/123-abc.jpg",
  "key": "properties/123-abc.jpg"
}
```

**Validation:**

- File type: JPEG, PNG, WebP only
- File size: 1 byte - 10MB
- Authentication required

**Error Responses:**

```json
// Unauthorized
{ "error": "Unauthorized" } // 401

// Invalid file type
{ "error": "Invalid file type. Only JPEG, PNG, and WebP images are allowed." } // 400

// File too large
{ "error": "File size must be between 1 byte and 10MB" } // 400
```

---

### POST /api/admin/upload/delete

Deletes an image from R2 storage.

**Authentication**: Required (admin session token)

**Request Body:**

```json
{
  "url": "https://bucket.r2.dev/properties/123-abc.jpg"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Image deleted successfully"
}
```

**Error Responses:**

```json
// Unauthorized
{ "error": "Unauthorized" } // 401

// Invalid URL
{ "error": "Invalid URL format" } // 400

// Delete failed
{ "error": "Failed to delete image" } // 500
```

---

## Components

### ImageUploader Component

Location: `components/admin/ImageUploader.tsx`

**Features:**

✅ Multi-file upload support
✅ Drag & drop interface
✅ Upload progress indicators
✅ Image preview thumbnails
✅ Delete functionality
✅ File validation (type & size)
✅ Main image indicator
✅ Maximum image limit
✅ Comma-separated URL output

**File Validation:**

- **Allowed types**: `image/jpeg`, `image/png`, `image/webp`
- **Max size**: 10MB per file
- **Max images**: Configurable (default: 10)

**User Experience:**

1. User drags images or clicks to select
2. Component validates files
3. Shows upload progress for each file
4. Automatically uploads to R2
5. Displays thumbnails with delete buttons
6. First image is marked as main image

---

## Troubleshooting

### Common Issues

#### 1. "Unauthorized" errors

**Problem**: API returns 401 Unauthorized

**Solutions:**
- Verify you're logged in to the admin panel
- Check if session cookie exists
- Try logging out and back in
- Verify `SESSION_SECRET` in `.env.local`

#### 2. "Invalid file type" errors

**Problem**: Upload rejects valid image files

**Solutions:**
- Ensure file extension matches MIME type
- Only use JPEG, PNG, or WebP
- Check file isn't corrupted
- Try converting to a supported format

#### 3. "Missing required R2 environment variables"

**Problem**: Server error when trying to upload

**Solutions:**
- Verify all R2 variables are in `.env.local`:
  - `R2_ACCOUNT_ID`
  - `R2_ACCESS_KEY_ID`
  - `R2_SECRET_ACCESS_KEY`
  - `R2_BUCKET_NAME`
  - `R2_PUBLIC_URL`
- Restart development server after updating `.env.local`

#### 4. Upload succeeds but image doesn't display

**Problem**: Upload completes but thumbnail shows broken image

**Solutions:**
- Check if bucket has public access enabled
- Verify `R2_PUBLIC_URL` is correct
- Add bucket domain to `next.config.js` image patterns
- Check browser console for CORS errors
- Verify image URL is accessible in browser

#### 5. "Failed to upload file" after presigned URL

**Problem**: Presigned URL generation works but actual upload fails

**Solutions:**
- Check R2 API token has Write permissions
- Verify token hasn't expired
- Check bucket name is correct
- Try regenerating API token with full permissions
- Check Cloudflare R2 service status

#### 6. Images upload but delete doesn't work

**Problem**: Can upload images but delete button fails

**Solutions:**
- Verify R2 API token has Delete permissions
- Check URL extraction logic in delete route
- Ensure URL format matches expected pattern
- Check Cloudflare R2 dashboard for errors

### Debug Mode

To enable debug logging:

```typescript
// In lib/r2-client.ts, add console logs
export function getR2Client(): S3Client {
  console.log('R2 Config:', {
    accountId: process.env.R2_ACCOUNT_ID,
    bucket: process.env.R2_BUCKET_NAME,
    publicUrl: process.env.R2_PUBLIC_URL,
  })
  // ... rest of code
}
```

### Testing the Integration

1. **Test presigned URL generation:**
   ```bash
   curl -X POST http://localhost:3000/api/admin/upload/presigned-url \
     -H "Content-Type: application/json" \
     -H "Cookie: admin_session=YOUR_TOKEN" \
     -d '{"fileName":"test.jpg","fileType":"image/jpeg","fileSize":1000}'
   ```

2. **Test file upload:**
   - Use the ImageUploader component in admin panel
   - Upload a small test image
   - Verify it appears in Cloudflare R2 dashboard
   - Check thumbnail displays correctly

3. **Test delete:**
   - Click X button on uploaded image
   - Confirm deletion dialog
   - Verify image removed from UI and R2 dashboard

### Getting Help

If you're still experiencing issues:

1. Check browser console for JavaScript errors
2. Check server logs for API errors
3. Verify all environment variables are set correctly
4. Test R2 credentials using Cloudflare dashboard
5. Check Cloudflare R2 service status page

---

## Security Best Practices

1. **Never commit credentials** to version control
2. **Use environment variables** for all sensitive data
3. **Restrict API token permissions** to only what's needed
4. **Set token expiration** if possible
5. **Implement authentication** on all upload routes (already done)
6. **Validate file types** server-side (already done)
7. **Limit file sizes** to prevent abuse (already done)
8. **Monitor R2 usage** in Cloudflare dashboard
9. **Enable logging** for audit trails
10. **Use HTTPS only** for all uploads

---

## Cost Considerations

Cloudflare R2 pricing (as of 2024):

- **Storage**: $0.015/GB/month
- **Class A Operations** (write/list): $4.50/million requests
- **Class B Operations** (read): $0.36/million requests
- **Egress**: FREE (no bandwidth charges)

**Estimated costs for a real estate site:**

| Usage Level | Storage | Operations | Est. Monthly Cost |
|-------------|---------|------------|-------------------|
| Small (100 properties) | 5GB | 10K ops | ~$0.12 |
| Medium (500 properties) | 25GB | 50K ops | ~$0.60 |
| Large (2000 properties) | 100GB | 200K ops | ~$2.40 |

*Note: Costs are estimates and may vary based on actual usage.*

---

## Additional Resources

- [Cloudflare R2 Documentation](https://developers.cloudflare.com/r2/)
- [AWS SDK for JavaScript v3](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/)
- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)

---

## File Structure

```
broker/
├── lib/
│   └── r2-client.ts                    # R2 client configuration
├── app/api/admin/upload/
│   ├── presigned-url/
│   │   └── route.ts                    # Generate presigned URLs
│   └── delete/
│       └── route.ts                    # Delete images
├── components/admin/
│   ├── ImageUploader.tsx               # Main uploader component
│   └── ImageUploader.example.tsx       # Usage examples
├── .env.local                          # Environment variables (not in git)
├── .env.example                        # Template with R2 vars
├── next.config.js                      # Updated with R2 domains
└── R2_SETUP_GUIDE.md                   # This file
```

---

## Next Steps

1. ✅ Complete Cloudflare R2 setup
2. ✅ Configure environment variables
3. ✅ Test image uploads
4. 🔄 Integrate ImageUploader into property forms
5. 🔄 Update existing properties to use R2
6. 🔄 Monitor R2 usage and costs
7. 🔄 Set up custom domain (optional)
8. 🔄 Implement image optimization (optional)

---

**Need help?** Check the troubleshooting section or refer to the example component at `components/admin/ImageUploader.example.tsx`
