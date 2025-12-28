# 🔧 Backend Connection & Timeout Fix

## 🎯 Issues Found

### 1. ❌ Asset Error: "Estato Logo.png" not found
**Status:** ✅ **FIXED**

**Problem:** Code was looking for `Estato Logo.png` but file is named `Estato App Logo.png`

**Files Fixed:**
- ✅ `lib/screens/splash_screen.dart`
- ✅ `lib/screens/auth/login_screen.dart`
- ✅ `lib/screens/profile/profile_screen.dart`
- ✅ `lib/screens/onboarding/welcome_screen.dart`

---

### 2. ⏱️ Backend Timeout Issue
**Problem:** Login/Signup showing "Request timeout - check your internet connection"

**Root Cause:** Backend URL `https://champ-y6eg.onrender.com/api` may be:
1. Not deployed/running
2. On free tier (cold start delay)
3. Wrong URL

---

## ✅ Solutions

### Option 1: Use Your Own Backend (Recommended)

If you have your own backend deployed, update the URL:

**Edit `lib/services/config_service.dart`:**
```dart
// Replace this:
static const String apiBaseUrl = 'https://champ-y6eg.onrender.com/api';

// With your actual backend URL:
static const String apiBaseUrl = 'https://your-backend-url.com/api';
```

---

### Option 2: Deploy New Backend to Render

1. **Go to Render Dashboard:** https://render.com
2. **Create New Web Service**
3. **Connect your GitHub repo:** `Estato/backend`
4. **Configure:**
   - **Build Command:** `cd backend && npm install`
   - **Start Command:** `cd backend && npm start`
   - **Environment Variables:**
     ```
     PORT=10000
     NODE_ENV=production
     SUPABASE_URL=your-supabase-url
     SUPABASE_ANON_KEY=your-supabase-key
     SUPABASE_SERVICE_ROLE_KEY=your-service-key
     JWT_SECRET=your-jwt-secret
     OPENROUTER_API_KEY=your-openrouter-key
     ```
5. **Deploy**
6. **Copy the URL** (e.g., `https://your-app.onrender.com`)
7. **Update Flutter app** with new URL

---

### Option 3: Test with Local Backend

For development/testing:

1. **Start local backend:**
   ```bash
   cd backend/backend
   npm install
   npm start
   ```

2. **Get your local IP:**
   ```bash
   ipconfig
   # Look for IPv4 Address (e.g., 192.168.1.100)
   ```

3. **Update Flutter app:**
   ```dart
   // In lib/services/config_service.dart
   static const String apiBaseUrl = 'http://192.168.1.100:3000/api';
   ```

4. **Rebuild app:**
   ```bash
   flutter run
   ```

---

### Option 4: Increase Timeout (Temporary Fix)

If backend is slow (Render free tier cold start):

**Edit `lib/services/api_client.dart`:**

Find the timeout duration and increase it:
```dart
// Change from:
.timeout(const Duration(seconds: 30))

// To:
.timeout(const Duration(seconds: 60))
```

---

## 🔍 Verify Backend is Running

### Test Backend Health

```bash
# Test if backend is accessible
curl https://champ-y6eg.onrender.com/health

# Or in browser:
# Open: https://champ-y6eg.onrender.com/health
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Estato API is running",
  "timestamp": "2025-12-28T..."
}
```

### Test Login Endpoint

```bash
curl -X POST https://champ-y6eg.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}'
```

---

## 📱 Update Flutter App Configuration

### Step 1: Update Config Service

**File: `lib/services/config_service.dart`**

```dart
class ConfigService {
  // Update this URL to your actual backend
  static const String apiBaseUrl = 'https://YOUR-BACKEND-URL.com/api';
  
  // Increase timeout for slow connections
  static const Duration apiTimeout = Duration(seconds: 60);
  
  // Rest of the code...
}
```

### Step 2: Rebuild App

```bash
flutter clean
flutter pub get
flutter run
```

---

## 🚀 Quick Fix Commands

### If you have your own backend URL:

```bash
# 1. Update the URL in config_service.dart (use your editor)

# 2. Clean and rebuild
flutter clean
flutter pub get
flutter run
```

### If testing locally:

```bash
# Terminal 1 - Start backend
cd backend/backend
npm install
npm start

# Terminal 2 - Get your IP
ipconfig

# Terminal 3 - Update Flutter and run
# (Update apiBaseUrl to http://YOUR-IP:3000/api)
flutter run
```

---

## 🐛 Troubleshooting

### Error: "Connection refused"
**Solution:** Backend is not running
- Check if backend is deployed
- Check if URL is correct
- Try accessing URL in browser

### Error: "Timeout"
**Solution:** Backend is slow (cold start)
- Wait 30 seconds and try again
- Increase timeout duration
- Use paid Render plan (no cold start)

### Error: "404 Not Found"
**Solution:** Wrong endpoint
- Check URL ends with `/api`
- Verify backend routes are correct

### Error: "CORS error" (in browser)
**Solution:** Backend CORS not configured
- Add your domain to ALLOWED_ORIGINS
- Restart backend

---

## 📋 Backend Environment Variables Needed

```env
# Required
PORT=10000
NODE_ENV=production
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
JWT_SECRET=your-secret-key-here

# For AI features
OPENROUTER_API_KEY=sk-or-v1-your-key

# Optional
ALLOWED_ORIGINS=https://your-domain.com,https://app.your-domain.com
```

---

## ✅ Verification Checklist

After fixing:

- [ ] Backend health endpoint returns 200
- [ ] Login endpoint responds (even with error)
- [ ] Flutter app shows correct error messages
- [ ] No "asset not found" errors
- [ ] App doesn't crash on timeout

---

## 🎯 Recommended Solution

**For Production:**
1. Deploy backend to Render (or other hosting)
2. Set all environment variables
3. Update Flutter app with production URL
4. Test thoroughly
5. Build release APK

**For Development:**
1. Run backend locally
2. Use local IP in Flutter app
3. Test all features
4. Fix issues before production

---

## 📞 Need Help?

If backend is still timing out:

1. **Check Render logs:**
   - Go to Render Dashboard
   - Select your service
   - View logs
   - Look for errors

2. **Test backend directly:**
   ```bash
   curl -v https://your-backend.com/health
   ```

3. **Check Flutter logs:**
   ```bash
   flutter logs
   ```

---

**All asset errors fixed!** ✅

**Backend connection guide complete!** ✅

**Follow the steps above to fix timeout issues!** 🚀

