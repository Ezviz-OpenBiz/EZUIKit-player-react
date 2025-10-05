import React, { useEffect, useImperativeHandle, useRef, ForwardRefRenderFunction } from 'react';
import { EZUIKitPlayer } from 'ezuikit-js';
import { EzopenPlayerProps } from '@/interface';

export interface EzopenPlayerRef {
  player: () => EZUIKitPlayer | null;
  play: () => void;
  stop: () => void;
  destroy: () => void;
}

const DEFAULT_PROPS = {
  staticPath: './ezuikit_static',
};

// 使用 ForwardRefRenderFunction 明确类型
const EzopenPlayerFunc: ForwardRefRenderFunction<EzopenPlayerRef, EzopenPlayerProps> = (props, ref) => {
  const player = useRef<any>(null);
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
      const opt = { ...DEFAULT_PROPS, ...props };
      player.current = new EZUIKitPlayer(opt);
    }

    return () => {
      if (player.current) {
        player.current.destroy?.();
        player.current = null;
        console.warn('player destroy');
      }
    };
  }, [props.id, props.url, props.accessToken, props.token]);
  // 添加依赖项

  useImperativeHandle(ref, () => ({
    player: () => player.current,
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
  }));

  return <div ref={containerRef} id={props.id} className={props.className} style={props.style} />;
};

// 使用 React.forwardRef 并明确类型
const EzopenPlayer = React.forwardRef(EzopenPlayerFunc);

EzopenPlayer.displayName = 'EzopenPlayer';

export default EzopenPlayer;
