import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { terser } from 'rollup-plugin-terser'

export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_PATH || "/react-aidash",
  build: {
    outDir: 'build',             // Output folder for Vercel
    sourcemap: false,            // Disable source maps completely
    minify: 'terser',            // Use Terser for advanced minification
    assetsDir: 'assets',         // Bundled files go into "assets"
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[hash].js',    // No readable entry names
        chunkFileNames: 'assets/[hash].js',    // No readable chunk names
        assetFileNames: 'assets/[hash].[ext]', // Hash all other assets
      },
      plugins: [
        terser({
          compress: {
            drop_console: true,   // Remove console.log statements
            drop_debugger: true,  // Remove debugger statements
          },
          mangle: {
            toplevel: true,       // Mangle top-level variable & function names
          }
        })
      ]
    }
  }
})
