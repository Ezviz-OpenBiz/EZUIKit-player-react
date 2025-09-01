import React, { useEffect, useImperativeHandle, useRef, ForwardRefRenderFunction } from 'react';
import { EZUIKitPlayer } from 'ezuikit-js';

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
  /** 播放器容器宽度，单位px */
  width?: number;
  /** 播放器容器高度，单位px */
  height?: number;
  /** 播放器模板 pcLive | pcRec | mobileLive | mobileRec */
  template?: string;
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
     */
    domain?: string;
  };
  className?: string;
  style?: React.CSSProperties;
}

export interface EzopenPlayerRef {
  play: () => void;
  stop: () => void;
  destroy: () => void;
}

const DEFAULT_PROPS = {
  staticPath: './ezuikit_static',
};

// 使用 ForwardRefRenderFunction 明确类型
const EzopenPlayerFunc: ForwardRefRenderFunction<EzopenPlayerRef, React.PropsWithChildren<EzopenPlayerProps>> = (props, ref) => {
  const player = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!props.id) {
      throw new Error('id is required!');
    }

    if (!props.url) {
      throw new Error('url is required!');
    }

    if (!(props.accessToken || props.token)) {
      throw new Error('accessToken or token is required!');
    }

    if (containerRef.current && !player.current) {
      const opt = { ...DEFAULT_PROPS, ...props };
      player.current = new EZUIKitPlayer(opt);
    }

    return () => {
      if (player.current) {
        player.current.destroy?.();
        player.current = null;
      }
    };
  }, [props.id, props.url, props.accessToken, props.token]); // 添加依赖项

  useImperativeHandle(ref, () => ({
    stop: () => {
      if (player.current) {
        player.current.stop?.();
      }
    },
    play: () => {
      if (player.current) {
        player.current.play?.();
      }
    },
    destroy: () => {
      if (player.current) {
        player.current.destroy?.();
        player.current = null;
      }
    },
  }));

  return <div ref={containerRef} id={props.id} className={props.className} style={props.style} />;
};

// 使用 React.forwardRef 并明确类型
const EzopenPlayer = React.forwardRef(EzopenPlayerFunc);

EzopenPlayer.displayName = 'EzopenPlayer';

export default EzopenPlayer;
