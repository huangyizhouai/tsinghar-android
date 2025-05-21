# QUITTR iOS Export Instructions

## What's been prepared

I've set up your QUITTR web app with Capacitor for iOS packaging. Here's what's been done:

1. Capacitor dependencies have been installed
2. A proper `capacitor.config.ts` has been configured with your app details
3. Build scripts have been prepared for iOS export

## iOS Export Process

### On Your Mac

Here are the exact steps to take after downloading this project:

```bash
# 1. Clone or download this project to your Mac
git clone <your-repo-url> ~/Projects/quittr-ios
cd ~/Projects/quittr-ios

# 2. Install dependencies
npm install

# 3. Build the web app
npm run build

# 4. Add iOS platform to the project
npx cap add ios

# 5. Copy and sync the web app to iOS
npx cap copy ios
npx cap sync ios

# 6. Open in Xcode
npx cap open ios
```

### In Xcode

1. Select your Developer Team ID
2. Confirm the Bundle Identifier is set to `com.company.quittr`
3. Set Version to 1.0.0 (CFBundleShortVersionString)
4. Set Build to 1 (CFBundleVersion)
5. Run on a connected iPhone to test

## IMPORTANT: Next Steps After Exporting

After successfully exporting to iOS, you'll need to:

1. Test thoroughly on real iOS devices
2. Create appropriate app icons and splash screens in Xcode
3. Handle deep linking if desired (additional Capacitor configuration)
4. Configure Push Notifications if required

## Troubleshooting

If you encounter any issues during iOS deployment:

- For white screens on app launch: Check that web assets were correctly bundled
- For signing issues: Verify your Apple Developer account settings
- For build failures: Review Xcode's detailed error messages

The comprehensive export guide in QUITTR_IOS_EXPORT_GUIDE.md contains more detailed instructions and troubleshooting tips.