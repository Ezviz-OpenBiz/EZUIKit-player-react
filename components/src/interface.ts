import { type EZUIKitPlayer } from 'ezuikit-js';

/**
 * 播放器组件 Props
 */
export interface EzopenPlayerProps {
  /** 播放器 id, 必须的 */
  id: string;
  /** ezopen 播放地址 */
  url?: string;
  /** 取流等操作需要的 token */
  accessToken?: string;
  /** ezopen 播放小权限 */
  token?: Record<string, any>;
  /** 播放器容器宽度，单位px */
  width?: number;
  /** 播放器容器高度，单位px */
  height?: number;
  /** 播放器模板 pcLive | pcRec | mobileLive | mobileRec */
  template?: string;
  /** ezuikit.js 入口文件路径, 默认是 ./ */
  entryPath?: string;
  /** 解码静态资源路径， 默认是 ./ezuikit_static */
  staticPath?: string;
  /** 语言， 默认 zh, 支持 zh | en  */
  language?: 'en' | 'zh';
  /** 是否是云录制 */
  isCloudRecord?: boolean;
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
 * EzopenPlayerUmdRef
 */
export interface EzopenPlayerRef {
  /**
   * EZUIKitPlayer | null 播放器实例, 如果没有初始化则返回 null
   *
   * WARN: 该方法每次调用都会返回当前的播放器实例, 请确保在播放器初始化后调用该方法
   *
   * @example
   * const player = ref.current?.player();
   * if (player) {
   *   // 使用 player 实例进行操作
   * }
   */
  player: () => EZUIKitPlayer | null;
  /**
   * 异步初始化播放器
   * @param options 部分配置项, 会和初始化的配置项进行合并
   */
  init: (options: Partial<EzopenPlayerProps>) => void;
  /** 播放 */
  play: () => void;
  /** 停止播放 */
  stop: () => void;
  /** 打开声音 */
  openSound: () => void;
  /** 关闭声音 */
  closeSound: () => void;
  /** 开始录制 */
  startSave: () => void;
  /** 结束录制 */
  stopSave: () => void;
  /** 开始录制 */
  startTalk: () => void;
  /** 结束录制 */
  stopTalk: () => void;
  /** 销毁播放器实例 */
  destroy: () => void;
}
