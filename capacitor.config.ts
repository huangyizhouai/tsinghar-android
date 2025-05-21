import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.company.quittr',
  appName: 'QUITTR',
  webDir: 'dist/public',
  ios: {
    contentInset: 'automatic',
    backgroundColor: '#0b0e3f',
    preferredContentMode: 'mobile'
  },
  server: {
    androidScheme: 'https',
    cleartext: true
  }
};

export default config;
