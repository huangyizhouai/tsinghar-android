#!/bin/bash

# Build the web app
echo "Building web app..."
npm run build

# Add iOS platform to Capacitor
echo "Adding iOS platform..."
npx cap add ios

# Copy web app to iOS
echo "Copying web app to iOS..."
npx cap copy ios

# Sync Capacitor plugins
echo "Syncing Capacitor plugins..."
npx cap sync ios

echo "iOS build complete. Run 'npx cap open ios' to open in Xcode."
echo ""
echo "IMPORTANT iOS SETUP INSTRUCTIONS:"
echo "-----------------------------------"
echo "1. Open Xcode: npx cap open ios"
echo "2. In Xcode > Signing & Capabilities:"
echo "   - Select your Team ID"
echo "   - Confirm Bundle ID: com.company.quittr"
echo "   - Set CFBundleShortVersionString = 1.0.0"
echo "   - Set CFBundleVersion = 1"
echo "3. Run on an attached iPhone to verify it works"
echo ""
echo "If you need to change the bundle ID, modify it in capacitor.config.ts"