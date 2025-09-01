import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_PATH || "/react-aidash",
  build: {
    outDir: 'build',          // Vite's correct option name
    sourcemap: false,         // Removes original filenames
    minify: 'terser',         // Use Terser for better mangling
    terserOptions: {
      compress: true,
      mangle: {
        toplevel: true,       // Mangles top-level variable and function names
      },
      format: {
        comments: false,      // Strips comments
      },
    },
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[hash].js',       // Hash everything
        chunkFileNames: 'assets/[hash].js',
        assetFileNames: 'assets/[hash].[ext]'
      }
    }
  }
})
