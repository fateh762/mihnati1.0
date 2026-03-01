import { defineConfig } from "vite";
import dyadComponentTagger from "@dyad-sh/react-vite-component-tagger";
import react from "@vitejs/plugin-react-swc";
import legacy from "@vitejs/plugin-legacy";
import { VitePWA } from 'vite-plugin-pwa';
import path from "path";

export default defineConfig(() => ({
  base: './',
  server: {
    host: "::",
    port: 8080,
  },
  build: {
    target: 'es2015',
    cssTarget: 'chrome61',
    minify: 'terser',
  },
  plugins: [
    dyadComponentTagger(), 
    react(),
    legacy({
      targets: ['android >= 5', 'not dead'],
    }),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'Mihnati Services',
        short_name: 'Mihnati',
        description: 'Futuristic Service Marketplace',
        theme_color: '#02040a',
        background_color: '#02040a',
        display: 'standalone',
        orientation: 'portrait',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));