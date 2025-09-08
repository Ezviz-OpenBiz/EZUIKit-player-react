import { useEffect, RefObject } from 'react';
import { throttle } from 'lodash';

const useResizeObserver = (player: RefObject<any>, playerParentContainerId: string) => {
  if (!playerParentContainerId) {
    throw new Error('playerParentContainerId is required');
  }

  const handleResizeObserver = throttle((entries: ResizeObserverEntry[]) => {
    const width = entries[0].contentRect.width;
    const height = width * (9 / 16);
    // @ts-ignore 兼容浏览器
    const isFullScreen = !!(document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement);
    if (player.current && width && !isFullScreen) {
      player.current.resize?.(width, height);
    }
  }, 100);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(handleResizeObserver);

    const _player = document.getElementById(playerParentContainerId);
    if (_player) {
      resizeObserver.observe(_player as HTMLDivElement);
    }

    // 清理函数
    return () => {
      resizeObserver.disconnect(); // 停止观察
    };
  }, [player, playerParentContainerId]);
};

export default useResizeObserver;
