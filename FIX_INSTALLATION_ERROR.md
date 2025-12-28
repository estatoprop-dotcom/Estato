# 🔧 Fix "App Not Installed - Package Conflicts" Error

## 🎯 Problem
You're getting "App not installed as app package conflicts with installed one" error.

## 📋 Causes
1. **Different signing key** - Debug vs Release build
2. **Old version installed** - Signed with different key
3. **Version code mismatch** - Lower version than installed

---

## ✅ Solution 1: Uninstall Old Version (Recommended)

### Method A: From Device
1. Go to **Settings** → **Apps**
2. Find **Estato**
3. Tap **Uninstall**
4. Install new APK

### Method B: Using ADB
```bash
adb uninstall estato.lucknow
```

Then install new APK:
```bash
adb install build\app\outputs\flutter-apk\app-arm64-v8a-release.apk
```

---

## ✅ Solution 2: Increase Version Code

If you want to keep both versions, increase the version:

**Edit `pubspec.yaml`:**
```yaml
version: 1.0.2+3  # Changed from 1.0.1+2
```

The number after `+` is the version code. Increase it by 1.

Then rebuild:
```bash
flutter clean
flutter build apk --release --shrink --split-per-abi
```

---

## ✅ Solution 3: Use Same Signing Key

If you have a debug build installed and want to install release:

### Check Current Installation
```bash
adb shell pm list packages | findstr estato
```

### Uninstall Completely
```bash
adb uninstall estato.lucknow
```

### Install Fresh
```bash
flutter install
```

---

## 🚀 Quick Fix Commands

### Windows PowerShell
```powershell
# Uninstall old version
adb uninstall estato.lucknow

# Build new release
flutter clean
flutter build apk --release --shrink --split-per-abi

# Install new version (64-bit ARM)
adb install build\app\outputs\flutter-apk\app-arm64-v8a-release.apk
```

### If ADB not found
```powershell
# Add to PATH or use full path
flutter install
```

---

## 📱 Manual Installation Steps

1. **On your phone:**
   - Settings → Apps → Estato → Uninstall

2. **Copy APK to phone:**
   - Via USB cable
   - Or upload to Google Drive/WhatsApp

3. **Install APK:**
   - Open file manager
   - Navigate to Downloads
   - Tap the APK file
   - Allow "Install from unknown sources" if prompted
   - Tap Install

---

## 🔍 Verify Installation

After installation:
```bash
# Check if installed
adb shell pm list packages | findstr estato

# Check version
adb shell dumpsys package estato.lucknow | findstr versionCode
```

---

## ⚠️ Important Notes

### Debug vs Release Builds
- **Debug builds** are signed with debug key
- **Release builds** are signed with your keystore
- They CANNOT coexist on same device
- Always uninstall debug before installing release

### Version Codes
- Version code must be **higher** than installed version
- Current: `1.0.1+2` (version code = 2)
- Next: `1.0.2+3` (version code = 3)

### Signing Keys
Your release builds use:
- **Keystore:** `android/estato-key.jks`
- **Key alias:** From `android/key.properties`

---

## 🛠️ Troubleshooting

### Error: "Signatures do not match"
**Solution:** Uninstall old version completely
```bash
adb uninstall estato.lucknow
```

### Error: "INSTALL_FAILED_UPDATE_INCOMPATIBLE"
**Solution:** Increase version code in `pubspec.yaml`
```yaml
version: 1.0.2+3
```

### Error: "App not installed"
**Solution:** Enable "Install from unknown sources"
1. Settings → Security
2. Enable "Unknown sources"
3. Try installing again

### Error: "Parsing error"
**Solution:** APK is corrupted or wrong architecture
- Use correct APK for your device:
  - Most phones: `app-arm64-v8a-release.apk`
  - Older phones: `app-armeabi-v7a-release.apk`

---

## 🎯 Best Practice

### For Development
```bash
# Always use debug builds
flutter run
# or
flutter install
```

### For Testing Release
```bash
# Uninstall debug first
adb uninstall estato.lucknow

# Install release
flutter build apk --release
flutter install
```

### For Production
```bash
# Build app bundle
flutter build appbundle --release

# Upload to Play Store
# Users will get automatic updates
```

---

## 📦 Build Fresh Release

Complete clean build process:

```bash
# 1. Clean everything
flutter clean

# 2. Get dependencies
flutter pub get

# 3. Uninstall old version
adb uninstall estato.lucknow

# 4. Build release
flutter build apk --release --shrink --split-per-abi

# 5. Install new version
adb install build\app\outputs\flutter-apk\app-arm64-v8a-release.apk
```

---

## ✅ Quick Solution (Copy-Paste)

Open PowerShell in `C:\Estato` and run:

```powershell
# Uninstall old version
adb uninstall estato.lucknow

# Clean build
flutter clean
flutter pub get

# Build release
flutter build apk --release --shrink --split-per-abi

# Install (choose your device architecture)
# For most modern phones (64-bit):
adb install build\app\outputs\flutter-apk\app-arm64-v8a-release.apk

# For older phones (32-bit):
# adb install build\app\outputs\flutter-apk\app-armeabi-v7a-release.apk
```

---

## 🎉 Success!

After following these steps, your app should install successfully!

If you still have issues:
1. Restart your phone
2. Try different USB port
3. Enable USB debugging again
4. Check device architecture matches APK

---

**Problem solved!** ✅

