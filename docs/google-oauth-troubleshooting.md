# 🔧 Google OAuth Troubleshooting Guide

Panduan lengkap untuk debugging masalah Google OAuth "Continue with Google" button tidak muncul.

## 🐛 Problem: Google Button Tidak Muncul

### Symptoms:

- Teks "OR CONTINUE WITH" muncul
- Google button tidak render
- Console mungkin ada error terkait Google

---

## ✅ Checklist Troubleshooting

### 1. Verifikasi Environment Variable di Vercel

**Masalah paling umum:** `VITE_GOOGLE_CLIENT_ID` tidak terset di Vercel.

#### Cara Cek:

1. Buka [Vercel Dashboard](https://vercel.com/dashboard)
2. Pilih project Anda
3. Go to **Settings** → **Environment Variables**
4. Cari `VITE_GOOGLE_CLIENT_ID`

#### Jika Tidak Ada:

```bash
# Option 1: Via Vercel Dashboard
Settings → Environment Variables → Add New
- Key: VITE_GOOGLE_CLIENT_ID
- Value: your-google-client-id.apps.googleusercontent.com
- Environment: Production, Preview, Development

# Option 2: Via Vercel CLI
vercel env add VITE_GOOGLE_CLIENT_ID production
# Paste your Google Client ID when prompted
```

#### Setelah menambahkan:

**WAJIB REDEPLOY!** Environment variables hanya apply setelah redeploy.

```bash
# Trigger redeploy via CLI
vercel --prod

# Or via Dashboard: Deployments → Redeploy
```

---

### 2. Verifikasi Google Cloud Console Configuration

#### A. Check Authorized JavaScript Origins

1. Buka [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. Go to **APIs & Services** → **Credentials**
4. Click pada OAuth 2.0 Client ID Anda
5. Scroll ke **Authorized JavaScript origins**

**Harus Include:**

```
https://your-app.vercel.app
https://your-app-*.vercel.app (untuk preview deployments)
```

**Format yang BENAR:**

- ✅ `https://track-hire.vercel.app`
- ✅ `https://track-hire-git-main-yourusername.vercel.app`
- ❌ `https://track-hire.vercel.app/` (trailing slash)
- ❌ `http://track-hire.vercel.app` (http bukan https)

#### B. Check Authorized Redirect URIs

**Optional tapi recommended:**

```
https://your-app.vercel.app
https://your-app-*.vercel.app
```

#### C. Verify OAuth Consent Screen

1. Go to **OAuth consent screen**
2. Status: **Testing** atau **Published**
3. Jika **Testing**, pastikan Google account Anda ada di **Test users**

---

### 3. Check Content Security Policy (CSP)

CSP yang terlalu ketat bisa block Google OAuth scripts.

#### Vercel.json CSP Requirements:

```json
"Content-Security-Policy": "
  frame-src 'self' https://accounts.google.com https://www.google.com;
  script-src 'self' 'unsafe-inline' 'unsafe-eval' https://accounts.google.com https://www.gstatic.com;
  style-src 'self' 'unsafe-inline' https://accounts.google.com;
  connect-src 'self' YOUR_API_URL https://accounts.google.com https://www.googleapis.com;
"
```

**Critical domains untuk Google OAuth:**

- `https://accounts.google.com` - Google Sign-In UI
- `https://www.gstatic.com` - Google static assets
- `https://www.googleapis.com` - Google APIs
- `https://www.google.com` - Additional Google resources

---

### 4. Check Browser Console

#### Cara Check:

1. Buka aplikasi di production
2. Tekan F12 → Console tab
3. Refresh page
4. Look for errors

#### Common Error Messages:

**Error 1: "idpiframe_initialization_failed"**

```
Cause: Google Client ID invalid atau tidak terset
Solution:
- Verify environment variable di Vercel
- Check Client ID format (should end with .apps.googleusercontent.com)
- Redeploy setelah set environment variable
```

**Error 2: "popup_closed_by_user"**

```
Cause: Ini normal jika user close popup
Solution: No action needed, this is expected behavior
```

**Error 3: "Origin mismatch error"**

```
Cause: Domain Anda tidak terdaftar di Google Console
Solution:
- Add domain ke Authorized JavaScript origins
- Format: https://exact-domain.vercel.app (no trailing slash)
```

**Error 4: CSP Violation**

```
Error: "Refused to load... violates Content-Security-Policy directive"
Cause: CSP terlalu strict
Solution: Update vercel.json dengan domains yang required
```

**Error 5: "Not a valid origin for the client"**

```
Cause:
- Domain tidak match dengan yang registered di Google Console
- Using localhost domain di production
Solution:
- Verify domain di Google Console Authorized origins
- Make sure production URL is added
```

---

### 5. Check Network Tab

#### Cara Check:

1. F12 → Network tab
2. Filter: All atau JS
3. Refresh page
4. Look for Google-related requests

#### Expected Requests:

- ✅ `accounts.google.com/gsi/client` (Google Identity Services)
- ✅ `www.gstatic.com/...` (Google static files)
- ✅ Status: 200 OK

#### If Blocked:

- Status: Failed atau Blocked
- Cause: CSP atau CORS issue
- Solution: Update vercel.json CSP headers

---

### 6. Test Environment Variables Locally

Sebelum deploy, test di local dengan production environment:

```bash
# 1. Create .env.production.local
echo VITE_API_BASE_URL=https://api.track-hire.app/api > .env.production.local
echo VITE_GOOGLE_CLIENT_ID=your-production-client-id >> .env.production.local

# 2. Build dengan production env
npm run build

# 3. Preview production build
npm run preview

# 4. Test Google OAuth button
# Open http://localhost:4173 (or shown port)
```

---

### 7. Verify Google Client ID Format

#### Valid Format:

```
123456789012-abcdefghijklmnopqrstuvwxyz123456.apps.googleusercontent.com
```

#### Check Your Client ID:

```javascript
// Add temporary console.log di RootLayout.tsx
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || ''
console.log('Google Client ID:', GOOGLE_CLIENT_ID) // Should show full ID, not empty

// Remove after debugging!
```

#### Common Issues:

- ❌ Empty string
- ❌ `undefined`
- ❌ Wrong format (missing .apps.googleusercontent.com)
- ❌ Using development Client ID di production

---

## 🔍 Step-by-Step Debugging Process

### Step 1: Check Console

```bash
# Open browser console and check for:
1. Any Google-related errors
2. CSP violations
3. Network errors
```

### Step 2: Verify Environment Variables

```bash
# Check if VITE_GOOGLE_CLIENT_ID is set in Vercel
vercel env ls

# Should show:
# VITE_GOOGLE_CLIENT_ID (Production, Preview, Development)
```

### Step 3: Check Google Console

```bash
1. Go to Google Cloud Console
2. Verify Authorized JavaScript origins
3. Add production domain if not there
4. Wait ~5 minutes for changes to propagate
```

### Step 4: Update CSP

```bash
1. Update vercel.json with required Google domains
2. Git commit and push
3. Wait for auto-deploy
4. Test again
```

### Step 5: Test in Incognito

```bash
# Clear cache issues by testing in incognito mode
1. Open incognito/private window
2. Go to your production URL
3. Check if Google button appears
```

---

## ✅ Quick Fix Checklist

Copy-paste checklist ini:

```
[ ] VITE_GOOGLE_CLIENT_ID set di Vercel environment variables
[ ] Redeployed setelah set environment variable
[ ] Domain added to Google Console Authorized JavaScript origins
[ ] CSP includes: accounts.google.com, www.gstatic.com, www.googleapis.com
[ ] Browser console shows no errors
[ ] Network tab shows Google scripts loading (200 OK)
[ ] Tested in incognito mode
[ ] Waited 5-10 minutes after making changes (propagation time)
```

---

## 🚀 Complete Working Configuration

### 1. Vercel Environment Variables

```bash
# Production
VITE_API_BASE_URL=https://api.track-hire.app/api
VITE_GOOGLE_CLIENT_ID=123456789012-abcdefghijklmnopqrstuvwxyz123456.apps.googleusercontent.com
```

### 2. Google Cloud Console

**Authorized JavaScript origins:**

```
https://track-hire.vercel.app
https://track-hire-git-main-yourusername.vercel.app
```

**Authorized redirect URIs:**

```
https://track-hire.vercel.app
https://track-hire-git-main-yourusername.vercel.app
```

### 3. vercel.json CSP (Already Updated)

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Content-Security-Policy",
          "value": "frame-src 'self' https://accounts.google.com https://www.google.com; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://accounts.google.com https://www.gstatic.com; style-src 'self' 'unsafe-inline' https://accounts.google.com; connect-src 'self' YOUR_API https://accounts.google.com https://www.googleapis.com;"
        }
      ]
    }
  ]
}
```

---

## 🧪 Testing Procedure

### Test 1: Local Production Build

```bash
npm run build
npm run preview
# Check if Google button appears at localhost:4173
```

### Test 2: Vercel Preview Deployment

```bash
# Push to non-main branch
git checkout -b test-google-oauth
git push origin test-google-oauth
# Test with preview URL
```

### Test 3: Production Deployment

```bash
# After confirming preview works
git checkout main
git merge test-google-oauth
git push origin main
# Test production URL
```

---

## 📚 Additional Resources

- [Google Identity Services](https://developers.google.com/identity/gsi/web)
- [@react-oauth/google Documentation](https://github.com/MomenSherif/react-oauth)
- [Content Security Policy Guide](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

---

## 🆘 Still Not Working?

### Last Resort Debug Steps:

#### 1. Check Raw HTML

```bash
# View page source (Ctrl+U)
# Search for: VITE_GOOGLE_CLIENT_ID
# Should NOT appear in HTML (env vars are replaced at build time)
```

#### 2. Inspect GoogleOAuthProvider

```javascript
// Add to RootLayout.tsx temporarily
console.log('GoogleOAuthProvider props:', {
  clientId: GOOGLE_CLIENT_ID,
  isEmpty: GOOGLE_CLIENT_ID === '',
  isUndefined: GOOGLE_CLIENT_ID === undefined,
})
```

#### 3. Test with Different Google Account

```bash
# Try logging in with different Google account
# Some accounts might be restricted by OAuth consent screen settings
```

#### 4. Temporary: Make Client ID Public for Testing

```javascript
// RootLayout.tsx - ONLY FOR DEBUGGING
const GOOGLE_CLIENT_ID = '123456789012-xxx.apps.googleusercontent.com' // Hardcoded

// If this works, environment variable is the issue
// If still doesn't work, Google Console configuration is the issue
```

---

## 🎯 Most Common Solution

**90% of cases:** Missing or not redeployed after setting `VITE_GOOGLE_CLIENT_ID`

```bash
# Fix:
1. Go to Vercel Dashboard
2. Settings → Environment Variables
3. Add VITE_GOOGLE_CLIENT_ID with your Client ID
4. Go to Deployments → Latest → Redeploy
5. Wait 2-3 minutes
6. Refresh your production site
7. Google button should appear ✅
```

---

**Good luck! 🚀**
