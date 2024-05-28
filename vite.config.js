import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'redux-vendor': ['react-redux', '@reduxjs/toolkit'],
          'ui-vendor': ['@headlessui/react', '@heroicons/react/solid'],
          'product-page': ['/src/User.jsx/Components/Product/Product.jsx'],
        },
        chunkFileNames: 'static/js/[name].[hash].js',
        entryFileNames: 'static/js/[name].[hash].js',
        assetFileNames: 'static/assets/[name].[hash].[ext]',
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});




