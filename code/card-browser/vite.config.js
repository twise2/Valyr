import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/units': 'http://localhost:3001',
      '/unit': 'http://localhost:3001',
      '/unitNames': 'http://localhost:3001',
      '/factions': 'http://localhost:3001',
      '/templates': 'http://localhost:3001',
    },
  },
});
