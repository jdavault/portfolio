import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: 'dist',
  server: {
    open: false,
  },
  build: {
    outDir: '../build',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'dist/index.html'),
        about: resolve(__dirname, 'dist/about.html'),
        work: resolve(__dirname, 'dist/work.html'),
        contact: resolve(__dirname, 'dist/contact.html'),
      },
    },
  },
});
