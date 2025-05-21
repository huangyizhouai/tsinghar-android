# QUITTR iOS App Deployment Guide

This document provides detailed instructions for exporting the QUITTR web app to iOS using Capacitor.

## Prerequisites

Before beginning iOS deployment, ensure you have:

1. A Mac computer with Xcode installed (latest version recommended)
2. Node.js installed (same version as used in this project)
3. Apple Developer account for code signing
4. Proper Team ID and Bundle ID registered in your Apple Developer account

## Build and Export Instructions

### Step 1: Clone and Setup

```bash
# Clone the repository to your Mac
git clone <repository-url> ~/Projects/quittr-ios

# Navigate to project folder
cd ~/Projects/quittr-ios

# Install dependencies
npm install

# Build the web app
npm run build
```

### Step 2: Add iOS Platform

```bash
# Add iOS platform to Capacitor
npx cap add ios

# Copy web app to iOS
npx cap copy ios

# Sync Capacitor plugins
npx cap sync ios
```

### Step 3: Configure Xcode Project

```bash
# Open the iOS project in Xcode
npx cap open ios
```

In Xcode:

1. Select the QUITTR project in the Project Navigator
2. Select the "QUITTR" target
3. Go to the "Signing & Capabilities" tab
4. Choose your Team ID from the dropdown
5. Verify Bundle Identifier is set to "com.company.quittr"
6. In the "General" tab:
   - Set "Version" to 1.0.0 (CFBundleShortVersionString)
   - Set "Build" to 1 (CFBundleVersion)

### Step 4: Test on Device

1. Connect your iOS device via USB
2. Select your device in the device selector at the top of Xcode
3. Click the "Play" button to build and run on your device

### Step 5: Archive for Distribution

1. Select "Product" > "Archive" from the menu
2. When the archive completes, the Organizer window will open
3. Select your archive and click "Distribute App"
4. Follow the prompts to create either a development or App Store build

## Troubleshooting

### Common Issues

- **Code Signing Errors**: Ensure your Apple Developer account is active and properly set up in Xcode.
- **Build Errors**: Check Xcode's issue navigator for detailed error messages.
- **White Screen on Launch**: This often indicates a web asset loading issue. Check Capacitor logs and iOS console.

### iOS Configuration Notes

The iOS configuration is stored in `capacitor.config.ts` and includes:

- App ID: `com.company.quittr`
- App Name: `QUITTR`
- iOS-specific settings like content inset and background color

If you need to modify these settings, edit `capacitor.config.ts` and run `npx cap sync ios` again.

## Project Structure

- `/ios`: Contains the full Xcode project
- `/dist/public`: Contains the web app build that's packaged into the iOS app
- `capacitor.config.ts`: Contains Capacitor configuration for iOS platform