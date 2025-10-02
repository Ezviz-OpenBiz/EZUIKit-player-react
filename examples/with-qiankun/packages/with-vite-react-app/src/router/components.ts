import { lazy } from 'react';
import { SuspenseWrap } from '@/components';

export const HomeComponent = SuspenseWrap(lazy(async () => await import('@/pages/home')));
