import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), VitePWA({
    registerType: 'autoUpdate',
    includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png', 'LOGORN.png'],
    injectRegister: false,

    pwaAssets: {
      disabled: true,
      config: false,
    },

    manifest: {
      name: 'Resep Nusantara',
      short_name: 'Resep Nusantara',
      description: 'Aplikasi Resep Makanan dan Minuman Khas Indonesia',
      theme_color: '#2563eb',
      background_color: '#ffffff',
      display: 'standalone',
      scope: '/',
      start_url: '/',
      orientation: 'portrait',
      icons: [
        {
          src: '/pwa-64x64.png',
          sizes: '64x64',
          type: 'image/png'
        },
        {
          src: '/pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '/pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any'
        },
        {
          src: '/maskable-icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable'
        }
      ]
    },

    workbox: {
      globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
      cleanupOutdatedCaches: true,
      clientsClaim: true,
      runtimeCaching: [
        {
          // Cache API recipe queries
          urlPattern: /^https:\/\/.*\/api\/v1\/recipes.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'recipe-api-cache',
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 60 * 60 * 24 * 7, // 7 days
            },
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
        {
          // Cache recipe images
          urlPattern: /\.(jpg|jpeg|png|gif|webp|svg)$/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'recipe-images-cache',
            expiration: {
              maxEntries: 100,
              maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
            },
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
      ],
    },

    devOptions: {
      enabled: false,
      navigateFallback: 'index.html',
      suppressWarnings: true,
      type: 'module',
    },
  })],
})
