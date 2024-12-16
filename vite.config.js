import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import { visualizer } from 'rollup-plugin-visualizer';
export default defineConfig({
  base: '/pokedex/', // Use relative paths for assets
  plugins: [
    react(),
    // visualizer({
    //   filename: './dist/stats.html',
    //   open: true,
    //   gzipSize: true,
    //   brotliSize: true,
    // }),
  ],
  build: {
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
          if (id.includes('some-large-module')) {
            return 'large-module';
          }
        },
      },
    },
  },
  server: {
    open: true,
    port: 3000,
  },
});
