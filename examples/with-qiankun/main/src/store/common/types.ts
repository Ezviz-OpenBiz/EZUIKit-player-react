import { type TMicroApp } from '@/microApp/types';

export interface TCommonState {
  currentApp: TMicroApp | undefined;
  microAppIsLoading: boolean;
}
