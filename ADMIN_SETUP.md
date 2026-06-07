# Admin Dashboard Setup Guide

## Overview
Your TechServices website now has a full admin dashboard where you can add, edit, and delete projects that will automatically appear on the website.

## Features
- ✅ Neon PostgreSQL database integration
- ✅ Admin authentication
- ✅ Full CRUD operations for projects
- ✅ Real-time updates on the website
- ✅ Beautiful admin interface with your brand colors

---

## Setup Instructions

### 1. Get Your Neon PostgreSQL Database

1. Go to [https://neon.tech/](https://neon.tech/)
2. Sign up or log in
3. Create a new project
4. Copy your connection string from the "Connection Details" section

### 2. Update Environment Variables

Open the `.env` file and replace the `DATABASE_URL` with your Neon connection string:

```env
DATABASE_URL="postgresql://user:password@host.neon.tech/database?sslmode=require"
```

### 3. Run Database Migrations

Open a terminal in your project folder and run:

```bash
npx prisma generate
npx prisma db push
```

This will:
- Generate the Prisma client
- Create the `Admin` and `Project` tables in your Neon database

### 4. Create Admin User

You have two options:

**Option A: Use the seed API (Recommended)**
1. Make sure your dev server is running: `npm run dev`
2. Open your browser and go to: `http://localhost:3000/api/admin/seed`
3. Or use this command:
   ```bash
   curl -X POST http://localhost:3000/api/admin/seed
   ```

**Option B: Create manually using Prisma Studio**
```bash
npx prisma studio
```
Then create an admin user in the Admin table.

### 5. Access the Admin Dashboard

1. Navigate to: `http://localhost:3000/admin`
2. Login with:
   - **Username:** `admin`
   - **Password:** `admin123`
3. ⚠️ **Important:** Change these credentials immediately!

---

## Using the Admin Dashboard

### Adding a New Project

1. Fill out the form at the top of the admin dashboard
2. Required fields:
   - Title
   - Category
   - Short Description
   - Full Description
   - Color (choose from your brand colors)
   - Tags (comma-separated, e.g., "Next.js, React, Tailwind")
   - Features (comma-separated)
   - Technologies (comma-separated)
3. Click "Create Project"

### Editing a Project

1. Find the project in the list below
2. Click "Edit"
3. Make your changes
4. Click "Update Project"

### Deleting a Project

1. Find the project in the list
2. Click "Delete"
3. Confirm the deletion

### Project Colors

Choose from your brand colors:
- **#CCD5AE** (Sage Green)
- **#E0E5B6** (Mint Green)
- **#FAEDCE** (Cream)

---

## Database Schema

### Project Table
- `id`: Unique identifier
- `title`: Project name
- `description`: Short description (shown on cards)
- `fullDescription`: Detailed description (shown on detail page)
- `category`: Project category
- `color`: Brand color (hex code)
- `tags`: Array of technology tags
- `features`: Array of key features
- `technologies`: Array of technologies used
- `published`: Whether the project is visible on the website
- `order`: Display order (lower numbers appear first)

### Admin Table
- `id`: Unique identifier
- `username`: Admin username
- `password`: Hashed password

---

## API Endpoints

### Projects
- `GET /api/projects` - Get all published projects
- `POST /api/projects` - Create a new project
- `PUT /api/projects` - Update a project
- `DELETE /api/projects?id={id}` - Delete a project

### Authentication
- `POST /api/auth/login` - Admin login

### Admin
- `POST /api/admin/seed` - Create initial admin user

---

## Security Notes

⚠️ **Important Security Measures:**

1. **Change Default Credentials**
   - The default username/password (`admin`/`admin123`) should be changed immediately
   - Update the password in the database using Prisma Studio or create a new admin user

2. **Production Deployment**
   - Add proper session management (JWT or Next-Auth)
   - Add CSRF protection
   - Use HTTPS only
   - Add rate limiting to API routes
   - Implement proper authorization middleware

3. **Environment Variables**
   - Never commit `.env` to version control
   - The `.env` file is already in `.gitignore`

---

## Troubleshooting

### Database Connection Issues
- Ensure your Neon database URL is correct
- Check that your IP is allowed in Neon's settings
- Verify the `?sslmode=require` parameter is in the connection string

### Migration Errors
- Delete the `prisma/migrations` folder (if it exists)
- Run `npx prisma db push` again

### Admin Login Not Working
- Ensure you've run the seed API endpoint
- Check the database using `npx prisma studio` to verify the admin user exists

---

## Next Steps

1. ✅ Set up your Neon database
2. ✅ Run migrations
3. ✅ Create your admin user
4. ✅ Login to the admin dashboard
5. ✅ Add your first project
6. ✅ See it appear on your website instantly!

Enjoy your new admin dashboard! 🚀
