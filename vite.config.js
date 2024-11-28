import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: './dist/stats.html', // Output file for visualization
      open: true, // Automatically opens the visualization in the browser
      gzipSize: true, // Show gzipped size
      brotliSize: true, // Show Brotli size
    }),
  ],
  build: {
    sourcemap: false, // Generate source maps for debugging
    chunkSizeWarningLimit: 1000, // Adjust chunk size warning threshold
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Split vendor libraries into their own chunk
          if (id.includes('node_modules')) {
            return 'vendor';
          }
          // Example: Split out a specific large module
          if (id.includes('some-large-module')) {
            return 'large-module';
          }
        },
      },
    },
  },
  server: {
    open: true, // Automatically opens the app in the browser when the dev server starts
    port: 3000, // Specify the dev server port
  },
});
