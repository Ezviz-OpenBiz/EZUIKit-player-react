import React, { useEffect, useImperativeHandle, useRef, ForwardRefRenderFunction } from 'react';
import EzuikitFlv from 'ezuikit-flv';
import useResizeObserver from '../hooks/useResizeObserver';

/**
 * 播放器组件 Props
 */
// extends Record<string, any>  请保留 强化 ...props 能力
export interface FlvPlayerProps extends Record<string, any> {
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
  // /** 语言， 默认 zh, 支持 zh | en  */
  // language?: 'en' | 'zh';
  // /** 是否是云录制 */
  // isCloudRecord?: boolean;
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
  isAutoSize: boolean;
  // 自动播放器父容器
  playerParentContainerId?: string;
}

export interface FlvPlayerRef {
  player: () => EzuikitFlv | null;
  play: () => void;
  pause: () => void;
  destroy: () => void;
  // $emit 支持泛行 保留ts能力
  $emit: <T = any>(event: string, ...args: any) => Promise<T> | void | string | T;
}

const DEFAULT_PROPS = {
  staticPath: './flv_decoder/',
};

// 使用 ForwardRefRenderFunction 明确类型
const FlvPlayerFunc: ForwardRefRenderFunction<FlvPlayerRef, React.PropsWithChildren<FlvPlayerProps>> = (props, ref) => {
  const player = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!props.id) {
      throw new Error('id is required!');
    }

    if (!player.current && props.url) {
      let opt = {
        ...DEFAULT_PROPS,
        ...props,
      };
      if (props.isAutoSize) {
        const width = containerRef.current?.offsetWidth;
        const height = width as number * (9 / 16);
        opt = { ...opt, width, height };
      }
      player.current = new EzuikitFlv(opt);
    }

    return () => {
      if (player.current) {
        player.current.destroy?.();
        player.current = null;
      }
    };
  }, [props.id, props.url]); // 添加依赖项

  useResizeObserver(props.isAutoSize, player, props.playerParentContainerId as string);

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
    $emit: (event, ...args) => {
      if (player.current) {
        return player.current?.[event]?.(...args);
      }
    },
  }));

  return <div ref={containerRef} id={props.id} className={props.className} style={{ width: props.width, height: props.height, ...(props.style || {}) }} />;
};

// 使用 React.forwardRef 并明确类型
const FlvPlayer = React.forwardRef(FlvPlayerFunc);

FlvPlayer.displayName = 'FlvPlayer';

FlvPlayer.defaultProps = {
  isAutoSize: false,
};

export default FlvPlayer;
