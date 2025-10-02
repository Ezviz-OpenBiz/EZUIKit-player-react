import { defineConfig, loadEnv } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';
import qiankunPlugin from './plugins/qiankun/vite-plugin-qiankun';
import { name } from './package.json';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isDev = mode === 'development';
  process.env = { ...process.env, ...loadEnv(mode, path.join(process.cwd(), '../../')) };

  return {
    resolve: {
      // 忽略后缀名的配置选项, 添加 .vue 选项时要记得原本默认忽略的选项也要手动写入
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    plugins: [
      react({
        babel: {
          babelrc: false,
          plugins: [['@babel/plugin-proposal-decorators', { legacy: true }]],
        },
      }),
      qiankunPlugin(name, { useDevMode: isDev }), // useDevMode: 是否使用开发模式
    ],
    server: {
      host: '0.0.0.0',
      port: +(process.env.VITE_REACT_PORT || 9998),
      cors: true,
    },
    // 生产模式下依旧不支持 publicPath, 需要将 vite.config.js 中 base 配置写死【致使多环境部署不便捷】
    base: isDev
      ? '/'
      : `${process.env.VITE_REACT_HOST || 'http://127.0.0.1'}:${process.env.VITE_REACT_PORT || 9998}/`,
  };
});
