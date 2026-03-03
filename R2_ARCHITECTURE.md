# R2 Integration Architecture

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         User Interface                          │
│                   (Admin Panel - Browser)                       │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ 1. Select Files
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│              ImageUploader Component (Client)                   │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │ • File validation (type, size)                            │ │
│  │ • Drag & drop support                                     │ │
│  │ • Multi-file upload                                       │ │
│  │ • Progress tracking                                       │ │
│  │ • Preview thumbnails                                      │ │
│  │ • Delete functionality                                    │ │
│  └───────────────────────────────────────────────────────────┘ │
└────────────┬────────────────────────────────┬──────────────────┘
             │                                │
             │ 2. Request Presigned URL       │ 5. Display Image
             │                                │
             ▼                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Next.js API Routes                           │
│  ┌──────────────────────────┐  ┌──────────────────────────┐    │
│  │ /presigned-url           │  │ /delete                  │    │
│  │                          │  │                          │    │
│  │ • Auth verification      │  │ • Auth verification      │    │
│  │ • File validation        │  │ • Extract key from URL   │    │
│  │ • Generate unique name   │  │ • Delete from R2         │    │
│  │ • Create presigned URL   │  │ • Return success         │    │
│  │ • Return public URL      │  │                          │    │
│  └──────────┬───────────────┘  └──────────┬───────────────┘    │
└─────────────┼──────────────────────────────┼───────────────────┘
              │                              │
              │ 3. Get Presigned URL         │ 7. Delete Object
              ▼                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     R2 Client (lib/r2-client.ts)                │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │ S3Client Configuration:                                   │ │
│  │ • Endpoint: https://{account-id}.r2.cloudflarestorage.com│ │
│  │ • Region: auto                                           │ │
│  │ • Credentials: Access Key + Secret Key                   │ │
│  │ • Validation: File type, size, env vars                  │ │
│  └───────────────────────────────────────────────────────────┘ │
└────────────┬────────────────────────────────┬──────────────────┘
             │                                │
             │ 4. Direct Upload (PUT)         │ 8. Delete Confirmed
             ▼                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Cloudflare R2 Bucket                         │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │ Storage Structure:                                        │ │
│  │   properties/                                             │ │
│  │   ├── 1234567890-abc123def456.jpg                         │ │
│  │   ├── 1234567891-ghi789jkl012.png                         │ │
│  │   └── 1234567892-mno345pqr678.webp                        │ │
│  │                                                           │ │
│  │ Public Access: Enabled                                    │ │
│  │ Public URL: https://bucket-name.account-id.r2.dev         │ │
│  └───────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
             │
             │ 6. Serve Images
             ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Next.js Image Component                    │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │ <Image                                                    │ │
│  │   src="https://bucket.r2.dev/properties/123.jpg"          │ │
│  │   alt="Property"                                          │ │
│  │   width={800}                                             │ │
│  │   height={600}                                            │ │
│  │ />                                                        │ │
│  └───────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

---

## Upload Flow (Detailed)

```
User Action                  Client                     API                        R2
─────────────────────────────────────────────────────────────────────────────────────

1. Select File(s)
   │
   ├─> Validate File Type
   │   (JPEG, PNG, WebP)
   │
   ├─> Validate File Size
   │   (Max 10MB)
   │
   └─> Check Max Images
       (Default: 10)
                            │
                            │
2. Request Upload URL       │
                            │
                            ├─> POST /api/admin/upload/presigned-url
                            │   {
                            │     fileName: "house.jpg",
                            │     fileType: "image/jpeg",
                            │     fileSize: 2048576
                            │   }
                            │
                            │                          │
                            │                          ├─> Verify Admin Session
                            │                          │
                            │                          ├─> Validate File Type
                            │                          │
                            │                          ├─> Validate File Size
                            │                          │
                            │                          ├─> Generate Unique Name
                            │                          │   "properties/1234-abc.jpg"
                            │                          │
                            │                          ├─> Create PutObjectCommand
                            │                          │
                            │                          │                       │
                            │                          │                       ├─> Generate
                            │                          │                       │   Presigned URL
                            │                          │                       │   (1 hour TTL)
                            │                          │                       │
                            │                          ├─< Return Presigned URL
                            │                          │
                            ├─< {
                            │     presignedUrl: "https://...",
                            │     publicUrl: "https://bucket.r2.dev/...",
                            │     key: "properties/1234-abc.jpg"
                            │   }
                            │
3. Direct Upload            │
                            │
                            ├─> PUT {presignedUrl}
                            │   Body: File Binary Data
                            │   Content-Type: image/jpeg
                            │
                            │                                                  │
                            │                                                  ├─> Store Object
                            │                                                  │   Bucket: {name}
                            │                                                  │   Key: properties/1234-abc.jpg
                            │                                                  │   Size: 2048576 bytes
                            │                                                  │
                            ├─< 200 OK
                            │
4. Update UI                │
                            │
                            ├─> Add {publicUrl} to images
                            │   "url1.jpg, url2.jpg, {publicUrl}"
                            │
                            ├─> Show Thumbnail
                            │
                            └─> Update Progress (100%)

5. Form Submit
   │
   ├─> POST /api/admin/properties
   │   {
   │     address: "123 Main St",
   │     images: "url1.jpg, url2.jpg, url3.jpg",
   │     ...
   │   }
   │
   └─> Save to Database
       Property {
         id: 1,
         images: "url1.jpg, url2.jpg, url3.jpg",
         mainImage: "url1.jpg"
       }
```

---

## Delete Flow (Detailed)

```
User Action                  Client                     API                        R2
─────────────────────────────────────────────────────────────────────────────────────

1. Click Delete Button
   │
   ├─> Show Confirmation
   │   "Are you sure?"
   │
   └─> User Confirms
                            │
                            │
2. Request Delete           │
                            │
                            ├─> POST /api/admin/upload/delete
                            │   {
                            │     url: "https://bucket.r2.dev/properties/1234.jpg"
                            │   }
                            │
                            │                          │
                            │                          ├─> Verify Admin Session
                            │                          │
                            │                          ├─> Extract Key from URL
                            │                          │   "properties/1234.jpg"
                            │                          │
                            │                          ├─> Create DeleteObjectCommand
                            │                          │
                            │                          │                       │
                            │                          │                       ├─> Delete Object
                            │                          │                       │   Key: properties/1234.jpg
                            │                          │                       │
                            │                          ├─< Deletion Confirmed
                            │                          │
                            ├─< {
                            │     success: true,
                            │     message: "Image deleted"
                            │   }
                            │
3. Update UI                │
                            │
                            ├─> Remove URL from images
                            │   Before: "url1.jpg, url2.jpg, url3.jpg"
                            │   After:  "url1.jpg, url3.jpg"
                            │
                            └─> Remove Thumbnail
```

---

## Data Flow

### Image URL Storage Format

```typescript
// Component receives and returns comma-separated string
value: "https://bucket.r2.dev/1.jpg, https://bucket.r2.dev/2.jpg"

// Database stores as TEXT
Property {
  images: "https://bucket.r2.dev/1.jpg, https://bucket.r2.dev/2.jpg",
  mainImage: "https://bucket.r2.dev/1.jpg"
}

// Parse when needed
const imageArray = value.split(',').map(s => s.trim()).filter(Boolean)
// Result: ["https://bucket.r2.dev/1.jpg", "https://bucket.r2.dev/2.jpg"]
```

### File Naming Convention

```
Format: properties/{timestamp}-{nanoid}.{extension}

Example: properties/1709410234000-abc123def456ghi7.jpg

Components:
  - Folder: "properties/" (organizes files)
  - Timestamp: "1709410234000" (Unix timestamp in ms)
  - ID: "abc123def456ghi7" (16-char nanoid for uniqueness)
  - Extension: "jpg" (based on MIME type)
```

---

## Authentication Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                         Admin User                              │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ 1. Login
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    POST /api/admin/auth/login                   │
│  • Verify credentials                                           │
│  • Create session token                                         │
│  • Set cookie: admin_session={token}                            │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ 2. Session Cookie Stored
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                  All Subsequent Requests                        │
│  Headers:                                                       │
│    Cookie: admin_session={token}                                │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ 3. Each Request
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│              API Route Authentication Check                     │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │ const cookieStore = await cookies()                       │ │
│  │ const token = cookieStore.get('admin_session')?.value     │ │
│  │                                                           │ │
│  │ if (!token || !verifySessionToken(token)) {               │ │
│  │   return 401 Unauthorized                                 │ │
│  │ }                                                         │ │
│  └───────────────────────────────────────────────────────────┘ │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ 4. Authorized
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Process Request                              │
└─────────────────────────────────────────────────────────────────┘
```

---

## Error Handling

```typescript
// Component Level (Client)
try {
  // Upload attempt
  const response = await fetch('/api/admin/upload/presigned-url', {...})

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error)
  }

  // ... continue upload
} catch (error) {
  // Show error to user
  setUploadingFiles(prev =>
    prev.map(f =>
      f.id === uploadingFile.id
        ? { ...f, error: error.message }
        : f
    )
  )
}

// API Level (Server)
export async function POST(request: NextRequest) {
  try {
    // Verify auth
    if (!token || !verifySessionToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Validate input
    if (!isValidFileType(fileType)) {
      return NextResponse.json(
        { error: 'Invalid file type...' },
        { status: 400 }
      )
    }

    // ... process request

  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: error.message || 'Server error' },
      { status: 500 }
    )
  }
}
```

---

## Component State Management

```typescript
interface ComponentState {
  // Existing images (already uploaded)
  existingUrls: string[]  // Parsed from value prop

  // Currently uploading
  uploadingFiles: UploadingFile[]

  // UI state
  isDragging: boolean
}

interface UploadingFile {
  id: string          // Unique identifier for this upload
  file: File          // The actual File object
  progress: number    // 0-100
  error?: string      // Error message if upload failed
  url?: string        // Public URL once upload succeeds
}

// State updates
1. User selects files
   → Add to uploadingFiles with progress: 0

2. Request presigned URL
   → Update progress: 10

3. Get presigned URL
   → Update progress: 30

4. Direct upload to R2
   → Update progress: 30-90 (during upload)

5. Upload complete
   → Update progress: 100
   → Set url: publicUrl
   → Call onChange with updated URLs
   → Remove from uploadingFiles after 1s
```

---

## Security Layers

```
Layer 1: Client-Side Validation
├─ File type check (JPEG, PNG, WebP)
├─ File size check (max 10MB)
└─ Max files check (configurable)

Layer 2: Network Security
├─ HTTPS only
├─ Session cookie (HttpOnly, Secure)
└─ CORS configured

Layer 3: API Authentication
├─ Verify admin session token
├─ Check token expiration (24h)
└─ Validate token signature

Layer 4: API Input Validation
├─ Validate file type (server-side)
├─ Validate file size (server-side)
├─ Sanitize file names
└─ Validate URL format (delete)

Layer 5: R2 Security
├─ Presigned URLs (1h expiration)
├─ Access keys (not exposed to client)
├─ Bucket permissions
└─ API token scoped permissions

Layer 6: Environment Security
├─ Credentials in .env.local (not in git)
├─ Environment variable validation
└─ Production secrets rotation
```

---

## Performance Optimizations

```
1. Direct Upload to R2
   ✓ Bypasses Next.js server
   ✓ No intermediate storage
   ✓ Reduced server load
   ✓ Faster uploads

2. Presigned URLs
   ✓ Secure temporary access
   ✓ No repeated auth checks
   ✓ Client-side upload
   ✓ Scalable to many users

3. Singleton R2 Client
   ✓ Reuses connection
   ✓ Reduces initialization overhead
   ✓ Better performance

4. Image Optimization Ready
   ✓ Next.js Image component compatible
   ✓ Automatic optimization
   ✓ Responsive images
   ✓ Lazy loading support

5. Efficient State Updates
   ✓ Batched re-renders
   ✓ Minimal state changes
   ✓ Remove completed uploads
   ✓ Smooth UI updates
```

---

## File Structure Reference

```
broker/
│
├── lib/
│   ├── r2-client.ts              # R2 configuration & utilities
│   │   ├── getR2Client()         # Initialize S3Client
│   │   ├── validateR2Config()    # Check env vars
│   │   ├── isValidFileType()     # Validate MIME type
│   │   ├── isValidFileSize()     # Validate size
│   │   └── getFileExtension()    # Get extension from MIME
│   │
│   ├── types/
│   │   └── r2.ts                 # TypeScript types
│   │       ├── PresignedUrlRequest
│   │       ├── PresignedUrlResponse
│   │       ├── DeleteImageRequest
│   │       ├── UploadingFile
│   │       └── Helper functions
│   │
│   └── auth.ts                   # Existing auth (used by R2)
│       └── verifySessionToken()
│
├── app/api/admin/upload/
│   ├── presigned-url/
│   │   └── route.ts              # POST - Generate upload URL
│   │       ├── Verify auth
│   │       ├── Validate file
│   │       ├── Generate name
│   │       └── Create presigned URL
│   │
│   └── delete/
│       └── route.ts              # POST - Delete image
│           ├── Verify auth
│           ├── Extract key
│           └── Delete from R2
│
├── components/admin/
│   ├── ImageUploader.tsx         # Main component
│   │   ├── handleFileSelect()
│   │   ├── uploadFile()
│   │   ├── handleDelete()
│   │   ├── handleDrag...()
│   │   └── UI rendering
│   │
│   └── ImageUploader.example.tsx # Usage examples
│
└── [Configuration Files]
    ├── .env.local                # R2 credentials (secret)
    ├── .env.example              # R2 template
    └── next.config.js            # Image domains
```

---

## Integration Points

### 1. Property Form Integration

```typescript
// app/admin/properties/new/page.tsx
import ImageUploader from '@/components/admin/ImageUploader'

export default function NewProperty() {
  const [formData, setFormData] = useState({
    address: '',
    images: '', // Comma-separated URLs
    // ... other fields
  })

  return (
    <form onSubmit={handleSubmit}>
      {/* Other inputs */}

      <ImageUploader
        value={formData.images}
        onChange={(images) =>
          setFormData({ ...formData, images })
        }
      />

      <button type="submit">Create Property</button>
    </form>
  )
}
```

### 2. API Integration

```typescript
// app/api/admin/properties/route.ts
export async function POST(request: NextRequest) {
  const body = await request.json()

  const propertyData = {
    // ... other fields
    images: body.images,  // Store as-is (comma-separated)
    mainImage: body.images.split(',')[0]?.trim() || '', // First image
  }

  await db.insert(properties).values(propertyData)
}
```

### 3. Display Integration

```typescript
// components/PropertyCard.tsx
import Image from 'next/image'

export default function PropertyCard({ property }) {
  const imageUrls = property.images
    .split(',')
    .map(url => url.trim())
    .filter(Boolean)

  return (
    <div>
      {imageUrls.map((url, i) => (
        <Image
          key={i}
          src={url}
          alt={property.address}
          width={800}
          height={600}
        />
      ))}
    </div>
  )
}
```

---

**This architecture provides**:
- ✅ Secure authentication
- ✅ Direct uploads (performance)
- ✅ User-friendly interface
- ✅ Type safety
- ✅ Error handling
- ✅ Scalability
- ✅ Easy integration
