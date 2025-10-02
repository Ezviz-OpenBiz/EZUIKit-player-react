/* eslint-disable no-undef */
import { type TMicroApps } from './types';

// const isDev = process.env.NODE_DEV === 'development'

const subAppContainer = '#subapp-viewport';

export const microApps: TMicroApps = [
  {
    label: 'React 应用',
    name: 'withViteReactApp',
    entry: __REACT_HOST__ + ':' + __REACT_PORT__,
    activeRule: 'withViteReactApp',
    container: subAppContainer,
    props: {
      basename: '/withViteReactApp',
    },
  },
  {
    label: 'Vue 应用',
    name: 'withViteVueApp',
    entry: __VUE_HOST__ + ':' + __VUE_PORT__,
    container: subAppContainer,
    activeRule: 'withViteVueApp',
    props: {
      basename: '/withViteVueApp',
    },
  },
];
