/* eslint-disable no-undef */
import { type TMicroApps } from './types';

// const isDev = process.env.NODE_DEV === 'development'

export const microApps: TMicroApps = [
  {
    label: 'React 应用',
    name: 'reactApp',
    entry: __REACT_HOST__ + ':' + __REACT_PORT__,
    activeRule: 'reactApp',
    container: '#subapp-viewport',
    props: {
      basename: '/reactApp',
    },
  },
  {
    label: 'Vue 应用',
    name: 'vueApp',
    entry: __VUE_HOST__ + ':' + __VUE_PORT__,
    container: '#subapp-viewport',
    activeRule: 'vueApp',
    props: {
      basename: '/vueApp',
    },
  },
];
