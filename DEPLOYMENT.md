# TechServices - Deployment Guide

## 🚀 Deployed on Vercel

### Live URLs:
- **Production:** https://techservices.vercel.app (or your custom domain)
- **Admin Dashboard:** https://techservices.vercel.app/admin

### 📝 Environment Variables Required:

Add these in Vercel Dashboard → Settings → Environment Variables:

```
DATABASE_URL=your_neon_database_url
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_password
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dyjq36xya
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
NEXT_PUBLIC_TIKTOK_URL=your_tiktok_url_or_leave_empty
```

### 🔧 Deployment Steps:

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to https://vercel.com
   - Click "Import Project"
   - Connect GitHub repository
   - Add environment variables
   - Deploy!

3. **After Deployment**
   - Seed admin user: Visit `https://your-domain.vercel.app/api/admin/seed`
   - Login with credentials from environment variables
   - Start adding projects!

### 📱 Features:
- ✅ Fully responsive design
- ✅ Admin dashboard for project management
- ✅ Image uploads via Cloudinary
- ✅ PostgreSQL database (Neon)
- ✅ Custom domain support
- ✅ SEO optimized
- ✅ PWA ready

### 🔐 Security Notes:
- Change default admin credentials after first login
- Keep environment variables secure
- Never commit `.env.local` to GitHub

### 📞 Support:
For any issues, contact: info@techservices.com
