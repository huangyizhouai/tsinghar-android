# QUITTR iOS Export & Deployment Guide

This guide provides step-by-step instructions to export the QUITTR web application from Replit and prepare it for iOS deployment using Capacitor.

## 1. Download the Project from Replit

First, you'll need to download the complete project from Replit:

1. In Replit, click on the three dots (`...`) menu in the Files panel
2. Select "Download as ZIP"
3. Extract the ZIP file to a folder on your Mac, for example `~/Projects/quittr-ios`

## 2. Set Up Your Development Environment

Ensure your Mac has the following prerequisites:

- **Xcode** (latest version) installed from the App Store
- **Node.js** matching the version used in Replit
- **Capacitor CLI** (installed automatically in our project)

## 3. Prepare the Project on Mac

Open Terminal and run:

```bash
# Navigate to your project
cd ~/Projects/quittr-ios

# Install dependencies
npm install

# Build the web app
npm run build
```

## 4. Add iOS Platform to Capacitor

Now let's add iOS capabilities to our web app:

```bash
# Add iOS platform
npx cap add ios

# Copy and sync the web app to iOS
npx cap copy ios
npx cap sync ios
```

## 5. Configure the iOS App in Xcode

Now it's time to open the project in Xcode:

```bash
# Open in Xcode
npx cap open ios
```

In Xcode, configure your app:

1. Select the project in the left sidebar
2. Select the "QUITTR" target
3. Go to the "Signing & Capabilities" tab
4. Set Team to your Apple Developer Team ID
5. Verify Bundle ID is `com.company.quittr` (or your custom bundle ID)
6. In the General tab:
   - Set Version (`CFBundleShortVersionString`) to `1.0.0`
   - Set Build (`CFBundleVersion`) to `1`

## 6. Run on a Device

To test the app on an actual iOS device:

1. Connect your iPhone via USB cable
2. Select your iPhone from the device menu at the top of Xcode
3. Click the Play button to build and run
4. The first time you run, you may need to:
   - Trust the developer certificate on your iPhone (Settings > General > Device Management)
   - Enter your Mac login password to allow Xcode to use your signing certificate

## 7. Prepare for Distribution

Once your app is working correctly, you can prepare it for distribution:

1. In Xcode, select Product > Archive
2. When the Archive window opens, select your archive and click "Distribute App"
3. Choose "App Store Connect" for App Store distribution or "Ad Hoc" for testing
4. Follow the prompts to complete the distribution process

## 8. Troubleshooting Guide

### White Screen on Launch
- Check that the web assets were correctly built and copied to iOS
- Verify the Capacitor configuration (paths, especially)

### Signing Issues
- Ensure your Apple Developer account is active
- Check that your Team ID is correctly set in Xcode
- Verify that the Bundle ID is registered in your Apple Developer account

### Build Fails
- Check Xcode's issue navigator for specific error messages
- Most common issue: missing signing configuration

## Configuration Reference

The Capacitor configuration (`capacitor.config.ts`) contains:

```typescript
{
  appId: 'com.company.quittr',  // Your Bundle ID
  appName: 'QUITTR',            // App name on home screen
  webDir: 'dist/public',        // Where your web build is located
  ios: {
    contentInset: 'automatic',
    backgroundColor: '#0b0e3f',   // App background color 
    preferredContentMode: 'mobile'
  }
}
```

## Customizing the iOS App

To customize the app icon, splash screen, or other iOS-specific properties:

1. Open the Xcode project
2. Navigate to Assets.xcassets
3. Replace the AppIcon and Splash images with your own
4. For deeper customization, you can edit the Info.plist file

## Notes on QUITTR Features in iOS

The iOS app will include all features from the web version:

- Live streak timer showing days, hours, minutes, and seconds
- Weekly check-in bar showing status for each day
- Daily check-in flow with relapse question and mood selection
- Circular progress ring showing recovery percentage
- Brain rewiring progress bar
- Enhanced panic button with emergency mode
- Swirl emblem that changes color with streak progress

## Contact for Support

If you encounter any issues during the iOS export and deployment process, please reach out to our development team for assistance.