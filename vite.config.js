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
    outDir: 'build',        // <--- use "build" instead of "dist"
    sourcemap: false,       // don't generate source maps (harder to reverse engineer)
    minify: 'terser',       // use terser for strong minification
    rollupOptions: {
      output: {
        manualChunks: undefined, // single bundle (optional, reduces readability further)
      },
    },
  },
})
