import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  ssr: {
    // Bundle these CJS packages into the SSR output to avoid ESM/CJS import issues
    noExternal: ['react-helmet-async'],
  },
})
