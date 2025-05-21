import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.company.quittr',
  appName: 'QUITTR',
  webDir: 'dist/public',
  bundledWebRuntime: false,
  ios: {
    contentInset: 'automatic',
    backgroundColor: '#0b0e3f',
    preferredContentMode: 'mobile'
  },
  server: {
    cleartext: true
  }
};

export default config;
