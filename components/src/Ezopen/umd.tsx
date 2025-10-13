import React, { useEffect, useImperativeHandle, useRef, ForwardRefRenderFunction, useCallback } from 'react';
import { type EzopenPlayerProps, type EzopenPlayerRef } from './interface';
import AppendJS from '../AppendJS';

const DEFAULT_PROPS = {
  language: 'zh' as EzopenPlayerProps['language'],
  entryPath: './',
  staticPath: './ezuikit_static',
};

// 使用 ForwardRefRenderFunction 明确类型
/**
 * 使用 UMD 方式加载播放器, 适用于没有使用 npm 安装的场景, 如 CDN 引入或解决微应用子应用隔离的场景
 * 1. 通过 entryPath 配置 ezuikit.js 和 ezuikit_static 的路径， 需要确保全局唯一加载 ezuikit.js
 * 2. 本地配置解码资源路径时，需确保 ezuikit_static 目录下的文件可访问（复制 ezuikit_static 文件夹到静态资源目录下）
 *
 * @param {EzopenPlayerProps} props - 播放器配置项
 * @param { EzopenPlayerUmdRef } ref - 通过 ref 可以获取播放器实例和控制方法
 * @returns React 组件
 */
const EzopenPlayerUmdFunc: ForwardRefRenderFunction<EzopenPlayerRef, EzopenPlayerProps> = (props, ref) => {
  const player = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [ezopenOptions, setEzopenOptions] = React.useState<Partial<EzopenPlayerProps>>({ ...DEFAULT_PROPS, ...props });

  const onDestroy = useCallback(() => {
    if (player.current) {
      player.current.destroy?.();
      player.current = null;
    }
  }, []);

  // prettier-ignore
  const onInit = useCallback((options: Partial<EzopenPlayerProps> = {}) => {
    options = { ...ezopenOptions, ...options };
      onDestroy()
      // ezuikit.js 是 UMD 规范的文件, 会挂载到 window.EZUIKit 上, 需要确保全局唯一加载
      AppendJS.loadScript((options.entryPath) +'/ezuikit.js').then(() => {
        if (!player.current && options.url && options.id && (options.accessToken || options.token)) {
          const opt = { ...options };
          if (window.EZUIKit.EZUIKitPlayer) player.current = new window.EZUIKit.EZUIKitPlayer(opt);
        }
        setEzopenOptions({ ...ezopenOptions, ...options })
      });
    },
    [props.id, props.url, props.accessToken, props.token],
  );

  useEffect(() => {
    onInit();
    return () => {
      onDestroy();
    };
  }, [onInit]);

  /**
   * 通过 ref 可以获取播放器实例和控制方法
   */
  useImperativeHandle(ref, () => ({
    player: () => player.current,
    init: (options) => onInit(options),
    stop: () => player.current?.stop?.(),
    play: () => player.current?.play?.(),
    openSound: () => player.current?.openSound?.(),
    closeSound: () => player.current?.closeSound?.(),
    startSave: () => player.current?.startSave?.(),
    stopSave: () => player.current?.stopSave?.(),
    startTalk: () => player.current?.startTalk?.(),
    stopTalk: () => player.current?.stopTalk?.(),
    destroy: () => onDestroy(),
  }));

  return <div ref={containerRef} id={props.id} className={props.className} style={props.style} />;
};

// 使用 React.forwardRef 并明确类型
const EzopenPlayerUmd = React.forwardRef(EzopenPlayerUmdFunc);

EzopenPlayerUmd.displayName = 'EzopenPlayerUmd';

export default EzopenPlayerUmd;
