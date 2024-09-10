import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  envPrefix: 'APP_',
  server: {
    host: true,
    port: 8080,
    strictPort: true,
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
