# Speaker Image Upload - Supabase Storage Setup Guide

This guide will help you set up the Supabase Storage bucket for speaker images on the Admin page.

## What Was Implemented

The following changes have been made to support speaker image uploads:

1. **Database Schema** - Added `image_url` column to speakers table
2. **Type Definitions** - Updated TypeScript interfaces to include `imageUrl` field
3. **Upload Utility** - Created `src/lib/speakerImageUpload.ts` with upload/delete functions
4. **Admin Form UI** - Enhanced `SpeakersForm.tsx` with image upload interface
5. **Display** - Updated `Speakers.tsx` to show speaker photos with icon fallback

## Supabase Storage Configuration

### Step 1: Create Storage Bucket

1. Go to your [Supabase Dashboard](https://app.supabase.com)
2. Navigate to **Storage** → **Buckets**
3. Click **New Bucket**
4. Configure the bucket:
   - **Name**: `speaker-images`
   - **Public bucket**: Toggle **OFF** (we'll use RLS policies instead)
   - **File size limit**: 10 MB (recommended)
5. Click **Create bucket**

### Step 2: Set Up Row Level Security (RLS) Policies

Once the bucket is created, click on it and navigate to the **Policies** tab.

#### Policy 1: Public Read Access

This allows anyone to view/download speaker images.

```sql
-- Create policy for public read access
CREATE POLICY "Public read access" ON storage.objects
  FOR SELECT
  USING (bucket_id = 'speaker-images');
```

Or create manually via UI:
- **Name**: "Public read access"
- **Allowed operations**: SELECT
- **With Check**: `bucket_id = 'speaker-images'`

#### Policy 2: Authenticated Insert

This allows logged-in admins to upload images.

```sql
-- Create policy for authenticated inserts
CREATE POLICY "Authenticated insert" ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'speaker-images' AND auth.role() = 'authenticated');
```

Or create manually via UI:
- **Name**: "Authenticated insert"
- **Allowed operations**: INSERT
- **With Check**: `bucket_id = 'speaker-images' AND auth.role() = 'authenticated'`

#### Policy 3: Authenticated Update

This allows logged-in admins to replace images.

```sql
-- Create policy for authenticated updates
CREATE POLICY "Authenticated update" ON storage.objects
  FOR UPDATE
  USING (bucket_id = 'speaker-images' AND auth.role() = 'authenticated')
  WITH CHECK (bucket_id = 'speaker-images' AND auth.role() = 'authenticated');
```

Or create manually via UI:
- **Name**: "Authenticated update"
- **Allowed operations**: UPDATE
- **Using**: `bucket_id = 'speaker-images' AND auth.role() = 'authenticated'`
- **With Check**: `bucket_id = 'speaker-images' AND auth.role() = 'authenticated'`

#### Policy 4: Authenticated Delete

This allows logged-in admins to delete images.

```sql
-- Create policy for authenticated deletes
CREATE POLICY "Authenticated delete" ON storage.objects
  FOR DELETE
  USING (bucket_id = 'speaker-images' AND auth.role() = 'authenticated');
```

Or create manually via UI:
- **Name**: "Authenticated delete"
- **Allowed operations**: DELETE
- **Using**: `bucket_id = 'speaker-images' AND auth.role() = 'authenticated'`

### Step 3: Apply Database Migration

1. Go to your Supabase Dashboard
2. Navigate to **SQL Editor**
3. Run the migration script at `supabase/migration.sql`
   - Or manually run: `ALTER TABLE speakers ADD COLUMN image_url TEXT;`

## How to Use

### Admin Page - Upload Speaker Image

1. Navigate to **Admin Dashboard** → **Event Edit** → **Speakers** tab
2. For each speaker:
   - Click **Upload Photo** button
   - Select a JPG, PNG, WebP, or GIF image (max 10MB)
   - The image will upload automatically and display as a preview
   - To change: Click **Change Photo**
   - To remove: Click the X button on the image preview
3. Click **Save** to persist the changes

### Public Speakers Page

1. Navigate to **Speakers** page
2. Speaker photos will now display:
   - If image was uploaded: Shows the speaker's photo
   - If no image: Falls back to the role icon (Mic, User, Users)
3. All speaker information (name, role, affiliation, topic, bio) remains the same

## Troubleshooting

### Images not uploading?

1. **Check authentication** - Ensure you're logged in to the admin panel
2. **Check Supabase credentials** - Verify `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in `.env.local`
3. **Check RLS policies** - Ensure the authentication policies are set correctly on the `speaker-images` bucket
4. **Check file size** - Ensure the image is under 10MB

### Images not displaying on public page?

1. **Check database** - Verify the `image_url` column was added: `SELECT * FROM speakers;`
2. **Check bucket visibility** - The bucket should be private but RLS policies should allow public reads
3. **Check image paths** - Images should be stored at `{eventId}/{speakerId}-{timestamp}.jpg` etc.

### "Upload failed" error?

- Check the browser console for detailed error messages
- Verify the file format is supported (JPG, PNG, WebP, GIF)
- Check that the file size is under 10MB
- Ensure Supabase Storage bucket exists and is named exactly `speaker-images`

## File Structure

```
src/
├── lib/
│   ├── speakerImageUpload.ts      # Upload/delete utilities
│   ├── eventStore.ts              # Updated with imageUrl field
│   └── database.types.ts           # Updated Speaker type
├── components/admin/
│   └── SpeakersForm.tsx            # Enhanced with upload UI
├── pages/
│   ├── Speakers.tsx                # Updated to display images
│   └── AdminEventEdit.tsx           # Passes eventId to form
└── ... (other files unchanged)

supabase/
└── migration.sql                   # Updated with image_url column & docs
```

## Next Steps

1. ✅ Implement database schema
2. ✅ Implement TypeScript types
3. ✅ Implement upload utilities
4. ✅ Implement admin form UI
5. ✅ Implement speaker display
6. **→ Set up Supabase storage bucket (YOU ARE HERE)**
7. Run migration on Supabase
8. Test uploading and displaying speaker images
9. (Optional) Add image optimization/cropping
10. (Optional) Add batch image upload

## Support

For issues or questions:
- Check Supabase documentation: https://supabase.com/docs/guides/storage
- Review console logs for JavaScript errors
- Verify RLS policies are correctly applied
