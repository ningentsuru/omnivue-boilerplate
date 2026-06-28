import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'

const isStorybook = process.env.STORYBOOK === 'true'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
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
})
