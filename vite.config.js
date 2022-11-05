import { fileURLToPath, URL } from 'node:url'
import path from 'path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    target: 'esnext'
  },
  root: path.resolve(__dirname, "client"),
  assetsInclude: ['**/*.JPG', '**/*.jpg', '**/*.png', '**/*.pdf', '**/*.ico', '**/*.otf', '**/*.ttf'],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('/src', import.meta.url))
    }
  }
})
