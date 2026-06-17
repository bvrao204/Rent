import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3100,   // RentEase preferred port (auto-increments if busy)
    host: true,   // expose on local network
  },
})
