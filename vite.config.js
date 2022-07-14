import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'

export default defineConfig({
  optimizeDeps: { include: ['firebase/app', 'firebase/firestore', 'firebase/auth'] },
  plugins: [
    vue({
      template: { transformAssetUrls }
    }),

    quasar({
      // sassVariables: 'src/quasar-variables.sass'
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
