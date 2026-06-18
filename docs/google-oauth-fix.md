# 🔴 QUICK FIX: Google Button Tidak Muncul di Production

## Problem

Google "Continue with Google" button tidak muncul di production Vercel, tapi di lokal ada.

---

## ✅ Solution (90% berhasil)

### Step 1: Set Environment Variable di Vercel

1. Buka [Vercel Dashboard](https://vercel.com/dashboard)
2. Pilih project **track-hire-fe**
3. Go to **Settings** → **Environment Variables**
4. Click **"Add New"**

```
Key: VITE_GOOGLE_CLIENT_ID
Value: 384962529895-4hj3ntdiphdtg7i1k8699ds1jd4m81bt.apps.googleusercontent.com
Environment: Production ✅ Preview ✅ Development ✅
```

5. Click **"Save"**

### Step 2: Redeploy (WAJIB!)

Environment variables hanya apply setelah redeploy.

**Option A: Via Dashboard**

1. Go to **Deployments**
2. Click pada deployment terakhir
3. Click **"Redeploy"** (3 dots menu)
4. Wait 2-3 minutes

**Option B: Via Git Push**

```bash
git add .
git commit -m "Update vercel.json CSP for Google OAuth"
git push origin main
```

### Step 3: Verify

1. Wait 2-3 minutes untuk deployment selesai
2. Refresh production URL
3. Google button should appear ✅

---

## 🔧 Additional: Update Google Cloud Console

Jika masih belum muncul, tambahkan domain Vercel ke Google Console:

### 1. Buka [Google Cloud Console](https://console.cloud.google.com/)

### 2. Go to: APIs & Services → Credentials

### 3. Click pada OAuth 2.0 Client ID Anda

### 4. Add Authorized JavaScript origins:

```
https://track-hire.vercel.app
https://track-hire-git-main-yourusername.vercel.app
```

⚠️ **Format HARUS:**

- ✅ `https://track-hire.vercel.app` (no trailing slash)
- ❌ `https://track-hire.vercel.app/` (dengan slash = SALAH)
- ❌ `http://` (harus `https://`)

### 5. Click "Save"

### 6. Wait 5-10 minutes untuk perubahan propagate

---

## 🧪 Test

### 1. Check Console

```bash
F12 → Console tab
# Should NOT see errors like:
# - "idpiframe_initialization_failed"
# - "Origin mismatch"
# - CSP violations
```

### 2. Check Network

```bash
F12 → Network tab → Refresh
# Look for:
✅ accounts.google.com/gsi/client (200 OK)
✅ www.gstatic.com/... (200 OK)
```

### 3. Try Login

- Google button should appear
- Click button
- Google popup should open
- Select account
- Should redirect to dashboard

---

## 📋 Quick Checklist

```
[ ] VITE_GOOGLE_CLIENT_ID added to Vercel environment variables
[ ] All environments selected (Production, Preview, Development)
[ ] Redeployed after adding environment variable
[ ] Waited 2-3 minutes for deployment to complete
[ ] Refreshed browser (Ctrl+Shift+R untuk hard refresh)
[ ] (Optional) Domain added to Google Console Authorized origins
[ ] (Optional) Waited 5-10 minutes after Google Console changes
```

---

## 🆘 Still Not Working?

Read full troubleshooting guide:
📚 **[docs/google-oauth-troubleshooting.md](./docs/google-oauth-troubleshooting.md)**

Common issues:

1. Environment variable salah nama (must be `VITE_GOOGLE_CLIENT_ID`)
2. Lupa redeploy setelah set environment variable
3. Browser cache (test di incognito mode)
4. Google Console domain belum propagate (wait 10 mins)
5. CSP blocking (sudah fixed di vercel.json)

---

## 📝 What Changed

### 1. Updated `vercel.json` CSP Headers

Added Google OAuth required domains:

- `https://accounts.google.com`
- `https://www.gstatic.com`
- `https://www.googleapis.com`
- `https://www.google.com`

### 2. Created Troubleshooting Guide

Full guide di: `docs/google-oauth-troubleshooting.md`

---

## 🎯 Expected Result

**Before:**

```
OR CONTINUE WITH

[empty space - no button]
```

**After:**

```
OR CONTINUE WITH

[Continue with Google button appears]
```

---

**Good luck! 90% chance ini solve masalahnya! 🚀**

If still issues, check `docs/google-oauth-troubleshooting.md` untuk detailed debugging.
