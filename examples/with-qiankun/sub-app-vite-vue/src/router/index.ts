import { createRouter, createWebHistory } from 'vue-router';
import mainRoutes from '@/router/mainRoutes';

const router = (props: any) =>
  createRouter({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    history: createWebHistory(props?.basename || ''),
    routes: [mainRoutes],
  });

export default router;
