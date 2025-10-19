declare module 'ezuikit-js' {
  export class EZUIKitPlayer {
    constructor(options: any);
    play(): void;
    stop(): void;
    destroy(): void;
    [key: string]: any;
  }
}

declare module '*.css';
declare module '*.scss';

declare global {
  const EZUIKit: {
    EZUIKitPlayer: new (options: any) => EZUIKit.EZUIKitPlayer;
  };

  namespace EZUIKit {
    interface EZUIKitPlayer {
      play?: () => void;
      stop?: () => void;
      destroy?: () => void;
    }
  }
}

declare const EZUIKit: {
  EZUIKitPlayer: typeof import('ezuikit-js').EZUIKitPlayer;
};

interface Window {
  EZUIKit: EZUIKit;
}
