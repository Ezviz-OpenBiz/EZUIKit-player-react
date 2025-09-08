import React, { useEffect, useImperativeHandle, useRef, ForwardRefRenderFunction } from 'react';
import EzuikitHls, { type HlsOptions } from '@ezuikit/player-hls';
import useResizeObserver from '../hooks/useResizeObserver';

/**
 * 播放器组件 Props
 */
// extends Record<string, any>  请保留 强化 ...props 能力
export interface HlsPlayerProps extends Record<string, any> {
  /** 播放器 id, 必须的 */
  id: string;
  /** ezopen 播放地址 */
  url: string;
  /** 取流等操作需要的 token */
  accessToken?: string;
  autoPlay?: boolean;
  /** 播放器容器宽度，单位px */
  width?: number;
  /** 播放器容器高度，单位px */
  height?: number;
  /** 解码静态资源路径， 默认是 ./flv_decoder/, */
  staticPath?: string;
  className?: string;
  style?: React.CSSProperties;
  // 播放器是否自动适配容器宽高
  isAutoSize?: boolean;
  // 自动播放器父容器
  playerParentContainerId?: string;
}

export interface HlsPlayerRef {
  player: () => EzuikitHls | null;
  play: () => void;
  pause: () => void;
  destroy: () => void;
  on: (event: string, callback: (...args: any[]) => void) => void;
  // $emit 支持泛行 保留ts能力
  $emit: <T = any>(event: string, ...args: any) => Promise<T> | void | string | T;
}

const DEFAULT_PROPS = {
  staticPath: './hls_decoder/',
};

// 使用 ForwardRefRenderFunction 明确类型
const HlsPlayerFunc: ForwardRefRenderFunction<HlsPlayerRef, React.PropsWithChildren<HlsPlayerProps>> = (props, ref) => {
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
      player.current = new EzuikitHls(opt as unknown as HlsOptions);
    }

    return () => {
      if (player.current) {
        player.current.destroy?.();
        player.current = null;
      }
    };
  }, [props.id, props.url]); // 添加依赖项

  props.isAutoSize && useResizeObserver(player, props.playerParentContainerId as string);

  useImperativeHandle(ref, () => ({
    player: () => {
      return player.current;
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

  return <div id={props.id} className={props.className} style={{ width: props.width, height: props.height, ...(props.style || {}) }} />;
};

// 使用 React.forwardRef 并明确类型
const HlsPlayer = React.forwardRef(HlsPlayerFunc);

HlsPlayer.displayName = 'HlsPlayer';

export default HlsPlayer;
