/* eslint-disable @typescript-eslint/no-dynamic-delete */
/* eslint-disable @typescript-eslint/dot-notation */
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import swc from '@rollup/plugin-swc';
// import serve from 'rollup-plugin-serve';
// import { upperCamel } from '@skax/camel';
import { dts } from 'rollup-plugin-dts';
// import eslint from '@rollup/plugin-eslint';
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';
import dayjs from 'dayjs';
import postcss from 'rollup-plugin-postcss';
import cssnano from 'cssnano';
import autoprefixer from 'autoprefixer';

const isDev = process.env.NODE_ENV !== 'production';

/**
 * @description rollup config function
 * @param {object} pkg package.json
 * @param {string} pkg.name name
 * @param {string} pkg.title name
 * @param {string=} pkg.main main
 * @param {version=} pkg.version string
 * @param {string=} pkg.author author
 * @param {object=} pkg.dependencies dependencies
 * @param {("tsc" | "swc")=} pkg.compiler compiler
 * @param {port=} pkg.port port
 * @param {Array} configs config[]
 * @returns
 */
function generateConfig(pkg, configs) {
  // prettier-ignore
  const banner = `/*
* ${pkg.name} v${pkg.version}
* ${pkg.title || ''} ${pkg.description}
* Copyright (c) ${dayjs().format("YYYY-MM-DD")} ${pkg.author}
* Released under the MIT License.
*/`;

  const input = 'src/index.ts';
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const externals = Object.keys(pkg?.dependencies || {});

  // prettier-ignore
  // const exportName = upperCamel(pkg?.name?.split('/').length > 1 ? pkg?.name?.split('/')[pkg?.name?.split('/').length - 1] : pkg?.name, '-');

  // prettier-ignore
  // const umdPath = path.resolve(`../../playground/public/components/${pkg?.name.replace('@pkg/', '')}/components.umd.js`);

  const defaultConfigs = [
    {
      input,
      output: [
        {
          exports: 'named',
          file: 'dist/index.mjs',
          format: 'esm',
          sourcemap: isDev,
          banner
        }
      ]
    },
    {
      input,
      output: [
        {
          exports: 'named',
          file: 'dist/index.js',
          format: 'commonjs',
          sourcemap: isDev,
          banner
        }
      ]
    }
  ];

  return [
    ...defaultConfigs.map((entry) => ({
      ...entry,
      external: ['react/jsx-runtime', 'react', 'react-dom', ...externals],
      plugins: [
        // eslint({
        //   throwOnError: true, // lint 结果有错误将会抛出异常
        //   // throwOnWarning: true,
        //   include: ['src/**/*.ts', 'src/**/*.js', 'src/**/*.mjs', 'src/**/*.jsx', 'src/**/*.tsx'],
        //   exclude: ['node_modules/**', '**/__tests__/**']
        // }),
        pkg.compiler === 'tsc'
          ? typescript({
              declaration: false,
            })
          : swc({
              // https://swc.rs/docs/configuration/swcrc
              swc: {
                jsc: {
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                  target: ['umd', 'iife'].includes(entry.output[0].format) ? 'es5' : 'es2015',
                },
              },
              include: ['./src/**/*.{ts,js,mjs,tsx,jsx}'],
            }),
        resolve({
          extensions: ['.js', '.jsx', '.mjs', '.ts', '.tsx', '.json'],
        }),
        commonjs({
          extensions: ['.js', '.jsx', '.mjs', '.ts', '.tsx', '.json'],
        }),
        replace({
          __VERSION__: `${pkg.version}`,
          preventAssignment: true,
        }),
        postcss({
          plugins: [autoprefixer(), cssnano({ preset: 'default' })],
          sourceMap: isDev,
          extract: false,
          extensions: ['.scss', '.sass', '.css'],
          include: ['**/*.{scss,sass,css}', 'node_modules/cropperjs/**/*.scss'],
          use: [
            [
              'sass',
              {
                silenceDeprecations: ['legacy-js-api'],
              },
            ],
          ],
        }),
        ...[entry.plugins || []],
      ].filter(Boolean),
    })),
    {
      input,
      output: [{ file: 'dist/types/index.d.ts', format: 'es' }],
      plugins: [dts()],
      external: [/\.(css|less|scss|sass)$/, 'react', 'react-dom', 'antd-mobile'],
    },
    ...(configs || []),
  ];
}

export default generateConfig;
