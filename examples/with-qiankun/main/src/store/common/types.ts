import { type TMicroApp } from '@/config/types';

export interface TCommonState {
  currentApp: TMicroApp | undefined;
  microAppIsLoading: boolean;
}
