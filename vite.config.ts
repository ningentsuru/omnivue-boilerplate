import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import svgLoader from 'vite-svg-loader'
import { getProxyConfig } from './proxy.config'

const isStorybook = process.env.STORYBOOK === 'true'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  return {
    build: {
      rollupOptions: {
        onwarn(warning, warn) {
          if (warning.code === 'INVALID_ANNOTATION') return
          warn(warning)
        },
      },
    },
    plugins: [
      vue(),
      svgLoader(),
      !isStorybook && vueDevTools(),
      tailwindcss(),
      Components({
        // Enable TypeScript support (generates components.d.ts)
        dts: true,
        // Directories to scan for components (default: 'src/components')
        dirs: ['src/components'],
        // File extensions to include
        extensions: ['vue'],
        // Allow subdirectories to be used as namespace (e.g. BaseButton)
        directoryAsNamespace: false,
      }),
      AutoImport({
        imports: ['vue'], // Enables 'ref', 'computed', etc.
        dts: true, // Generates './auto-imports.d.ts'
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      host: '0.0.0.0',
      port: Number(env.VITE_PORT) || 5173,
      proxy: getProxyConfig(mode),
    },
    base: '/',
  }
})
