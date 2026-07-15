import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression';

export default defineConfig({
  plugins: [
    react(),
    // Pre-compress assets at build time — most static hosts (Netlify, Vercel,
    // Cloudflare Pages) will serve the .br/.gz file directly instead of
    // compressing on every request
    viteCompression({ algorithm: 'brotliCompress', ext: '.br' }),
    viteCompression({ algorithm: 'gzip', ext: '.gz' }),
  ],

  build: {
    chunkSizeWarningLimit: 600,
    reportCompressedSize: false, // skips gzip-size calc during build — faster CI builds, no functional effect

    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            return 'vendor-react';
          }
          if (id.includes('node_modules/react-router')) {
            return 'vendor-router';
          }
          if (id.includes('node_modules/')) {
            return 'vendor-misc';
          }
          // Each blog article is already its own chunk via React.lazy() in
          // App.jsx — no extra config needed here, Rollup respects the
          // dynamic import() boundaries automatically.
        },
      },
    },

    minify: 'esbuild',
    target: 'es2018',
    sourcemap: false,
    cssCodeSplit: true,
  },

  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
});