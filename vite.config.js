import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_PATH || "/react-aidash",
    build: {
    outDir: 'dist', // This is the default, but you can explicitly set it
  },
})