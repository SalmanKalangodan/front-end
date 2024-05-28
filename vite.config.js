import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['@headlessui/react'],
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'redux-vendor': ['react-redux', '@reduxjs/toolkit'],
          // Removed @headlessui/react from manualChunks
          // You can further split other chunks if needed
        },
        chunkFileNames: 'static/js/[name].[hash].js',
        entryFileNames: 'static/js/[name].[hash].js',
        assetFileNames: 'static/assets/[name].[hash].[ext]',
      },
    },
    chunkSizeWarningLimit: 1000, // Increase the limit if necessary
  },
});






