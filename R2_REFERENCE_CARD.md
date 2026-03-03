# R2 Quick Reference Card

## Component Usage

```tsx
import ImageUploader from '@/components/admin/ImageUploader'

const [images, setImages] = useState('')

<ImageUploader
  value={images}
  onChange={setImages}
  maxImages={10}
  label="Property Images"
/>
```

## Environment Variables

```bash
R2_ACCOUNT_ID=your-account-id
R2_ACCESS_KEY_ID=your-access-key
R2_SECRET_ACCESS_KEY=your-secret-key
R2_BUCKET_NAME=your-bucket-name
R2_PUBLIC_URL=https://your-bucket.r2.dev
```

## API Endpoints

### Generate Presigned URL
```bash
POST /api/admin/upload/presigned-url
{
  "fileName": "image.jpg",
  "fileType": "image/jpeg",
  "fileSize": 2048576
}
```

### Delete Image
```bash
POST /api/admin/upload/delete
{
  "url": "https://bucket.r2.dev/properties/123.jpg"
}
```

## Validation Rules

- **Allowed Types**: JPEG, PNG, WebP only
- **Max Size**: 10MB
- **Max Files**: Configurable (default: 10)

## Working with URLs

```tsx
// Parse comma-separated string to array
const urlArray = images.split(',').map(s => s.trim()).filter(Boolean)

// Join array to comma-separated string
const urlString = urlArray.join(', ')

// Get main image (first one)
const mainImage = urlArray[0] || ''
```

## Common Imports

```tsx
// R2 Client
import { getR2Client, R2_BUCKET_NAME } from '@/lib/r2-client'

// Types
import type { PresignedUrlRequest, UploadingFile } from '@/lib/types/r2'

// Component
import ImageUploader from '@/components/admin/ImageUploader'
```

## File Locations

- **Client**: `lib/r2-client.ts`
- **Types**: `lib/types/r2.ts`
- **Component**: `components/admin/ImageUploader.tsx`
- **Presigned URL API**: `app/api/admin/upload/presigned-url/route.ts`
- **Delete API**: `app/api/admin/upload/delete/route.ts`

## Documentation Files

- `R2_QUICK_START.md` - Fast setup
- `R2_SETUP_GUIDE.md` - Complete guide
- `R2_IMPLEMENTATION_CHECKLIST.md` - Step-by-step
- `R2_SUMMARY.md` - Implementation overview
- `R2_REFERENCE_CARD.md` - This file

## Next Steps

1. Get R2 credentials from Cloudflare
2. Update `.env.local`
3. Restart dev server: `npm run dev`
4. Test upload at `/admin`
5. Integrate into your forms

## Troubleshooting

**Upload fails?**
- Check R2 credentials in `.env.local`
- Restart dev server
- Verify API token permissions

**Images don't display?**
- Enable public access on R2 bucket
- Check `R2_PUBLIC_URL` is correct
- Add domain to `next.config.js`

**Unauthorized?**
- Log in to admin panel
- Check session cookie exists

## Support

For detailed help, see `R2_SETUP_GUIDE.md`
