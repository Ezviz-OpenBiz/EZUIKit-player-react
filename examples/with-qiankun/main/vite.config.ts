import { defineConfig, loadEnv } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, path.join(process.cwd(), '../')) };

  return {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    define: {
      __REACT_PORT__: JSON.stringify(process.env.VITE_REACT_PORT),
      __REACT_HOST__: JSON.stringify(process.env.VITE_REACT_HOST.replace(/^http[s]?:/, '')),
      __VUE_PORT__: JSON.stringify(process.env.VITE_VUE_PORT),
      __VUE_HOST__: JSON.stringify(process.env.VITE_VUE_HOST.replace(/^http[s]?:/, '')),
    },
    plugins: [react()],
    server: {
      port: +(process.env.VITE_MAIN_PORT || 5173),
    },
  };
});
