# Cloudinary Image Upload Fix

## Issue
The image upload is failing with error: "Invalid cloud_name Root"

## Solution

Your Cloudinary cloud name appears to be incorrect. Here's how to find and fix it:

### 1. Find Your Correct Cloud Name

1. Go to [Cloudinary Dashboard](https://cloudinary.com/console)
2. Log in to your account
3. On the dashboard, you'll see "Account Details" section
4. Look for **Cloud Name** (it's usually lowercase, e.g., `dxyz12345`, `my-app-name`, etc.)

### 2. Update Your Environment Variable

Edit `.env.local` and replace the current cloud name:

```env
# Change this line:
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=Root

# To your actual cloud name (example):
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-actual-cloud-name
```

### 3. Restart the Dev Server

After updating `.env.local`:
1. Stop the current dev server (Ctrl+C in terminal)
2. Run `npm run dev` again
3. The new environment variables will be loaded

## Test Image Upload

1. Go to admin dashboard at `http://localhost:3000/admin`
2. Try uploading an image
3. It should now work correctly!

## TikTok URL Feature

The TikTok icon has been added to the footer! To enable it:

1. Edit `.env.local`
2. Add your TikTok profile URL:
   ```env
   NEXT_PUBLIC_TIKTOK_URL=https://tiktok.com/@yourusername
   ```
3. If you leave it empty, the TikTok icon will be hidden automatically
4. Restart the dev server to see changes

## Current Cloudinary Credentials

Check these values in Cloudinary dashboard:
- ✅ API Key: `788631823694666` (looks correct)
- ✅ API Secret: `Z2Il210JQTQKUFLSS1z_2IjSchU` (looks correct)
- ❌ Cloud Name: `Root` (needs to be fixed)
