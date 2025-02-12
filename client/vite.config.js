import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 4173,
    proxy: {
      '/api': {
        target: 'https://imagifys.onrender.com', // Backend URL
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
