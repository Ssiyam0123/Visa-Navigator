import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['visa-animation.json'], // Optional, if necessary
  },
  server: {
    port: 5173,
  },
});
