# Security Headers Configuration

Dokumentasi security headers yang digunakan dalam `vercel.json`.

## 📋 Headers Explanation

### 1. Content-Security-Policy (CSP)

```
default-src 'self';
base-uri 'self';
frame-ancestors 'none';
frame-src 'self' https://accounts.google.com;
object-src 'none';
form-action 'self';
script-src 'self' 'unsafe-inline' 'unsafe-eval';
style-src 'self' 'unsafe-inline';
font-src 'self' data:;
img-src 'self' data: blob: https:;
connect-src 'self' http://localhost:3000 https://accounts.google.com;
upgrade-insecure-requests
```

**Penjelasan:**

- `default-src 'self'` - Default hanya allow konten dari origin yang sama
- `frame-ancestors 'none'` - Prevent clickjacking, tidak bisa di-embed di iframe
- `frame-src` - Allow Google OAuth iframe
- `script-src 'unsafe-inline' 'unsafe-eval'` - Diperlukan untuk Vite dev & React
- `connect-src` - Allow API calls ke localhost (dev) dan Google
- `img-src https:` - Allow images dari external (Google avatars, ImageKit)

**Development vs Production:**

- Dev: `connect-src` include `http://localhost:3000`
- Prod: `connect-src` hanya allow backend production URL

### 2. Access-Control-Allow-Origin

```
Development: *
Production: https://your-frontend-domain.vercel.app
```

**Penjelasan:**

- Dev: Allow all origins untuk testing
- Prod: Restrict ke domain spesifik

### 3. X-Frame-Options

```
DENY
```

**Penjelasan:**

- Prevent clickjacking attacks
- Website tidak bisa di-embed dalam iframe
- Proteksi terhadap UI redressing

### 4. X-Content-Type-Options

```
nosniff
```

**Penjelasan:**

- Prevent MIME type sniffing
- Browser akan respect Content-Type yang dideklarasikan
- Proteksi terhadap XSS attacks

### 5. Strict-Transport-Security (HSTS)

```
max-age=31536000; includeSubDomains; preload
```

**Penjelasan:**

- Force HTTPS selama 1 tahun (31536000 seconds)
- Apply ke semua subdomains
- Eligible untuk HSTS preload list

### 6. Referrer-Policy

```
strict-origin-when-cross-origin
```

**Penjelasan:**

- Send full referrer untuk same-origin requests
- Send only origin untuk cross-origin HTTPS requests
- No referrer untuk downgrade (HTTPS → HTTP)

### 7. Permissions-Policy

```
camera=(), microphone=(), geolocation=()
```

**Penjelasan:**

- Disable camera access
- Disable microphone access
- Disable geolocation access
- Reduce attack surface

### 8. Cross-Origin-Opener-Policy

```
same-origin
```

**Penjelasan:**

- Isolate browsing context
- Protect against Spectre-like attacks
- Prevent other origins from accessing window object

### 9. Cache-Control

```
no-cache, no-store, must-revalidate, private
```

**Penjelasan:**

- `no-cache` - Must revalidate before serving cache
- `no-store` - Don't store in cache
- `must-revalidate` - Check freshness before serving
- `private` - Only browser cache, not CDN

### 10. Pragma & Expires

```
Pragma: no-cache
Expires: 0
```

**Penjelasan:**

- Legacy cache control headers
- Backward compatibility dengan HTTP/1.0

---

## 🔧 Configuration for Different Environments

### Local Development (Current)

File: `vercel.json`

- Allow `http://localhost:3000` untuk backend
- Allow `'unsafe-eval'` untuk Vite HMR
- CORS: `*` (all origins)

### Production

File: `vercel.production.json.example`

- Replace `localhost:3000` dengan production backend URL
- Restrict CORS ke production domain
- Tighten CSP rules

---

## 🚀 How to Switch to Production

### Step 1: Update vercel.json

Replace URLs in `vercel.json`:

```json
{
  "connect-src": "https://api.trackhire.com https://accounts.google.com",
  "Access-Control-Allow-Origin": "https://trackhire.vercel.app"
}
```

### Step 2: Update Backend CORS

Backend harus allow frontend domain:

```javascript
// Backend CORS config
cors({
  origin: 'https://trackhire.vercel.app',
  credentials: true,
})
```

### Step 3: Test

1. Deploy ke Vercel
2. Check headers dengan browser DevTools
3. Test semua fitur auth
4. Verify no CORS errors

---

## 🧪 Testing Security Headers

### Using Browser DevTools

1. Open DevTools → Network tab
2. Load aplikasi
3. Click pada request pertama (document)
4. Check Response Headers
5. Verify semua security headers present

### Using Online Tools

- [Security Headers](https://securityheaders.com/)
- [Mozilla Observatory](https://observatory.mozilla.org/)
- [SSL Labs](https://www.ssllabs.com/)

### Expected Score

- Security Headers: A+ (after production tuning)
- Mozilla Observatory: B+ atau A
- SSL Labs: A+ (Vercel provides this by default)

---

## ⚠️ Common Issues

### Issue 1: Google OAuth Not Working

**Symptom:** Google Sign-In button tidak muncul atau error
**Solution:**

- Check `frame-src` includes `https://accounts.google.com`
- Check `connect-src` includes Google domains
- Verify Google Client ID di environment variables

### Issue 2: Images Not Loading

**Symptom:** Avatar/images dari external source tidak load
**Solution:**

- Check `img-src` includes image CDN domain
- Add specific domain: `img-src 'self' data: https://lh3.googleusercontent.com https://ik.imagekit.io`

### Issue 3: API Calls Blocked

**Symptom:** Console error "blocked by CSP"
**Solution:**

- Check `connect-src` includes backend API URL
- Verify backend URL di `.env`
- Test dengan browser console: `fetch('https://api.url.com/api/auth/me')`

### Issue 4: Styles Not Applied

**Symptom:** CSS tidak load atau inline styles tidak work
**Solution:**

- Keep `'unsafe-inline'` in `style-src` (required for CSS-in-JS)
- Add specific domains jika pakai external CSS

---

## 🔒 Security Best Practices

### 1. Regular Updates

- Review headers setiap 3-6 bulan
- Update sesuai best practices terbaru
- Monitor security advisories

### 2. Monitoring

- Setup monitoring untuk CSP violations
- Log errors di production
- Use `Content-Security-Policy-Report-Only` untuk testing

### 3. Testing

- Test di multiple browsers
- Check mobile devices
- Verify all user flows work

### 4. Documentation

- Document semua perubahan
- Keep changelog updated
- Share dengan team

---

## 📚 Resources

- [OWASP Secure Headers Project](https://owasp.org/www-project-secure-headers/)
- [MDN Web Security](https://developer.mozilla.org/en-US/docs/Web/Security)
- [Content Security Policy (CSP)](https://content-security-policy.com/)
- [Security Headers Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html)

---

**Note:** Security headers adalah layer pertahanan pertama. Selalu combine dengan security best practices lainnya seperti input validation, authentication, dan authorization.
