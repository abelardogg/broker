# R2 Implementation Checklist

Use this checklist to ensure your R2 integration is complete and working.

## Initial Setup

- [ ] **Dependencies Installed**
  - ✅ @aws-sdk/client-s3
  - ✅ @aws-sdk/s3-request-presigner
  - ✅ nanoid

- [ ] **Cloudflare R2 Setup**
  - [ ] Create Cloudflare account
  - [ ] Enable R2 service
  - [ ] Create R2 bucket
  - [ ] Enable public access on bucket
  - [ ] Generate API token with Read & Write permissions
  - [ ] Save credentials securely

- [ ] **Environment Configuration**
  - [ ] Add R2_ACCOUNT_ID to .env.local
  - [ ] Add R2_ACCESS_KEY_ID to .env.local
  - [ ] Add R2_SECRET_ACCESS_KEY to .env.local
  - [ ] Add R2_BUCKET_NAME to .env.local
  - [ ] Add R2_PUBLIC_URL to .env.local
  - [ ] Restart development server

## Files Created

- [x] **Core Files**
  - [x] lib/r2-client.ts - R2 client configuration
  - [x] lib/types/r2.ts - TypeScript types
  - [x] app/api/admin/upload/presigned-url/route.ts - Generate upload URLs
  - [x] app/api/admin/upload/delete/route.ts - Delete images
  - [x] components/admin/ImageUploader.tsx - Upload component
  - [x] components/admin/ImageUploader.example.tsx - Usage examples

- [x] **Configuration Files**
  - [x] next.config.js - Updated with R2 domains
  - [x] .env.example - Updated with R2 template
  - [x] .env.local - Added R2 placeholders

- [x] **Documentation**
  - [x] R2_SETUP_GUIDE.md - Comprehensive setup guide
  - [x] R2_QUICK_START.md - Quick reference
  - [x] R2_IMPLEMENTATION_CHECKLIST.md - This file

## Testing

- [ ] **API Routes**
  - [ ] Test presigned URL generation
    ```bash
    curl -X POST http://localhost:3000/api/admin/upload/presigned-url \
      -H "Content-Type: application/json" \
      -H "Cookie: admin_session=YOUR_TOKEN" \
      -d '{"fileName":"test.jpg","fileType":"image/jpeg","fileSize":1000}'
    ```
  - [ ] Verify authentication works
  - [ ] Verify file validation works
  - [ ] Test delete endpoint

- [ ] **ImageUploader Component**
  - [ ] Test file selection dialog
  - [ ] Test drag and drop
  - [ ] Test upload progress display
  - [ ] Test image preview thumbnails
  - [ ] Test delete functionality
  - [ ] Test multi-file upload
  - [ ] Test max images limit
  - [ ] Test file type validation (try uploading PDF/GIF)
  - [ ] Test file size validation (try >10MB file)

- [ ] **Integration**
  - [ ] Verify images upload to R2 bucket
  - [ ] Verify images accessible via public URL
  - [ ] Verify images display in Next.js Image component
  - [ ] Verify deleted images removed from R2
  - [ ] Test on different browsers
  - [ ] Test on mobile devices

## Integration into Existing Forms

- [ ] **Property Forms**
  - [ ] Import ImageUploader component
  - [ ] Add images state variable
  - [ ] Replace existing image input with ImageUploader
  - [ ] Update form submission to handle comma-separated URLs
  - [ ] Test create new property with images
  - [ ] Test update existing property images
  - [ ] Test delete property (ensure R2 cleanup if needed)

- [ ] **Other Forms** (if applicable)
  - [ ] Identify other forms that need image uploads
  - [ ] Integrate ImageUploader component
  - [ ] Test functionality

## Database Schema

- [ ] **Verify Property Schema**
  - [ ] Check if `images` field exists (should be TEXT)
  - [ ] Check if `mainImage` field exists (should be TEXT)
  - [ ] Verify fields can store long URLs
  - [ ] Run migrations if needed

## Security Review

- [x] **API Routes**
  - [x] Authentication check in presigned-url route
  - [x] Authentication check in delete route
  - [x] File type validation (server-side)
  - [x] File size validation (server-side)
  - [x] Input sanitization

- [ ] **Environment Variables**
  - [ ] Verify .env.local not in git
  - [ ] Verify .gitignore includes .env.local
  - [ ] Change default SESSION_SECRET in production
  - [ ] Never commit R2 credentials

- [ ] **R2 Bucket**
  - [ ] Enable public access only if needed
  - [ ] Review bucket CORS settings
  - [ ] Set up bucket lifecycle rules (optional)
  - [ ] Monitor usage and costs

## Production Deployment

- [ ] **Environment Variables**
  - [ ] Add all R2_ variables to production environment
  - [ ] Verify credentials work in production
  - [ ] Test uploads in production environment

- [ ] **DNS Setup** (if using custom domain)
  - [ ] Create CNAME record for R2 bucket
  - [ ] Update R2_PUBLIC_URL with custom domain
  - [ ] Update next.config.js with custom domain
  - [ ] Wait for DNS propagation
  - [ ] Test image access via custom domain

- [ ] **Performance**
  - [ ] Test upload speeds
  - [ ] Test image loading speeds
  - [ ] Consider implementing image optimization
  - [ ] Consider CDN if not using R2 public access

- [ ] **Monitoring**
  - [ ] Set up Cloudflare R2 usage alerts
  - [ ] Monitor API error logs
  - [ ] Track upload success/failure rates
  - [ ] Monitor storage costs

## Optional Enhancements

- [ ] **Image Optimization**
  - [ ] Add automatic image resizing
  - [ ] Generate multiple sizes (thumbnail, medium, large)
  - [ ] Implement lazy loading
  - [ ] Add WebP conversion

- [ ] **User Experience**
  - [ ] Add image reordering (drag and drop)
  - [ ] Add bulk upload
  - [ ] Add image cropping/editing
  - [ ] Add image compression before upload

- [ ] **Advanced Features**
  - [ ] Implement image metadata extraction
  - [ ] Add alt text management
  - [ ] Implement image search
  - [ ] Add duplicate image detection

## Troubleshooting

If you encounter issues, check:

1. [ ] Browser console for JavaScript errors
2. [ ] Server logs for API errors
3. [ ] Cloudflare R2 dashboard for bucket issues
4. [ ] Network tab for failed requests
5. [ ] Environment variables are loaded correctly
6. [ ] Development server was restarted after .env changes

## Support Resources

- Documentation: `R2_SETUP_GUIDE.md`
- Quick Reference: `R2_QUICK_START.md`
- Example Usage: `components/admin/ImageUploader.example.tsx`
- Cloudflare Docs: https://developers.cloudflare.com/r2/

---

## Current Status

**Setup Complete**: ✅
**Testing**: ⏳ (needs your R2 credentials)
**Integration**: ⏳ (needs to be added to your forms)
**Production**: ⏳ (pending deployment)

### Next Steps:

1. Get your Cloudflare R2 credentials
2. Update .env.local with real credentials
3. Restart dev server
4. Test upload functionality
5. Integrate into your property forms
6. Deploy to production

---

**Last Updated**: 2026-03-02
