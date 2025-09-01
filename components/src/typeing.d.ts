declare module 'ezuikit-js' {
  export class EZUIKitPlayer {
    constructor(options: any);
    play(): void;
    stop(): void;
    destroy(): void;
    [key: string]: any;
  }
}
