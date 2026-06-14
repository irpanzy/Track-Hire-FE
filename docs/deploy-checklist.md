# 🚀 Deployment Checklist

Quick checklist sebelum deploy Track Hire Frontend ke Vercel.

## ✅ Pre-Deployment Checklist

### 1. Code Quality

- [ ] Run `npm run lint` - No errors
- [ ] Run `npm run build` - Build success
- [ ] Run `npm run preview` - Test production build locally
- [ ] All features tested dan working
- [ ] No console errors di browser

### 2. Environment Variables

- [ ] Backend API URL sudah disiapkan
- [ ] Google OAuth Client ID production sudah dibuat
- [ ] Backend CORS sudah configured untuk allow frontend domain
- [ ] File `.env.production` sudah diupdate (jangan commit!)

### 3. Configuration Files

- [ ] `vercel.json` - Security headers configured
- [ ] `.vercelignore` - File ignore list ready
- [ ] `package.json` - Build scripts correct
- [ ] `vite.config.ts` - Production optimizations

### 4. Backend Readiness

- [ ] Backend API sudah deployed
- [ ] Backend health check endpoint working
- [ ] CORS configured dengan frontend domain
- [ ] Cookie `sameSite` dan `secure` flags set correctly
- [ ] Rate limiting enabled

### 5. Google OAuth Setup

- [ ] Production OAuth Client ID created
- [ ] Authorized JavaScript origins added
- [ ] Authorized redirect URIs added
- [ ] Consent screen configured

---

## 📝 Quick Deploy Commands

### Using Vercel Dashboard (Recommended)

```bash
# 1. Push ke GitHub
git add .
git commit -m "Ready for deployment"
git push origin main

# 2. Import project di Vercel dashboard
# 3. Configure environment variables
# 4. Deploy!
```

### Using Vercel CLI

```bash
# Install CLI
npm install -g vercel

# Login
vercel login

# Deploy to production
vercel --prod

# Set environment variables
vercel env add VITE_API_BASE_URL production
vercel env add VITE_GOOGLE_CLIENT_ID production

# Redeploy
vercel --prod
```

---

## 🔧 Environment Variables to Set

Di Vercel Dashboard → Settings → Environment Variables:

| Variable                | Example Value                              | Environment |
| ----------------------- | ------------------------------------------ | ----------- |
| `VITE_API_BASE_URL`     | `https://api.trackhire.com/api`            | Production  |
| `VITE_GOOGLE_CLIENT_ID` | `123456789-xxx.apps.googleusercontent.com` | Production  |

---

## 🧪 Post-Deployment Testing

### Critical Paths

- [ ] Homepage loads
- [ ] Login with email/username works
- [ ] Login with Google works
- [ ] Register flow works
- [ ] Email verification works
- [ ] Forgot password works
- [ ] Reset password works
- [ ] Protected routes redirect correctly
- [ ] Logout works
- [ ] API calls successful (check Network tab)

### Browser Testing

- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari (if available)
- [ ] Mobile Chrome
- [ ] Mobile Safari

### Security Checks

- [ ] HTTPS enabled (automatic via Vercel)
- [ ] Security headers present (check DevTools)
- [ ] No console errors
- [ ] No CORS errors
- [ ] Cookies set correctly with HttpOnly and Secure flags

---

## 🐛 Common Issues & Solutions

### Issue: Build Fails

```bash
# Check locally first
npm run build

# Fix TypeScript errors
npm run type-check

# Fix linting errors
npm run lint --fix
```

### Issue: CORS Errors

```javascript
// Backend must allow your Vercel domain
cors({
  origin: 'https://your-app.vercel.app',
  credentials: true,
})
```

### Issue: Environment Variables Not Working

```bash
# Redeploy after adding environment variables
vercel --prod

# Or trigger redeploy from dashboard
```

### Issue: Google OAuth Not Working

1. Check Authorized origins in Google Console
2. Verify Client ID in Vercel environment variables
3. Check CSP headers allow `accounts.google.com`

---

## 📊 Monitoring

### What to Monitor

- [ ] Error rate (Vercel Analytics)
- [ ] Load time (Vercel Speed Insights)
- [ ] API response times
- [ ] Failed authentications
- [ ] Console errors (setup error tracking)

### Recommended Tools

- Vercel Analytics (built-in)
- Sentry (error tracking)
- Google Analytics (user analytics)
- LogRocket (session replay)

---

## 🔄 Continuous Deployment

After initial setup, Vercel will automatically:

- ✅ Deploy on push to `main` branch → Production
- ✅ Deploy on push to other branches → Preview
- ✅ Deploy on Pull Requests → Preview with unique URL

---

## 📚 Quick Links

- [Vercel Dashboard](https://vercel.com/dashboard)
- [Project Settings](https://vercel.com/your-org/track-hire-fe/settings)
- [Deployment Logs](https://vercel.com/your-org/track-hire-fe/deployments)
- [Environment Variables](https://vercel.com/your-org/track-hire-fe/settings/environment-variables)

---

## 🆘 Need Help?

1. Check [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed guide
2. Check [SECURITY-HEADERS.md](./SECURITY-HEADERS.md) for security config
3. Search [Vercel Docs](https://vercel.com/docs)
4. Check deployment logs in Vercel dashboard

---

**Ready to Deploy? Let's Go! 🚀**
