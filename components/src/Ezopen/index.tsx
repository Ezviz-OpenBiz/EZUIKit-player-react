import React from 'react';

/**
 * 播放器组件 Props
 */
export interface EzopenPlayerProps {
  /** 播放器 id, 必须的 */
  id: string;
  /** ezopen 播放地址 */
  url: string;
  /** 取流等操作需要的 token */
  accessToken?: string;
  /** ezopen 播放小权限 */
  token?: Record<string, any>;
  /** 播放器容器宽度， 单位px */
  width?: number;
  /** 播放器容器高度， 单位px */
  height?: number;
  /** 播放器模板 pcLive | pcRec | mobileLive | mobileRec */
  template?: string;
  /** 解码静态资源路径， 默认是 */
  staticPath?: string;
  /** 语言， 默认 zh, 支持 zh | en  */
  language?: 'en' | 'zh';
  /** 是否是云录制 */
  isCloudRecord: boolean;
  /**
   * 播放器环境配置
   */
  env: {
    domain: string;
  };
  [key: string]: any;
}

const EzopenPlayer = () => <div>EzopenPlayer</div>;

export default EzopenPlayer;
