# 🔍 Deployment Check - Google OAuth Not Working

## Issue
Google OAuth shows "Missing required parameter: client_id" in production.

## Root Cause
`VITE_GOOGLE_CLIENT_ID` environment variable is not set or not applied in production build.

## Solution Steps

### 1. Verify Environment Variable in Vercel

Go to: https://vercel.com/dashboard

1. Select project: **track-hire-fe**
2. Settings → Environment Variables
3. Check `VITE_GOOGLE_CLIENT_ID`

**Should be:**
```
Key: VITE_GOOGLE_CLIENT_ID
Value: 384962529895-4hj3ntdiphdtg7i1k8699ds1jd4m81bt.apps.googleusercontent.com
Environments: ✅ Production ✅ Preview ✅ Development
```

**If not set or wrong:**
- Click "Add New" or "Edit"
- Set correct value
- Make sure ALL environments checked
- Save

### 2. Force Redeploy

**After setting environment variable, you MUST redeploy!**

**Option A: Via Git (Force)**
```bash
# Create dummy commit to force redeploy
git commit --allow-empty -m "Force redeploy: Apply Google OAuth Client ID"
git push origin main
```

**Option B: Via Vercel Dashboard**
```
1. Go to Deployments tab
2. Find latest deployment
3. Click ⋮ (3 dots) → Redeploy
4. Confirm
```

### 3. Verify Build Logs

After redeploy starts:
```
1. Go to Vercel Dashboard → Deployments
2. Click on the running deployment
3. Check build logs
4. Look for: "VITE_API_BASE_URL" or environment variables section
5. Should show env vars are being used
```

### 4. Wait for Completion

- Deployment: 2-3 minutes
- Google OAuth propagation: 5-10 minutes
- **Total wait time: ~10-15 minutes**

### 5. Test After Deploy

**Clear cache first:**
```
Ctrl + Shift + Delete
Clear: Cookies and cached files
Time range: Last hour
```

**Test in incognito:**
```
1. Open incognito window
2. Go to: https://www.track-hire.app/login
3. Click "Login dengan Google"
4. Should work! ✅
```

## Debug: Check if Env Var is Applied

**Method 1: Check Network Request**
```
1. F12 → Network tab
2. Reload page
3. Look for Google OAuth requests
4. Should include client_id parameter with actual ID
```

**Method 2: Inspect Built JavaScript**
```
1. F12 → Sources tab
2. Search in files for: "384962529895"
3. If found → ✅ Env var applied
4. If not found → ❌ Need to redeploy again
```

## Common Mistakes

❌ **Setting env var but NOT redeploying**
   → Env vars only apply to NEW builds!

❌ **Not selecting all environments**
   → Make sure Production is checked

❌ **Testing too soon after deploy**
   → Wait 10-15 minutes total

❌ **Using old browser cache**
   → Always test in incognito after deploy

## Verification Checklist

```
[ ] Environment variable set in Vercel Dashboard
[ ] All environments checked (Production, Preview, Development)
[ ] Redeployed after setting env var
[ ] Waited for deployment to complete
[ ] Waited 10 minutes for Google propagation
[ ] Cleared browser cache
[ ] Tested in incognito mode
[ ] Google OAuth button appears
[ ] Can click and select account
[ ] Login successful
```

## If Still Not Working

1. **Check Vercel deployment logs** for errors
2. **Verify Google Console** domains are correct
3. **Test localhost first** to isolate issue
4. **Check browser console** for exact error messages
5. **Contact support** with deployment URL and error screenshots

---

**Last Updated:** 2026-06-14
**Client ID:** 384962529895-4hj3ntdiphdtg7i1k8699ds1jd4m81bt.apps.googleusercontent.com
