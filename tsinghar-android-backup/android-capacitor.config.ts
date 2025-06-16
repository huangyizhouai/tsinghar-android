import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'ai.hzdc.tsinghar',
  appName: 'TsingHar',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      launchAutoHide: true,
      backgroundColor: "#1e293b",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      showSpinner: true,
      androidSpinnerStyle: "large",
      spinnerColor: "#ffffff"
    },
    StatusBar: {
      style: "DARK",
      backgroundColor: "#1e293b"
    },
    Keyboard: {
      resize: "body",
      style: "DARK",
      resizeOnFullScreen: true
    },
    App: {
      deepLinkingEnabled: true
    }
  },
  android: {
    buildOptions: {
      keystorePath: undefined,
      keystoreAlias: undefined,
      keystoreAliasPassword: undefined,
      keystorePassword: undefined,
      releaseType: "APK",
      signingType: "apksigner"
    }
  }
};

export default config;