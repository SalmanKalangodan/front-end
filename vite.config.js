import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['@heroicons/react/20/solid','@headlessui/react']
    },
    alias: {
      // eslint-disable-next-line no-undef
      '@': path.resolve(__dirname, 'src')
    }
  }
});




