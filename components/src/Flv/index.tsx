import React, { useEffect, useImperativeHandle, useRef, ForwardRefRenderFunction } from 'react';
import EzuikitFlv from 'ezuikit-flv';
import './style.css';

/**
 * 播放器组件 Props
 */
export interface FlvPlayerProps {
  /** 播放器 id, 必须的 */
  id?: string;
  /** ezopen 播放地址 */
  url?: string;
  /** 取流等操作需要的 token */
  accessToken?: string;
  /** 是否自动播放，默认 true */
  autoPlay?: boolean;
  /** 播放器容器宽度，单位px */
  width?: number;
  /** 播放器容器高度，单位px */
  height?: number;
  /** 解码静态资源路径， 默认是 ./flv_decoder/, */
  staticPath?: string;
  // /** 语言， 默认 zh, 支持 zh | en  */
  // language?: 'en' | 'zh';
  /**
   * 播放器环境配置
   */
  env?: {
    /**
     * 接口域名， 默认是 https://open.ys7.com
     *
     * https://github.com/Ezviz-OpenBiz/EZUIKit-JavaScript-npm?tab=readme-ov-file#%E8%BD%BB%E5%BA%94%E7%94%A8---%E6%B5%B7%E5%A4%96%E7%89%88%E6%9C%AC
     */
    domain?: string;
  };
  className?: string;
  style?: React.CSSProperties;
}

export interface FlvPlayerRef {
  player: () => EzuikitFlv | null;
  init: (options: Partial<FlvPlayerProps>) => void;
  play: () => void;
  pause: () => void;
  destroy: () => void;
}

const DEFAULT_PROPS = {
  staticPath: './flv_decoder/',
  // autoPlay: true,
  height: 400,
};

// 使用 ForwardRefRenderFunction 明确类型
const FlvPlayerFunc: ForwardRefRenderFunction<FlvPlayerRef, FlvPlayerProps> = (props, ref) => {
  const player = useRef<any>(null);

  useEffect(() => {
    if (!props.id) {
      throw new Error('id is required!');
    }

    if (!player.current && props.url) {
      const opt = {
        ...DEFAULT_PROPS,
        ...props,
      };
      player.current = new EzuikitFlv(opt);
    }

    return () => {
      if (player.current) {
        player.current.destroy?.();
        player.current = null;
      }
    };
  }, [props.id, props.url]); // 添加依赖项

  useImperativeHandle(ref, () => ({
    player: () => {
      return player.current;
    },
    init: (options: Partial<FlvPlayerProps>) => {
      // 初始化
    },
    pause: () => {
      if (player.current) {
        player.current.pause?.();
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

  return <div id={props.id} className={props.className} style={{ width: props.width, height: props.height, ...(props.style || {}) }} />;
};

// 使用 React.forwardRef 并明确类型
const FlvPlayer = React.forwardRef(FlvPlayerFunc);

FlvPlayer.displayName = 'FlvPlayer';

export default FlvPlayer;
