import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'ai.hzdc.tsinghar',
  appName: 'TsingHar',
  webDir: 'dist/public',
  android: {
    backgroundColor: '#6B46C1',
    allowMixedContent: true,
    captureInput: true,
    webContentsDebuggingEnabled: true
  },
  server: {
    androidScheme: 'https',
    cleartext: true
  }
};

export default config;
