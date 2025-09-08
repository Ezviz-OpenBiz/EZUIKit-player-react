import React, { useEffect, useImperativeHandle, useRef, ForwardRefRenderFunction } from 'react';
import { EZUIKitPlayer } from 'ezuikit-js';
import useResizeObserver from '../hooks/useResizeObserver';

/**
 * 播放器组件 Props
 */
// extends Record<string, any>  请保留 强化 ...props 能力
export interface EzopenPlayerProps extends Record<string, any> {
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
     *
     * https://github.com/Ezviz-OpenBiz/EZUIKit-JavaScript-npm?tab=readme-ov-file#%E8%BD%BB%E5%BA%94%E7%94%A8---%E6%B5%B7%E5%A4%96%E7%89%88%E6%9C%AC
     */
    domain?: string;
  };
  className?: string;
  style?: React.CSSProperties;
  // 播放器是否自动适配容器宽高
  isAutoSize?: boolean;
  // 自动播放器父容器
  playerParentContainerId?: string;
}

export interface EzopenPlayerRef {
  player: () => EZUIKitPlayer | null;
  play: () => void;
  stop: () => void;
  destroy: () => void;
  on: (event: string, callback: (...args: any[]) => void) => void;
  // $emit 支持泛行 保留ts能力
  $emit: <T = any>(event: string, ...args: any) => Promise<T> | void | string | T;
}

const DEFAULT_PROPS = {
  staticPath: './ezuikit_static',
};

// 使用 ForwardRefRenderFunction 明确类型
const EzopenPlayerFunc: ForwardRefRenderFunction<EzopenPlayerRef, React.PropsWithChildren<EzopenPlayerProps>> = (props, ref) => {
  const player = useRef<EZUIKitPlayer | null>(null);
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
      let opt = { ...DEFAULT_PROPS, ...props };
      if (props.isAutoSize) {
        const width = containerRef.current?.offsetWidth;
        const height = width * (9 / 16);
        opt = { ...opt, width, height };
      }

      player.current = new EZUIKitPlayer(opt);
    }

    return () => {
      if (player.current) {
        player.current.destroy?.();
        player.current = null;
      }
    };
  }, [props.id, props.url, props.accessToken, props.token]); // 添加依赖项

  props.isAutoSize && useResizeObserver(player, props.playerParentContainerId as string);

  useImperativeHandle(ref, () => ({
    player: () => {
      return player.current;
    },
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
    on: (event, callback) => {
      if (player.current) {
        player.current?.eventEmitter.on(event, callback);
      }
    },
    $emit: (event, ...args) => {
      if (player.current) {
        return player.current?.[event]?.(...args);
      }
    },
  }));

  return <div ref={containerRef} id={props.id} className={props.className} style={{ width: props.width, height: props.height, ...(props.style || {}) }}  />;
};

// 使用 React.forwardRef 并明确类型
const EzopenPlayer = React.forwardRef(EzopenPlayerFunc);

EzopenPlayer.displayName = 'EzopenPlayer';

export default EzopenPlayer;
