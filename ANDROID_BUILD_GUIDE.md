# 清花 Android APK Build Guide

## Overview
This guide explains how to build the 清花 recovery support application as an Android APK using Capacitor.

## Prerequisites

### Required Software
1. **Node.js** (v16 or later)
2. **Android Studio** with Android SDK
3. **Java Development Kit (JDK)** 8 or 11
4. **Gradle** (usually included with Android Studio)

### Android Studio Setup
1. Download and install Android Studio from https://developer.android.com/studio
2. Open Android Studio and install the Android SDK
3. Set up an Android Virtual Device (AVD) or connect a physical device
4. Enable Developer Options and USB Debugging on physical devices

## Build Process

### 1. Install Dependencies
```bash
npm install
```

### 2. Build the Web Application
```bash
npm run build
```

### 3. Add Android Platform (if not already added)
```bash
npx cap add android
```

### 4. Sync Web Assets to Android
```bash
npx cap sync android
```

### 5. Open in Android Studio
```bash
npx cap open android
```

### 6. Build APK in Android Studio
1. Once Android Studio opens, wait for the project to sync
2. Go to **Build > Build Bundle(s) / APK(s) > Build APK(s)**
3. Wait for the build to complete
4. The APK will be generated in `android/app/build/outputs/apk/debug/`

## Alternative Command Line Build

### Debug APK
```bash
cd android
./gradlew assembleDebug
```

### Release APK (Signed)
```bash
cd android
./gradlew assembleRelease
```

## Configuration Details

### App Configuration (capacitor.config.ts)
```typescript
const config: CapacitorConfig = {
  appId: 'ai.hzdc.tsinghar',
  appName: '清花',
  webDir: 'dist/public',
  android: {
    backgroundColor: '#6B46C1',
    allowMixedContent: true,
    captureInput: true,
    webContentsDebuggingEnabled: true
  }
};
```

### Key Features
- **App ID**: `ai.hzdc.tsinghar`
- **App Name**: TsingHar
- **Background Color**: Purple theme (#6B46C1)
- **Mixed Content**: Enabled for API calls
- **Web Debugging**: Enabled for development

## Demo Account Access

The app includes an Android demo account system:

### Login Options
1. **Regular Login**: Use username/password authentication
2. **Android Demo Account**: Pre-configured with 15-day progress
   - Username: `android_demo`
   - Email: `android@tsinghar.app`
   - Password: `Demo2025!`
3. **Quick Demo**: One-click access through login screen

### Demo Features
- 15-day recovery streak
- Sample motivational reasons
- Pre-populated milestones
- Community forum posts
- Progress tracking data

## Testing the APK

### Installation Methods
1. **Android Studio**: Install directly to connected device/emulator
2. **ADB Command**: `adb install app-debug.apk`
3. **Manual**: Transfer APK to device and install through file manager

### Testing Checklist
- [ ] App launches successfully
- [ ] Authentication system works
- [ ] Demo account access functions
- [ ] Navigation between screens
- [ ] Data persistence
- [ ] Offline functionality
- [ ] Recovery tools accessibility
- [ ] Community features

## Troubleshooting

### Common Issues

**Build Errors**
- Ensure all dependencies are installed
- Check Android SDK path configuration
- Verify JDK version compatibility

**APK Installation Fails**
- Enable "Install from Unknown Sources" on device
- Check for conflicting app signatures
- Clear app data if updating existing installation

**App Crashes on Launch**
- Check device logs with `adb logcat`
- Verify API endpoints are accessible
- Ensure database initialization completed

### Debugging
1. Enable USB debugging on Android device
2. Connect device and run: `adb logcat | grep TsingHar`
3. Check Chrome DevTools for web content debugging
4. Use Android Studio's debugging tools

## Production Release

### Signing the APK
1. Generate a signing key in Android Studio
2. Configure signing in `android/app/build.gradle`
3. Build release APK with signing enabled
4. Test thoroughly before distribution

### Distribution Options
- Google Play Store
- Direct APK distribution
- Enterprise app stores
- Side-loading for testing

## Support
For build issues or questions, refer to:
- Capacitor documentation: https://capacitorjs.com/docs
- Android developer guide: https://developer.android.com/guide
- Project repository issues section