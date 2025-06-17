#!/bin/bash

# TsingHar Android APK Build Script
echo "🚀 Building TsingHar Android APK..."

# Check if dependencies are installed
if ! command -v npx &> /dev/null; then
    echo "❌ Node.js/npm not found. Please install Node.js first."
    exit 1
fi

# Install dependencies if needed
echo "📦 Installing dependencies..."
npm install

# Build the web application
echo "🔨 Building web application..."
npm run build

# Create dist/public if it doesn't exist
mkdir -p dist/public

# Sync with Android platform
echo "📱 Syncing with Android platform..."
npx cap sync android

# Check if Android Studio is available
if command -v studio &> /dev/null; then
    echo "🎯 Opening in Android Studio..."
    npx cap open android
else
    echo "📋 Android Studio not found in PATH."
    echo "To build the APK:"
    echo "1. Open Android Studio"
    echo "2. Open the 'android' folder in this project"
    echo "3. Build > Build Bundle(s) / APK(s) > Build APK(s)"
    echo ""
    echo "Or use Gradle command line:"
    echo "cd android && ./gradlew assembleDebug"
fi

echo "✅ Android build preparation complete!"
echo "📍 APK will be generated in: android/app/build/outputs/apk/debug/"