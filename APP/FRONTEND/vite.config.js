import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',   // <-- critical: makes all asset paths relative for chrome-extension://
  build: {
    outDir: '../../EXTENSION/sidebar',
    emptyOutDir: true,
  },
})
