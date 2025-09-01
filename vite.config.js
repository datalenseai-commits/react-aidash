import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import obfuscatorPlugin from 'vite-plugin-obfuscator'

export default defineConfig({
  plugins: [
    react(),
    obfuscatorPlugin({
      rotateStringArray: true,
      stringArray: true,
      stringArrayThreshold: 0.75,
      compact: true,
      controlFlowFlattening: true,
    })
  ],
  base: process.env.VITE_BASE_PATH || "/react-aidash",
  build: {
    outDir: 'dist', // Correct key in Vite
    minify: 'terser', // Ensure minification before obfuscation
  },
})
