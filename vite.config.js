import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  preview: {
    allowedHosts: [
      // 'civic-circuit-production.up.railway.app',
      'civic-circuit.vercel.app',
      'http://localhost:5173/'
    ],
    host: true,
    port: 8080
  }
})