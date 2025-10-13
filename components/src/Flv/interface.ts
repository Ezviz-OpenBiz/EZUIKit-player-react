import type EzuikitFlv from 'ezuikit-flv';

/**
 * 播放器组件 Props
 */
export interface FlvPlayerProps {
  /** 播放器 id, 必须的 */
  id: string;
  /** ezopen 播放地址 */
  url?: string;
  /** 取流等操作需要的 token */
  accessToken?: string;
  //   /** flv 播放小权限 暂时不支持 */
  //   token?: Record<string, any>;
  /** 播放器容器宽度，单位px */
  width?: number | string;
  /** 播放器容器高度，单位px, 默认 400px */
  height?: number | string;
  /** flv.js 入口文件路径(仅使用umd生效), 默认是 ./ezuikit-flv */
  entryPath?: string;
  /** 解码静态资源路径， 默认是 ./ezuikit-flv */
  staticPath?: string;
  /** 语言， 默认 zh, 支持 zh | en  */
  language?: 'en' | 'zh';
  /**
   * 播放器主题配置
   */
  themeData?: any;
  /**
   * 播放器环境配置
   */
  env?: {
    /**
     * 接口域名， 默认是 https://open.ys7.com
     * https://github.com/Ezviz-OpenBiz/EZUIKit-JavaScript-npm?tab=readme-ov-file#%E8%BD%BB%E5%BA%94%E7%94%A8---%E6%B5%B7%E5%A4%96%E7%89%88%E6%9C%AC
     */
    domain?: string;
  };
  loggerOptions?: {
    level?: 'INFO' | 'WARN' | 'ERROR';
    name?: string;
    showTime?: boolean;
  };
  className?: string;
  style?: React.CSSProperties;
}

/**
 * FlvPlayerRef
 */
export interface FlvPlayerRef {
  player: () => EzuikitFlv | null;
  init: (options: Partial<FlvPlayerProps>) => void;
  play: () => void;
  pause: () => void;
  destroy: () => void;
}
