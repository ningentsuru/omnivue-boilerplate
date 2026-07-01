import type { CapacitorConfig } from '@capacitor/cli'

declare const process: { env: { CAPACITOR_DEV?: string } }

const isDev = process.env.CAPACITOR_DEV === 'true'

const config: CapacitorConfig = {
  appId: 'com.omnivue.boilerplate',
  appName: 'omnivue-boilerplate',
  webDir: 'dist',
  plugins: {
    SystemBars: {
      style: 'DARK',
      insetsHandling: 'css',
    },
  },
  ...(isDev
    ? {
        server: {
          url: 'http://192.168.254.102:5173',
          cleartext: true,
        },
      }
    : {}),
}

export default config
