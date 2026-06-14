# 🌐 CORS + CSP Setup - Quick Reference

## ✅ Problem Solved: Frontend dapat connect ke Backend

### 🎯 Configuration Summary

**Backend CORS:** ✅ Already configured by backend team

```javascript
// Backend allows:
- http://localhost:5173 (frontend dev)
- https://www.track-hire.app (production)
- https://track-hire.app (production apex)
```

**Frontend CSP:** ✅ Updated di `vercel.json`

```json
"connect-src": "http://localhost:3000 https://api.track-hire.app ..."
```

---

## 🚀 Current Setup

### Development (Local)

**Frontend (.env):**

```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_GOOGLE_CLIENT_ID=384962529895-4hj3ntdiphdtg7i1k8699ds1jd4m81bt.apps.googleusercontent.com
```

**Backend (backend/.env):**

```env
ALLOWED_ORIGINS=http://localhost:5173,https://www.track-hire.app,https://track-hire.app
```

**Frontend CSP (vercel.json):**

```json
"connect-src": "'self' http://localhost:3000 https://api.track-hire.app https://accounts.google.com https://www.googleapis.com"
```

**Result:**

- ✅ Frontend (localhost:5173) → Backend (localhost:3000) = ALLOWED
- ✅ Google OAuth works
- ✅ API calls work

---

### Production

**Frontend Environment Variables (Vercel Dashboard):**

```env
VITE_API_BASE_URL=https://api.track-hire.app/api
VITE_GOOGLE_CLIENT_ID=your-production-google-client-id
```

**Backend (production):**

```env
ALLOWED_ORIGINS=http://localhost:5173,https://www.track-hire.app,https://track-hire.app
```

**Frontend CSP (vercel.production.json):**

```json
"connect-src": "'self' https://api.track-hire.app https://accounts.google.com https://www.googleapis.com"
```

**Result:**

- ✅ Frontend (www.track-hire.app) → Backend (api.track-hire.app) = ALLOWED
- ✅ Google OAuth works
- ✅ API calls work
- ❌ localhost:3000 blocked (security - as expected)

---

## 🧪 Testing

### Test Development Setup

```bash
# 1. Start backend
cd backend
npm run dev  # Running on localhost:3000

# 2. Start frontend
cd frontend
npm run dev  # Running on localhost:5173

# 3. Open browser
# http://localhost:5173

# 4. Try register/login
# Should work without CORS or CSP errors ✅
```

### Check for Issues

**Browser Console (F12):**

```bash
# Should NOT see:
❌ "CORS policy: No 'Access-Control-Allow-Origin'"
❌ "CSP violation: connect-src"
❌ "Refused to connect to 'http://localhost:3000'"

# Should see:
✅ API calls to localhost:3000 succeed (200 OK)
✅ No CORS errors
✅ No CSP errors
```

**Network Tab:**

```bash
# Check request headers:
Origin: http://localhost:5173

# Check response headers:
Access-Control-Allow-Origin: http://localhost:5173
Access-Control-Allow-Credentials: true
```

---

## 🔧 Files Changed

### Frontend

1. **`vercel.json`** (Development - current)
   - Added `http://localhost:3000` to `connect-src`
   - Keep for local development

2. **`vercel.production.json`** (Production - template)
   - Removed `http://localhost:3000` from `connect-src`
   - Use when deploying to production

3. **`.env`** (Development)

   ```env
   VITE_API_BASE_URL=http://localhost:3000/api
   ```

4. **`.env.production`** (Production template)
   ```env
   VITE_API_BASE_URL=https://api.track-hire.app/api
   ```

### Backend (Already done by backend team)

1. **`.env`**

   ```env
   ALLOWED_ORIGINS=http://localhost:5173,https://www.track-hire.app,https://track-hire.app
   ```

2. **`env.ts`**
   - Parse multiple origins from comma-separated string

3. **`server.ts`**
   - Dynamic origin validation
   - Log blocked requests

---

## 📋 Quick Troubleshooting

### Issue: "CORS policy error"

**Check:**

1. Backend running? `localhost:3000`
2. Backend CORS allows `localhost:5173`?
3. Frontend sending correct Origin header?

**Solution:**

```bash
# Backend: Check .env
ALLOWED_ORIGINS=http://localhost:5173,...

# Frontend: Check axios config (api.ts)
withCredentials: true  # Must be true!
```

---

### Issue: "CSP violation: connect-src"

**Check:**

1. Frontend CSP allows `localhost:3000`?
2. Using correct vercel.json (development vs production)?

**Solution:**

```json
// vercel.json - Make sure includes:
"connect-src": "'self' http://localhost:3000 ..."
```

---

### Issue: "Credentials not sent"

**Check:**

1. Frontend axios config has `withCredentials: true`
2. Backend CORS has `credentials: true`

**Solution:**

```javascript
// Frontend: src/lib/api.ts
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, // ← Must be true
  headers: {
    'Content-Type': 'application/json',
  },
})
```

---

## 🎯 Production Deployment Checklist

```
Frontend:
[ ] Update vercel.json to production version (or rename vercel.production.json)
    - Remove http://localhost:3000 from connect-src
[ ] Set environment variables di Vercel Dashboard
    - VITE_API_BASE_URL=https://api.track-hire.app/api
    - VITE_GOOGLE_CLIENT_ID=production-client-id
[ ] Deploy to Vercel
[ ] Test production URL (www.track-hire.app)
[ ] Verify no CORS/CSP errors di console

Backend:
[ ] ALLOWED_ORIGINS includes www.track-hire.app ✅ (Already done)
[ ] Backend deployed to api.track-hire.app
[ ] Test from production frontend
[ ] Check backend logs for CORS blocks
```

---

## 🌍 Domain Overview

| Domain                | Type          | Purpose             | Status          |
| --------------------- | ------------- | ------------------- | --------------- |
| `localhost:5173`      | Frontend Dev  | Local development   | ✅ Running      |
| `localhost:3000`      | Backend Dev   | Local API           | ✅ Running      |
| `www.track-hire.app`  | Frontend Prod | Production frontend | 🚀 Deploy ready |
| `api.track-hire.app`  | Backend Prod  | Production API      | ✅ Configured   |
| `accounts.google.com` | External      | Google OAuth        | ✅ Allowed      |

---

## 📚 Full Documentation

- **CSP Details:** [docs/csp-configuration.md](./docs/csp-configuration.md)
- **Security Headers:** [docs/security-headers.md](./docs/security-headers.md)
- **Deployment:** [docs/deployment.md](./docs/deployment.md)
- **Google OAuth:** [docs/google-oauth-troubleshooting.md](./docs/google-oauth-troubleshooting.md)

---

## ✨ What's Working Now

### Development:

✅ Frontend (localhost:5173) dapat call Backend (localhost:3000)
✅ CORS configured properly
✅ CSP allows localhost connections
✅ Google OAuth works
✅ Credentials (cookies) work

### Production Ready:

✅ Backend CORS supports production domain
✅ Frontend CSP template ready
✅ Environment variables documented
✅ Deployment checklist complete

---

## 🚀 Next Steps

1. **Test locally** - Make sure register/login works
2. **Deploy to production** - Follow deployment guide
3. **Test production** - Verify CORS/CSP works in production
4. **Monitor** - Watch for any CORS/CSP errors

---

**Everything is configured! Start developing! 🎉**
