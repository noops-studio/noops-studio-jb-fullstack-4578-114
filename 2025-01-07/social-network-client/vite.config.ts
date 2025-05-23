import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), sentryVitePlugin({
    org: "ozari-holdings-ltd",
    project: "javascript-react"
  })],
  css: {
    postcss: './postcss.config.cjs', // Or .js if you chose Option 2
  },
  build: {
    sourcemap: true
  }
})