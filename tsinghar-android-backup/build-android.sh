#!/bin/bash

# TsingHar Android Build Script
echo "Building TsingHar for Android..."

# Install dependencies
echo "Installing dependencies..."
npm install

# Build the web app
echo "Building web application..."
npm run build

# Copy Android Capacitor config
echo "Setting up Android configuration..."
cp android-capacitor.config.ts capacitor.config.ts

# Add Android platform if not exists
echo "Adding Android platform..."
npx cap add android

# Sync files to Android
echo "Syncing files to Android..."
npx cap sync android

# Open Android Studio
echo "Opening Android Studio..."
npx cap open android

echo "Android build setup complete!"
echo "Next steps:"
echo "1. Open the project in Android Studio"
echo "2. Connect your Android device or start an emulator"
echo "3. Click 'Run' to build and install the app"
echo ""
echo "For release build:"
echo "1. In Android Studio: Build > Generate Signed Bundle/APK"
echo "2. Choose APK and follow the signing process"