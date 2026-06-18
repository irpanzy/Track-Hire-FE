# 🔒 Content Security Policy (CSP) Configuration

Panduan lengkap untuk CSP configuration di Track Hire Frontend.

## 📋 Apa itu CSP?

Content Security Policy (CSP) adalah security layer tambahan yang membantu detect dan mitigate serangan seperti:

- Cross-Site Scripting (XSS)
- Data injection attacks
- Clickjacking

## 🌍 Environment-Based Configuration

### Development (Current: `vercel.json`)

**Used for:** Local development dan testing

```json
"connect-src": "'self' http://localhost:3000 https://api.track-hire.app https://accounts.google.com https://www.googleapis.com"
```

**Allowed connections:**

- ✅ `'self'` - Same origin (localhost:5173)
- ✅ `http://localhost:3000` - Local backend API
- ✅ `https://api.track-hire.app` - Production backend API (for testing)
- ✅ `https://accounts.google.com` - Google OAuth
- ✅ `https://www.googleapis.com` - Google APIs

---

### Production (`vercel.production.json`)

**Used for:** Production deployment

```json
"connect-src": "'self' https://api.track-hire.app https://accounts.google.com https://www.googleapis.com"
```

**Allowed connections:**

- ✅ `'self'` - Same origin (www.track-hire.app)
- ✅ `https://api.track-hire.app` - Production backend API only
- ✅ `https://accounts.google.com` - Google OAuth
- ✅ `https://www.googleapis.com` - Google APIs
- ❌ `http://localhost:3000` - REMOVED for security

---

## 🔧 Complete CSP Directives Explained

### 1. `default-src 'self'`

Default policy untuk semua resource types yang tidak explicitly defined.

### 2. `base-uri 'self'`

Restrict base URL untuk document. Prevent `<base>` tag injection.

### 3. `frame-ancestors 'none'`

Prevent clickjacking - website tidak bisa di-embed di iframe.

### 4. `frame-src`

```
'self' https://accounts.google.com https://www.google.com
```

Allow Google OAuth iframe untuk Sign-In popup.

### 5. `object-src 'none'`

Block Flash, Java, dan plugin objects lainnya.

### 6. `form-action 'self'`

Forms hanya bisa submit ke same origin.

### 7. `script-src`

```
'self' 'unsafe-inline' 'unsafe-eval' https://accounts.google.com https://www.gstatic.com
```

**Breakdown:**

- `'self'` - Scripts dari same origin
- `'unsafe-inline'` - Allow inline `<script>` (required untuk Vite HMR)
- `'unsafe-eval'` - Allow `eval()` (required untuk Vite development)
- `https://accounts.google.com` - Google Sign-In scripts
- `https://www.gstatic.com` - Google static files

⚠️ **Production note:** Consider removing `'unsafe-inline'` dan `'unsafe-eval'` jika possible.

### 8. `style-src`

```
'self' 'unsafe-inline' https://accounts.google.com
```

Allow styles dari same origin, inline styles (Tailwind/CSS-in-JS), dan Google OAuth styles.

### 9. `font-src`

```
'self' data:
```

Allow fonts dari same origin dan data URIs (untuk icon fonts).

### 10. `img-src`

```
'self' data: blob: https:
```

**Breakdown:**

- `'self'` - Images dari same origin
- `data:` - Data URI images (base64)
- `blob:` - Blob URLs (untuk user uploads)
- `https:` - Allow all HTTPS images (untuk Google avatars, external images)

### 11. `connect-src` (MOST IMPORTANT!)

```
Development: 'self' http://localhost:3000 https://api.track-hire.app https://accounts.google.com https://www.googleapis.com
Production: 'self' https://api.track-hire.app https://accounts.google.com https://www.googleapis.com
```

Ini yang mengontrol fetch/XMLHttpRequest/WebSocket connections.

### 12. `upgrade-insecure-requests`

Automatically upgrade HTTP requests to HTTPS di production.

---

## 🚀 Switching Between Environments

### For Local Development (Current)

File: `vercel.json`

```bash
# Already configured - includes localhost:3000
npm run dev  # Uses .env with localhost:3000
```

### For Production Deployment

**Option 1: Rename files (Manual)**

```bash
# Before deploying to production
mv vercel.json vercel.development.json
mv vercel.production.json vercel.json

# Deploy
vercel --prod

# After testing locally, switch back
mv vercel.json vercel.production.json
mv vercel.development.json vercel.json
```

**Option 2: Use separate configs (Recommended)**

Keep current setup:

- `vercel.json` - Development (includes localhost)
- `vercel.production.json` - Production (no localhost)

Deploy to production:

```bash
# Vercel will use vercel.json by default
# Manual: copy vercel.production.json to vercel.json before deploy
# Or use Vercel dashboard environment variables
```

**Option 3: Environment Variables (Best)**

Unfortunately, Vercel doesn't support dynamic CSP via env vars directly in vercel.json.

Alternative: Use runtime CSP via middleware or server-side rendering.

---

## 🧪 Testing CSP

### 1. Check CSP is Applied

```bash
# Open browser DevTools
# Network tab → Select document request → Headers → Response Headers
# Look for: Content-Security-Policy
```

### 2. Test CSP Violations

```javascript
// This should be blocked by CSP
fetch('https://malicious-site.com/api/data').catch((err) =>
  console.log('Blocked by CSP!')
) // ✅ Expected
```

### 3. Check Console for CSP Errors

```
❌ Refused to connect to 'http://localhost:3000' because it violates the following Content Security Policy directive: "connect-src 'self' https://api.track-hire.app"

Solution: Add http://localhost:3000 to connect-src (already done in vercel.json)
```

---

## 🐛 Common CSP Issues & Solutions

### Issue 1: API Calls Blocked

**Symptom:**

```
CSP violation: connect-src
Refused to connect to 'http://localhost:3000/api/auth/login'
```

**Solution:**

```json
// vercel.json - Update connect-src
"connect-src": "'self' http://localhost:3000 ..."
```

### Issue 2: Google OAuth Button Not Loading

**Symptom:**

```
CSP violation: script-src
Refused to load script from 'https://accounts.google.com/gsi/client'
```

**Solution:**

```json
// Already fixed in vercel.json
"script-src": "'self' ... https://accounts.google.com https://www.gstatic.com"
"frame-src": "'self' https://accounts.google.com https://www.google.com"
"connect-src": "'self' ... https://accounts.google.com https://www.googleapis.com"
```

### Issue 3: Images Not Loading

**Symptom:**

```
CSP violation: img-src
Refused to load image from 'https://lh3.googleusercontent.com/...'
```

**Solution:**

```json
// Already fixed in vercel.json
"img-src": "'self' data: blob: https:"
// Note: https: allows ALL https images
```

### Issue 4: Inline Styles Blocked

**Symptom:**

```
CSP violation: style-src
Refused to apply inline style
```

**Solution:**

```json
// Already includes 'unsafe-inline' for Tailwind
"style-src": "'self' 'unsafe-inline'"
```

---

## 🔐 Security Best Practices

### ✅ Do's

1. **Keep CSP as strict as possible**
   - Only allow domains you actually use
   - Remove localhost dari production

2. **Use specific domains instead of wildcards**
   - ✅ `https://accounts.google.com`
   - ❌ `https://*.google.com`

3. **Test CSP before deploying**

   ```bash
   npm run build
   npm run preview  # Test production build locally
   ```

4. **Monitor CSP violations**

   ```javascript
   // Add CSP violation reporting
   document.addEventListener('securitypolicyviolation', (e) => {
     console.warn('CSP Violation:', e.violatedDirective, e.blockedURI)
   })
   ```

5. **Different CSP for dev vs production**
   - Dev: More permissive (include localhost, unsafe-eval)
   - Prod: Strict (no localhost, consider removing unsafe-\*)

### ❌ Don'ts

1. **Don't use `'unsafe-inline'` di production jika possible**
   - Risk: XSS attacks
   - Alternative: Use nonces atau hashes

2. **Don't use `https:` wildcard jika bisa lebih specific**
   - Current: `img-src https:` (allow all https images)
   - Better: `img-src 'self' https://lh3.googleusercontent.com` (specific)

3. **Don't disable CSP completely**
   - Jangan remove CSP headers karena error
   - Debug dan fix issue instead

---

## 📊 Current Configuration Summary

| Directive     | Development                                  | Production                  |
| ------------- | -------------------------------------------- | --------------------------- |
| `connect-src` | localhost:3000 + api.track-hire.app + Google | api.track-hire.app + Google |
| `script-src`  | unsafe-inline + unsafe-eval + Google         | Same (for Vite)             |
| `frame-src`   | Google OAuth                                 | Same                        |
| `img-src`     | All HTTPS                                    | Same                        |
| `style-src`   | unsafe-inline                                | Same (for Tailwind)         |

---

## 🎯 Production Deployment Checklist

Sebelum deploy production:

```
[ ] Update vercel.json to use production CSP
    - Remove http://localhost:3000 dari connect-src
    - Keep only https://api.track-hire.app

[ ] Set environment variables di Vercel
    - VITE_API_BASE_URL=https://api.track-hire.app/api
    - VITE_GOOGLE_CLIENT_ID=production-client-id

[ ] Update backend CORS
    - ALLOWED_ORIGINS include www.track-hire.app

[ ] Test di preview deployment first
    - Deploy ke branch test
    - Verify CSP di Network tab
    - Test all features (login, Google OAuth, API calls)

[ ] Deploy to production
    - Push to main branch
    - Wait for deployment
    - Verify CSP headers
    - Test all features again
```

---

## 🔄 Quick Reference Commands

```bash
# Test production build locally
npm run build
npm run preview

# Check CSP in browser
# F12 → Network → Select HTML document → Headers → Response Headers

# Deploy to Vercel
git push origin main  # Auto-deploy
# or
vercel --prod  # Manual deploy

# Check deployed CSP
curl -I https://www.track-hire.app | grep -i content-security-policy
```

---

## 📚 Additional Resources

- [MDN CSP Guide](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [CSP Evaluator](https://csp-evaluator.withgoogle.com/)
- [CSP Generator](https://report-uri.com/home/generate)
- [Vercel Headers](https://vercel.com/docs/concepts/projects/project-configuration#headers)

---

## 🆘 Still Having Issues?

1. Check browser console untuk CSP violation details
2. Verify vercel.json syntax (valid JSON)
3. Clear browser cache (Ctrl+Shift+Delete)
4. Test di incognito mode
5. Check [security-headers.md](./security-headers.md) untuk related issues

---

**CSP adalah critical untuk security, tapi jangan sampai block legitimate functionality!** Balance security dengan usability. 🔒✨
