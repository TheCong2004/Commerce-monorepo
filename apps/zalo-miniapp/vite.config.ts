import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import legacy from '@vitejs/plugin-legacy';
import zmp from 'zmp-vite-plugin';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react() as any,
    zmp() as any,
    legacy({
      targets: ['defaults', 'not IE 11'],
    }) as any,
  ],
  base: './',
  server: {
    port: 3001,
    host: true
  },
  build: {
    target: 'es2015',
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      }
    }
  },
});
