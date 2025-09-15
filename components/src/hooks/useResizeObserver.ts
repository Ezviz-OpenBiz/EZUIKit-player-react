import { useEffect, RefObject, useRef } from 'react';
import { throttle } from 'lodash';

const useResizeObserver = (isAutoSize: boolean, player: RefObject<any>, playerParentContainerId: string) => {
  if (!playerParentContainerId || !isAutoSize) {
    return () => {};
  }

  const handleResizeObserver = useRef(
    throttle((entries: ResizeObserverEntry[]) => {
      const entry = entries[entries.length - 1]; // 使用最后一个条目以避免处理所有条目
      const width = entry.contentRect.width;
      const height = width * (9 / 16);
      const isFullScreen = !!(document.fullscreenElement || (document as any).mozFullScreenElement || (document as any).webkitFullscreenElement || (document as any).msFullscreenElement);
      if (player.current && width && !isFullScreen) {
        requestAnimationFrame(() => {
          player.current.resize?.(width, height);
        });
      }
    }, 100),
  );

  useEffect(() => {
    const resizeObserver = new ResizeObserver(handleResizeObserver.current);

    const _player = document.getElementById(playerParentContainerId);
    if (_player && isAutoSize) {
      resizeObserver.observe(_player as HTMLDivElement);
    }

    if (!_player) {
      console.warn(`Element with id ${playerParentContainerId} not found.`);
      return;
    }

    // 清理函数
    return () => {
      resizeObserver.disconnect(); // 停止观察
    };
  }, [isAutoSize, player, playerParentContainerId]);
};

export default useResizeObserver;
