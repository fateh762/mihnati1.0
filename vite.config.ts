import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import dyadComponentTagger from '@dyad-sh/react-vite-component-tagger'

export default defineConfig({
  plugins: [react(), dyadComponentTagger()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    minify: 'terser',
  },
  server: {
    port: 5173,
    open: true,
  },
})