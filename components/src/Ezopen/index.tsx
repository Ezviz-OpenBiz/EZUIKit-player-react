import React, { useEffect, useImperativeHandle, useRef, ForwardRefRenderFunction, useCallback } from 'react';
import { type EzopenPlayerProps, type EzopenPlayerRef } from './interface';
import { EZUIKitPlayer } from 'ezuikit-js';

const DEFAULT_PROPS = {
  language: 'zh' as EzopenPlayerProps['language'],
  entryPath: '',
  staticPath: '/ezuikit_static',
};

// 使用 ForwardRefRenderFunction 明确类型
/**
 * 适用于通过 npm 安装 ezuikit-js 的场景
 * 1. 需确保 ezuikit_static 目录下的文件可访问（复制 ezuikit_static 文件夹到静态资源目录下）
 * @param {EzopenPlayerProps} props - 播放器配置项
 * @param { EzopenPlayerRef } ref - 通过 ref 可以获取播放器实例和控制方法
 * @returns React 组件
 */
const EzopenPlayerFunc: ForwardRefRenderFunction<EzopenPlayerRef, EzopenPlayerProps> = (props, ref) => {
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
      if (!player.current && options.url && options.id && (options.accessToken || options.token)) {
        const opt = { ...options };
        player.current = new EZUIKitPlayer(opt);
      }
      setEzopenOptions({ ...ezopenOptions, ...options })
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
  useImperativeHandle(
    ref,
    () => ({
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
    }),
    [props, player],
  );

  return <div ref={containerRef} id={props.id} className={props.className} style={props.style} />;
};

// 使用 React.forwardRef 并明确类型
const EzopenPlayer = React.forwardRef(EzopenPlayerFunc);

EzopenPlayer.displayName = 'EzopenPlayer';

export default EzopenPlayer;
