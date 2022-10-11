import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  envPrefix: 'VUE_',
  server: {
    host: true,
    port: 8080,
    hmr: {
      host: '0.0.0.0',
      port: 3031,
    },
  },
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    /** If you set esmExternals to true, this plugins assumes that 
      all external dependencies are ES modules */

    commonjsOptions: {
      esmExternals: true,
    },
  },
});
