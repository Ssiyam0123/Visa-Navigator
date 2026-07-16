import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  base: process.env.VERCEL ? '/' : "/Visa-Navigator/",
  plugins: [react()],
  optimizeDeps: {
    include: ['visa-animation.json'], // Optional, if necessary
  },
  server: {
    port: 5173,
  },
});
