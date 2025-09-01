import generateConfig from '@config/rollup';
import pkg from './package.json' assert { type: 'json' }; // 新版需要改成 with

export default generateConfig({
  ...pkg,
  compiler: 'tsc'
});
