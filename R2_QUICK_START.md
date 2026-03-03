# R2 Quick Start Guide

## 1. Get Your R2 Credentials

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com) → R2
2. Create a bucket (e.g., `arrowhead-properties`)
3. Generate API token with Read & Write permissions
4. Save these values:
   - Account ID
   - Access Key ID
   - Secret Access Key
   - Bucket Name
   - Public URL (from bucket settings)

## 2. Update .env.local

```bash
R2_ACCOUNT_ID=your-account-id
R2_ACCESS_KEY_ID=your-access-key-id
R2_SECRET_ACCESS_KEY=your-secret-access-key
R2_BUCKET_NAME=your-bucket-name
R2_PUBLIC_URL=https://your-bucket.your-account-id.r2.dev
```

## 3. Restart Dev Server

```bash
npm run dev
```

## 4. Use in Your Forms

```tsx
import ImageUploader from '@/components/admin/ImageUploader'

function MyForm() {
  const [images, setImages] = useState('')

  return (
    <ImageUploader
      value={images}
      onChange={setImages}
      maxImages={10}
      label="Property Images"
    />
  )
}
```

## 5. Submit Form Data

```tsx
// Images are already a comma-separated string - perfect!
const formData = {
  // ... other fields
  images: images, // "url1.jpg, url2.jpg, url3.jpg"
}

// Send to API
await fetch('/api/admin/properties', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData),
})
```

## That's It!

The component handles:
- ✅ File validation
- ✅ Upload to R2
- ✅ Progress tracking
- ✅ Image previews
- ✅ Delete functionality

## Need More Help?

See `R2_SETUP_GUIDE.md` for detailed documentation.

## Common Issues

**Images don't display?**
- Enable public access on your R2 bucket
- Check `R2_PUBLIC_URL` is correct
- Verify bucket domain is in `next.config.js`

**Upload fails?**
- Check all env variables are set
- Restart dev server after updating .env.local
- Verify API token has Write permissions

**Unauthorized error?**
- Make sure you're logged in to admin panel
- Check session cookie exists
