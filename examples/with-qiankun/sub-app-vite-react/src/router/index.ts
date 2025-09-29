import { useRoutes } from 'react-router-dom';
import mainRoutes from '@/router/mainRoutes';

export default () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return useRoutes([mainRoutes]);
};
