import './style.css';
import React, { useEffect, useImperativeHandle, useRef, ForwardRefRenderFunction, useCallback } from 'react';
import { type FlvPlayerProps, type FlvPlayerRef } from './interface';
import AppendJS from '../AppendJS';
import { FLV_DEFAULT_PROPS } from './constant';

// 使用 ForwardRefRenderFunction 明确类型
/**
 * 使用 UMD 方式加载播放器, 适用于没有使用 npm 安装的场景, 如 CDN 引入或解决微应用子应用隔离的场景
 * 1. 通过 entryPath 配置 flv 的 index.js 和 ezuikit_static 的路径， 需要确保全局唯一加载 index.js
 *
 * @param {FlvPlayerProps} props - 播放器配置项
 * @param { FlvPlayerUmdRef } ref - 通过 ref 可以获取播放器实例和控制方法
 * @returns React 组件
 */
const FlvPlayerUmdFunc: ForwardRefRenderFunction<FlvPlayerRef, FlvPlayerProps> = (props, ref) => {
  const player = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [ezopenOptions, setEzopenOptions] = React.useState<Partial<FlvPlayerProps>>({
    entryPath: './ezuikit-flv',
    ...FLV_DEFAULT_PROPS,
    ...props,
  });

  const onDestroy = useCallback(() => {
    if (player.current) {
      player.current.destroy?.();
      player.current = null;
    }
  }, []);

  // prettier-ignore
  const onInit = useCallback((options: Partial<FlvPlayerProps> = {}) => {
    options = { ...ezopenOptions, ...options };
      onDestroy()
      // ezuikit.js 是 UMD 规范的文件, 会挂载到 window.EZUIKit 上, 需要确保全局唯一加载
      AppendJS.loadScript((options.entryPath) +'/index.js').then(() => {

        if (!player.current && options.url && options.id) {
          const opt = { ...options };
          if ((window as any).EzuikitFlv) player.current = new (window as any).EzuikitFlv(opt);
        }
        setEzopenOptions({ ...ezopenOptions, ...options })
      });
    },
    [props.id, props.url, props.accessToken],
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
    pause: () => player.current?.pause?.(),
    play: () => player.current?.play?.(),
    destroy: () => onDestroy(),
  }));

  return <div ref={containerRef} id={props.id} className={props.className} style={props.style} />;
};

// 使用 React.forwardRef 并明确类型
const FlvPlayerUmd = React.forwardRef(FlvPlayerUmdFunc);

FlvPlayerUmd.displayName = 'FlvPlayerUmd';

export default FlvPlayerUmd;
