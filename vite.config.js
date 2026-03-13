import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  build: {
    // Raise the chunk warning threshold slightly — we know portfolio is large
    chunkSizeWarningLimit: 600,

    rollupOptions: {
      output: {
        // Manual chunk splitting — vendor libs in their own cached bundle
        manualChunks(id) {
          // React core — smallest, most stable, cached longest
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            return 'vendor-react';
          }
          // Router — separate so it can be cached independently
          if (id.includes('node_modules/react-router')) {
            return 'vendor-router';
          }
          // Everything else in node_modules
          if (id.includes('node_modules/')) {
            return 'vendor-misc';
          }
        },
      },
    },

    // Minification
    minify: 'esbuild',
    target: 'es2018', // Good browser support without excessive transpilation

    // Source maps only in dev
    sourcemap: false,

    // CSS code splitting — each chunk gets its own CSS
    cssCodeSplit: true,
  },

  // Optimise deps pre-bundling
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
});