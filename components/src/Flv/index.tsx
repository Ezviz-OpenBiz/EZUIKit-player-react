import './style.css';
import React, { useEffect, useImperativeHandle, useRef, ForwardRefRenderFunction } from 'react';
import EzuikitFlv from 'ezuikit-flv';
import { type FlvPlayerProps, type FlvPlayerRef } from './interface';
import { FLV_DEFAULT_PROPS } from './constant';

// 使用 ForwardRefRenderFunction 明确类型
const FlvPlayerFunc: ForwardRefRenderFunction<FlvPlayerRef, FlvPlayerProps> = (props, ref) => {
  const player = useRef<any>(null);

  useEffect(() => {
    if (!props.id) {
      throw new Error('id is required!');
    }

    if (!player.current && props.url) {
      const opt = {
        ...FLV_DEFAULT_PROPS,
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
    player: () => player.current,
    init: (options: Partial<FlvPlayerProps>) => {
      // 初始化
    },
    pause: () => player.current?.pause?.(),
    setVolume: (volume: number) => player.current?.setVolume?.(volume),
    play: () => player.current?.play?.(),
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
