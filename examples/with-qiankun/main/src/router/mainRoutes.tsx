import Layout from '@/layout';

const mainRoutes = {
  path: '/',
  element: <Layout />,
  children: [
    {
      path: '/*',
      element: <div id="subapp-viewport"></div>,
    },
    { path: '*', element: null },
  ],
};

export default mainRoutes;
