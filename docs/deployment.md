# Deployment Guide - Track Hire Frontend

Guide untuk deploy aplikasi Track Hire Frontend ke Vercel.

## 📋 Prerequisites

Sebelum deploy, pastikan Anda sudah:

- ✅ Punya akun [Vercel](https://vercel.com)
- ✅ Install [Vercel CLI](https://vercel.com/cli) (optional)
- ✅ Punya backend API yang sudah deploy
- ✅ Punya Google OAuth Client ID untuk production

## 🚀 Deployment Steps

### Option 1: Deploy via Vercel Dashboard (Recommended)

#### 1. Push ke GitHub

```bash
git add .
git commit -m "Ready for production deployment"
git push origin main
```

#### 2. Import Project ke Vercel

1. Buka [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Import repository GitHub Anda
4. Select `track-hire-fe` repository

#### 3. Configure Project

- **Framework Preset**: Vite
- **Root Directory**: `./` (default)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

#### 4. Environment Variables

Tambahkan environment variables berikut di Vercel:

| Key                     | Value                            | Description            |
| ----------------------- | -------------------------------- | ---------------------- |
| `VITE_API_BASE_URL`     | `https://api.track-hire.app/api` | Backend API URL        |
| `VITE_GOOGLE_CLIENT_ID` | `your-google-client-id`          | Google OAuth Client ID |

**Cara set environment variables:**

1. Go to **Settings** → **Environment Variables**
2. Add each variable
3. Select environment: **Production**, **Preview**, **Development**

#### 5. Deploy

1. Click **"Deploy"**
2. Wait for build to complete (~2-3 minutes)
3. Your app will be live at `https://your-app.vercel.app`

---

### Option 2: Deploy via Vercel CLI

#### 1. Install Vercel CLI

```bash
npm install -g vercel
```

#### 2. Login ke Vercel

```bash
vercel login
```

#### 3. Deploy ke Production

```bash
# First deployment (setup project)
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Select your account
# - Link to existing project? No
# - Project name? track-hire-fe
# - In which directory? ./
# - Want to override settings? No

# Deploy to production
vercel --prod
```

#### 4. Set Environment Variables via CLI

```bash
# Set API URL
vercel env add VITE_API_BASE_URL production
# Enter value: https://your-backend.com/api

# Set Google Client ID
vercel env add VITE_GOOGLE_CLIENT_ID production
# Enter value: your-google-client-id
```

#### 5. Redeploy with Environment Variables

```bash
vercel --prod
```

---

## 🔧 Configuration Files

### `vercel.json`

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

**Penjelasan:**

- `rewrites`: Redirect semua routes ke `index.html` untuk SPA routing
- `headers`: Set cache headers untuk static assets (1 year)

### `.vercelignore`

File ini menentukan apa yang tidak akan di-upload ke Vercel:

- `node_modules`
- `.git`
- `.env.local`
- Development files

### `.env.production`

Template untuk environment variables production.

---

## 🌍 Environment Variables Explained

### `VITE_API_BASE_URL`

URL backend API Anda. Contoh:

- Production: `https://api.trackhire.com/api`
- Staging: `https://staging-api.trackhire.com/api`

⚠️ **Important:** Pastikan backend Anda sudah setup CORS untuk domain Vercel:

```javascript
// Backend CORS config
app.use(
  cors({
    origin: [
      'https://your-app.vercel.app',
      'https://*.vercel.app', // All preview deployments
    ],
    credentials: true,
  })
)
```

### `VITE_GOOGLE_CLIENT_ID`

Google OAuth Client ID untuk production.

**Setup Google OAuth:**

1. Buka [Google Cloud Console](https://console.cloud.google.com)
2. Create atau pilih project
3. Enable **Google+ API**
4. Create **OAuth 2.0 Client ID** (Web application)
5. Add **Authorized JavaScript origins**:
   - `https://your-app.vercel.app`
   - `https://*.vercel.app` (for preview deployments)
6. Add **Authorized redirect URIs**:
   - `https://your-app.vercel.app`
   - `https://*.vercel.app`
7. Copy Client ID dan paste ke Vercel environment variables

---

## 🔄 Automatic Deployments

Setelah setup awal, Vercel akan otomatis deploy setiap kali:

- ✅ Push ke branch `main` → Production deployment
- ✅ Push ke branch lain → Preview deployment
- ✅ Open Pull Request → Preview deployment dengan unique URL

---

## 🧪 Testing Deployment

### 1. Check Build Locally

Sebelum deploy, test build di lokal:

```bash
# Build aplikasi
npm run build

# Preview hasil build
npm run preview
```

### 2. Test Production Build

Buka browser dan test:

- ✅ Login dengan email/password
- ✅ Login dengan Google
- ✅ Register dan verify email
- ✅ Forgot password flow
- ✅ Protected routes
- ✅ API calls ke backend

### 3. Check Console Errors

Buka Developer Console dan pastikan tidak ada errors:

- Network errors
- CORS errors
- JavaScript errors

---

## 🐛 Troubleshooting

### Build Fails

**Problem:** Build gagal di Vercel
**Solution:**

1. Check build logs di Vercel dashboard
2. Pastikan `npm run build` sukses di lokal
3. Check TypeScript errors: `npm run type-check`
4. Check linter: `npm run lint`

### CORS Errors

**Problem:** API calls gagal dengan CORS error
**Solution:**

1. Pastikan backend CORS sudah allow Vercel domain
2. Check `credentials: true` di backend CORS config
3. Verify `withCredentials: true` di axios config

### Environment Variables Not Working

**Problem:** Environment variables tidak terbaca
**Solution:**

1. Pastikan variable name diawali dengan `VITE_`
2. Redeploy setelah menambah environment variables
3. Check variable di Vercel dashboard settings
4. Pastikan environment dipilih (Production/Preview)

### Routes Return 404

**Problem:** Refresh halaman return 404
**Solution:**

1. Pastikan `vercel.json` sudah ada
2. Check rewrite rules di `vercel.json`
3. Redeploy aplikasi

### Google OAuth Not Working

**Problem:** Google Sign-In gagal
**Solution:**

1. Verify Google Client ID di environment variables
2. Check Authorized origins di Google Console
3. Pastikan domain Vercel sudah ditambahkan
4. Test dengan different Google account

---

## 📊 Post-Deployment Checklist

Setelah deployment, verifikasi:

- [ ] Aplikasi bisa diakses di Vercel URL
- [ ] Login dengan email/username works
- [ ] Google OAuth works
- [ ] Register flow works (including email verification)
- [ ] Forgot password works
- [ ] Reset password works
- [ ] Protected routes redirect to login
- [ ] API calls ke backend sukses
- [ ] No console errors
- [ ] Responsive design works di mobile
- [ ] HTTPS enabled (otomatis dari Vercel)
- [ ] Custom domain setup (optional)

---

## 🎯 Custom Domain (Optional)

### Setup Custom Domain:

1. Go to Vercel Dashboard → Project Settings
2. Click **"Domains"**
3. Add your domain (e.g., `trackhire.com`)
4. Follow DNS configuration instructions
5. Wait for DNS propagation (~24-48 hours)
6. Update Google OAuth authorized origins

### Update Environment Variables:

Setelah custom domain aktif, update:

- Backend CORS: allow custom domain
- Google OAuth: add custom domain to authorized origins

---

## 📝 Deployment Commands Reference

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod

# Check deployment status
vercel ls

# View logs
vercel logs [deployment-url]

# Remove deployment
vercel remove [deployment-url]

# Set environment variable
vercel env add [KEY] [production|preview|development]

# List environment variables
vercel env ls

# Pull environment variables to local
vercel env pull .env.local
```

---

## 🔐 Security Best Practices

1. **Never commit `.env` files** dengan credentials
2. **Use environment variables** untuk sensitive data
3. **Enable Vercel Authentication** jika perlu (Settings → Deployment Protection)
4. **Setup rate limiting** di backend
5. **Monitor deployments** untuk unauthorized access
6. **Use HTTPS only** (otomatis di Vercel)
7. **Keep dependencies updated**: `npm audit fix`

---

## 📚 Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [React Router + Vercel](https://vercel.com/guides/deploying-react-with-vercel)
- [Environment Variables in Vite](https://vitejs.dev/guide/env-and-mode.html)

---

## 🆘 Support

Jika ada masalah:

1. Check [Vercel Status](https://www.vercel-status.com/)
2. Lihat logs di Vercel dashboard
3. Search di [Vercel Discussions](https://github.com/vercel/vercel/discussions)
4. Contact Vercel Support (untuk Pro plan)

---

**Happy Deploying! 🚀**
