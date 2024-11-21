import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const jquery = require('jquery');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'window.jQuery': jquery,
    'window.$': jquery,
  },
});