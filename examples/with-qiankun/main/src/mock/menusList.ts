const menusList = [
  {
    id: 1001,
    name: 'React 应用',
    path: '/reactApp',
    icon: 'icon-react',
    children: [
      {
        id: 100101,
        name: '首页',
        path: '/reactApp/home',
        icon: 'icon-shouye',
        children: [],
      },
      {
        id: 100102,
        name: '关于',
        path: '/reactApp/about',
        icon: 'icon-guanyu',
        children: [],
      },
    ],
  },
  {
    id: 1002,
    name: 'Vue 应用',
    path: '/vueApp',
    icon: 'icon-vue',
    children: [
      {
        id: 100201,
        name: '首页',
        path: '/vueApp/home',
        icon: 'icon-shouye',
        children: [],
      },
      {
        id: 100202,
        name: '关于',
        path: '/vueApp/about',
        icon: 'icon-guanyu',
        children: [],
      },
    ],
  },
];

export default menusList;
