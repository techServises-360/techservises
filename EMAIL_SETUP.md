# Email Configuration Setup Guide

This guide will help you set up email functionality for the TechServices contact form using Google Apps Script.

## Step 1: Set Up Google Apps Script

1. **Go to Google Apps Script**
   - Visit: https://script.google.com/
   - Sign in with your Google account

2. **Create New Project**
   - Click "New Project"
   - Give it a name like "TechServices Contact Form"

3. **Paste the Script**
   - Open the file: `GOOGLE_APPS_SCRIPT.js`
   - Copy all the code
   - Paste it into the script editor (replace any default code)
   - Click the save icon (💾)

4. **Configure Script Properties**
   - Click on "Project Settings" (⚙️ gear icon in the left sidebar)
   - Scroll down to "Script Properties"
   - Click "Add script property" and add these three properties:

   | Property Name | Value | Description |
   |--------------|-------|-------------|
   | `WEBHOOK_SECRET` | `ts_2024_secure_key_xyz` | Create your own random string (keep it secure!) |
   | `ADMIN_EMAIL` | `your@email.com` | Your email where contact forms will be sent |
   | `FROM_NAME` | `TechServices` | Name that appears as sender |

   **Important:** Keep your `WEBHOOK_SECRET` secure - you'll need it for Step 3!

5. **Deploy as Web App**
   - Click "Deploy" → "New deployment"
   - Click the gear icon (⚙️) next to "Select type"
   - Choose "Web app"
   - Configure:
     - Description: "TechServices Contact Form v1"
     - Execute as: **Me** (your@email.com)
     - Who has access: **Anyone**
   - Click "Deploy"
   - **Copy the Web App URL** - you'll need this!
   - Click "Done"

## Step 2: Grant Permissions

When you first deploy, Google will ask for permissions:

1. Click "Authorize access"
2. Choose your Google account
3. Click "Advanced" (if you see a warning)
4. Click "Go to [Your Project Name] (unsafe)"
5. Click "Allow"

This allows the script to send emails on your behalf.

## Step 3: Configure Environment Variables

### Local Development (.env.local)

Add these to your `.env.local` file:

```env
GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
GOOGLE_APPS_SCRIPT_SECRET=ts_2024_secure_key_xyz
```

Replace:
- `YOUR_SCRIPT_ID` with the Web App URL you copied
- `ts_2024_secure_key_xyz` with your actual secret from Step 1

### Vercel Production

1. Go to your Vercel project dashboard
2. Navigate to: **Settings** → **Environment Variables**
3. Add these two variables:
   - `GOOGLE_APPS_SCRIPT_URL` = Your Web App URL
   - `GOOGLE_APPS_SCRIPT_SECRET` = Your secret (same as WEBHOOK_SECRET)
4. Click "Save"
5. Redeploy your site

## Step 4: Test the Contact Form

1. **Restart your development server**
   ```bash
   npm run dev
   ```

2. **Test the form**
   - Fill out the contact form on your website
   - Click "Send Message"
   - You should see a success message

3. **Check your emails**
   - Admin email: Check the inbox of the email you set as `ADMIN_EMAIL`
   - Customer confirmation: Check the inbox of the email you used in the form

## How It Works

### Email Flow

```
User fills form → Next.js API → Google Apps Script → Gmail
                                       ↓
                                  Admin Email (you)
                                       ↓
                                Customer Confirmation
```

### What Each Email Contains

**Admin Email (to you):**
- Service requested
- Customer name
- Customer email
- Message/project details
- Timestamp

**Customer Confirmation:**
- Thank you message
- Service they requested
- What to expect next
- Your branding

## Troubleshooting

### "Email service not configured" error
- Check that both `GOOGLE_APPS_SCRIPT_URL` and `GOOGLE_APPS_SCRIPT_SECRET` are set
- Restart your dev server after adding env variables

### "Unauthorized" error
- Make sure `GOOGLE_APPS_SCRIPT_SECRET` in `.env.local` matches `WEBHOOK_SECRET` in Google Apps Script properties

### Not receiving emails
- Check your Google Apps Script execution logs:
  - Go to script.google.com
  - Open your project
  - Click "Executions" in the left sidebar
  - Look for errors
- Check spam folder
- Verify `ADMIN_EMAIL` is set correctly in script properties

### "Script execution failed"
- Re-authorize the script:
  - Go to script.google.com
  - Open your project
  - Try running the `doPost` function manually
  - Authorize again if prompted

## Updating the Script

If you need to modify the email templates or logic:

1. Edit `GOOGLE_APPS_SCRIPT.js`
2. Go to script.google.com
3. Paste the updated code
4. Save
5. Deploy → Manage deployments
6. Click the edit icon (✏️) on your latest deployment
7. Change version to "New version"
8. Click "Deploy"

## Security Notes

- ✅ Always keep your `WEBHOOK_SECRET` private
- ✅ Never commit `.env.local` to git (it's already in `.gitignore`)
- ✅ Use different secrets for development and production
- ✅ The secret prevents unauthorized use of your email sending endpoint

## Testing Locally

To test without deploying:

1. Fill out the contact form
2. Open browser DevTools → Network tab
3. Submit the form
4. Look for the `/api/contact` request
5. Check the response for success or error messages

## Cost

Google Apps Script email sending is **FREE** with Gmail:
- Up to 100 emails per day (free tier)
- Up to 1,500 emails per day (Google Workspace)

## Support

If you encounter issues:
1. Check browser console for errors
2. Check Google Apps Script execution logs
3. Verify all environment variables are set correctly
4. Make sure the script has proper permissions
