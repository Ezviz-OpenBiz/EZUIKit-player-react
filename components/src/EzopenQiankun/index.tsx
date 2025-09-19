declare global {
  interface Window {
    EZUIKit: any;
  }
}
import React, { useCallback, useEffect, useImperativeHandle, useRef } from 'react';
import { EZUIKitPlayer } from 'ezuikit-js';
import useResizeObserver from '../hooks/useResizeObserver'

export interface EzopenQiankunPlayerProps extends Record<string, any> {
  // ezuikitUmdSourceUrl   Umd个hi的资源包
  ezuikitUmdSourceUrl: '';
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
  isAutoSize: boolean;
  // 自动播放器父容器
  playerParentContainerId?: string;
}

export interface EzopenQiankunPlayerRef {
  player: () => EZUIKitPlayer | null;
  play: () => void;
  stop: () => void;
  destroy: () => void;
  on: (event: string, callback: (...args: any[]) => void) => void;
  // $emit 支持泛行 保留ts能力
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  $emit: <T = any>(event: string, ...args: any) => Promise<T> | void | string | T;
}

const scriptCache: Record<string, any> = {};
const loadScript = async (url: string) => {
  // 如果已有缓存
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  if (scriptCache[url]) {
    return await (scriptCache[url] as Promise<void>);
  }

  const promise = new Promise<void>((resolve, reject) => {
    const existingScript: HTMLScriptElement = document.querySelector(`script[src="${url}"]`)!;

    if (existingScript) {
      // 检查是否已加载完成
      if (existingScript.getAttribute('data-loaded') === 'true') {
        resolve();
        return;
      }
      // 复用现有脚本的事件监听
      existingScript.onload = () => resolve();
      // existingScript.addEventListener('load', resolve);
      existingScript.addEventListener('error', reject);
      return;
    }

    // 创建新脚本
    const script = document.createElement('script');
    script.src = url;
    script.type = 'text/javascript';
    script.onload = () => {
      script.setAttribute('data-loaded', 'true');
      resolve();
    };
    script.onerror = () => {
      reject(new Error(`Failed to load script: ${url}`));
    };

    const head = document.getElementsByTagName('head');
    if (head.length) {
      head[0].appendChild(script);
    } else {
      document.body.appendChild(script);
    }
  });

  // 缓存Promise
  scriptCache[url] = promise;
  return await promise;
};

const EzopenQiankunPlayer = React.forwardRef(
  (
    props: EzopenQiankunPlayerProps,
    ref: React.ForwardedRef<EzopenQiankunPlayerRef>,
  ) => {
    const playerRef = useRef<any>();
    const initPlayer = useCallback(
      (options = {}) => {
        loadScript(props.ezuikitUmdSourceUrl).then(() => {
          if (window.EZUIKit && props.id && options.url && (options.accessToken || options.token)) {
            if (playerRef.current) {
              playerRef.current?.destroy?.();
              playerRef.current = null!;
            }
            playerRef.current = new window.EZUIKit.EZUIKitPlayer({
              id: props.id,
              ...options,
            });
          }
        });
      },
      [props.ezuikitUmdSourceUrl, props.id],
    );

    useEffect(() => {
      initPlayer(props);

      return () => {
        if (playerRef.current) {
          (playerRef.current as any).destroy();
          playerRef.current = null!;
        }
      };
    }, [initPlayer, props, props.ezuikitUmdSourceUrl]);

    useResizeObserver(props.isAutoSize, playerRef, props.playerParentContainerId as string);

    useImperativeHandle(ref, () => ({
      destroy: () => {
        if (playerRef.current) {
          playerRef.current.destroy();
          playerRef.current = null!;
        }
      },
      init: (options: Omit<EzopenQiankunPlayerProps, 'id' | 'ezuikitUmdSourceUrl'>) => {
        initPlayer(options);
      },

      player: () => {
        return playerRef.current;
      },
      stop: () => {
        if (playerRef.current) {
          playerRef.current.stop?.();
        }
      },
      play: () => {
        if (playerRef.current) {
          playerRef.current.play?.();
        }
      },
      on: (event, callback) => {
        if (playerRef.current) {
          playerRef.current?.eventEmitter.on(event, callback);
        }
      },
      $emit: (event, ...args) => {
        if (playerRef.current) {
          return playerRef.current?.[event]?.(...args);
        }
      },
    }));

    return <div id={props.id} style={{ ...(props?.style || {}) }}></div>;
  },
);

export default React.memo(EzopenQiankunPlayer);
