#!/bin/bash

echo "=== TsingHar Android APK Build Commands ==="
echo ""

echo "STEP 1: Install Prerequisites"
echo "# Make sure you have Node.js, Android Studio, and Java 11+ installed"
echo ""

echo "STEP 2: Install Project Dependencies"
echo "npm install"
echo ""

echo "STEP 3: Build Web Application"
echo "npm run build"
echo ""

echo "STEP 4: Sync with Android Platform"
echo "npx cap sync android"
echo ""

echo "STEP 5A: Build APK using Android Studio (Recommended)"
echo "npx cap open android"
echo "# Then in Android Studio:"
echo "# Build > Build Bundle(s) / APK(s) > Build APK(s)"
echo ""

echo "STEP 5B: Build APK using Command Line"
echo "cd android"
echo "./gradlew assembleDebug"
echo ""

echo "RESULT: APK will be at android/app/build/outputs/apk/debug/app-debug.apk"
echo ""

echo "=== Alternative: Use GitHub Actions ==="
echo "1. Push this code to GitHub repository"
echo "2. Go to Actions tab in GitHub"
echo "3. Run 'Build Android APK' workflow"
echo "4. Download APK from artifacts"
echo ""

echo "=== Android Demo Account Details ==="
echo "Username: android_demo"
echo "Password: Demo2025!"
echo "Email: android@tsinghar.app"
echo "Features: 15-day streak, sample data, full functionality"