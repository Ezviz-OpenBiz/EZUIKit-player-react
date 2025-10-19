import './style.css';
import React, { useEffect, useImperativeHandle, useRef, ForwardRefRenderFunction, useCallback } from 'react';
import EzuikitFlv from 'ezuikit-flv';
import { type FlvPlayerProps, type FlvPlayerRef } from './interface';
import { FLV_DEFAULT_PROPS } from './constant';

// 使用 ForwardRefRenderFunction 明确类型
const FlvPlayerFunc: ForwardRefRenderFunction<FlvPlayerRef, FlvPlayerProps> = (props, ref) => {
  const player = useRef<any>(null);
  const [ezopenOptions, setEzopenOptions] = React.useState<Partial<FlvPlayerProps>>({ ...FLV_DEFAULT_PROPS, ...props });

  const onDestroy = useCallback(() => {
    if (player.current) {
      console.warn('EzuikitFlv destroy!!');
      player.current.destroy?.();
      player.current = null;
    }
  }, [props.id, props.url]);

  // prettier-ignore
  const onInit = useCallback((options: Partial<FlvPlayerProps> = {}) => {
      options = { ...ezopenOptions, ...options };
        onDestroy()
        if (!props.id) {
          throw new Error('id is required!');
        }
        if (!player.current && options.url && options.id ) {
          console.warn('EzuikitFlv init!!');
            const opt = {
              ...FLV_DEFAULT_PROPS,
              ...props,
            };
            player.current = new EzuikitFlv(opt);
        }
        setEzopenOptions({ ...ezopenOptions, ...options })
      },
      [props.id, props.url],
    );

  useEffect(() => {
    onInit();
    return () => {
      onDestroy();
    };
  }, [onInit]);

  useImperativeHandle(
    ref,
    () => ({
      player: () => player.current,
      init: (options: Partial<FlvPlayerProps>) => onInit(options),
      pause: () => player.current?.pause?.(),
      setVolume: (volume: number) => player.current?.setVolume?.(volume),
      play: () => player.current?.play?.(),
      destroy: () => {
        if (player.current) {
          player.current.destroy?.();
          player.current = null;
        }
      },
    }),
    [onInit, onDestroy],
  );

  return <div id={props.id} className={props.className} style={{ width: props.width, height: props.height, ...(props.style || {}) }} />;
};

// 使用 React.forwardRef 并明确类型
const FlvPlayer = React.forwardRef(FlvPlayerFunc);

FlvPlayer.displayName = 'FlvPlayer';

export default FlvPlayer;
