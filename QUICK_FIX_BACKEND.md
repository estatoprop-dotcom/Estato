# ⚡ Quick Fix: Backend Timeout Issue

## 🎯 The Problem
Login/Signup showing: **"Request timeout - check your internet connection"**

## 🔍 Root Cause
Your Flutter app is trying to connect to: `https://champ-y6eg.onrender.com/api`

This URL might not be your actual backend!

---

## ✅ Solution (2 Minutes)

### Step 1: Find Your Backend URL

**Do you have a backend deployed?**

- **YES** → What's the URL? (e.g., `https://your-app.onrender.com`)
- **NO** → Use local backend for testing

### Step 2: Update Flutter App

**Open:** `lib/services/config_service.dart`

**Find lines 12-13:**
```dart
static const String baseUrl = 'https://champ-y6eg.onrender.com/api';
static const String apiBaseUrl = 'https://champ-y6eg.onrender.com/api';
```

**Replace with YOUR backend URL:**
```dart
static const String baseUrl = 'https://YOUR-BACKEND-URL.com/api';
static const String apiBaseUrl = 'https://YOUR-BACKEND-URL.com/api';
```

### Step 3: Rebuild App

```bash
flutter clean
flutter pub get
flutter run
```

**Done!** ✅

---

## 🏠 Option: Use Local Backend (For Testing)

### 1. Start Backend
```bash
cd backend/backend
npm install
npm start
```

### 2. Get Your Computer's IP
```bash
ipconfig
```
Look for **IPv4 Address** (e.g., `192.168.1.100`)

### 3. Update Flutter App
```dart
// In lib/services/config_service.dart
static const String apiBaseUrl = 'http://192.168.1.100:3000/api';
```

### 4. Run App
```bash
flutter run
```

**Note:** Phone and computer must be on same WiFi!

---

## 🚀 Option: Deploy New Backend

### Quick Deploy to Render

1. **Go to:** https://render.com
2. **New** → **Web Service**
3. **Connect** your GitHub repo
4. **Root Directory:** `backend/backend`
5. **Build Command:** `npm install`
6. **Start Command:** `npm start`
7. **Add Environment Variables:**
   ```
   PORT=10000
   NODE_ENV=production
   SUPABASE_URL=your-supabase-url
   SUPABASE_ANON_KEY=your-key
   JWT_SECRET=your-secret
   ```
8. **Deploy**
9. **Copy URL** (e.g., `https://your-app.onrender.com`)
10. **Update Flutter app** with this URL

---

## 🧪 Test Backend is Working

### In Browser:
Open: `https://your-backend-url.com/health`

**Should see:**
```json
{
  "success": true,
  "message": "Estato API is running"
}
```

### In Terminal:
```bash
curl https://your-backend-url.com/health
```

---

## ⚠️ Common Issues

### "Connection refused"
→ Backend is not running
→ Check URL is correct

### "Timeout" (but backend works in browser)
→ Increase timeout in Flutter:
```dart
// In lib/services/config_service.dart
static const Duration apiTimeout = Duration(seconds: 60);
```

### "404 Not Found"
→ Make sure URL ends with `/api`
→ Check backend routes

---

## 📝 Quick Checklist

- [ ] I know my backend URL
- [ ] Updated `config_service.dart` with correct URL
- [ ] Ran `flutter clean`
- [ ] Ran `flutter pub get`
- [ ] Tested backend in browser (works!)
- [ ] Rebuilt Flutter app
- [ ] Login/Signup works now! ✅

---

## 🎯 TL;DR

**3 Steps to Fix:**

1. **Edit** `lib/services/config_service.dart`
   - Replace `https://champ-y6eg.onrender.com/api`
   - With your actual backend URL

2. **Run:**
   ```bash
   flutter clean && flutter pub get
   ```

3. **Test:**
   ```bash
   flutter run
   ```

**Fixed!** ✅

---

**Need help finding your backend URL?**
- Check Render dashboard
- Check your backend deployment
- Ask your backend developer
- Or use local backend for testing

---

**All other issues already fixed!** 🎉
- ✅ Asset errors
- ✅ App size
- ✅ Startup speed
- ✅ Login persistence
- ✅ Wishlist crashes
- ✅ Branding

**Just need the right backend URL!** 🎯

