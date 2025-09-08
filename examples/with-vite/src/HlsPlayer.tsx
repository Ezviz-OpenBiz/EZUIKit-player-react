import { useCallback, useEffect, useRef, useState } from 'react';
import { HlsPlayer, type HlsPlayerRef } from '@ezuikit/player-react';
import './index.css';

const Player = () => {
  const player = useRef<HlsPlayerRef | null>(null);
  const [url, setUrl] = useState(
    'https://open.ys7.com/v3/openlive/BD3664803_1_2.m3u8?expire=1788159367&id=884089519710679040&t=36a80fcd4d30d46ad7dce5d3b0161e53509da2a0dc0371671a93e46d9d89896f&ev=100',
  );

  const handleUrlBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (/^https/.test(e.target.value.trim())) {
      setUrl(e.target.value);
    }
  };

  /** 播放 */
  const handlePlay = useCallback(() => {
    if (player.current) {
      player.current.play();
    }
  }, []);

  /** 停止 */
  const handlePause = useCallback(() => {
    if (player.current) {
      player.current.pause();
    }
  }, []);

  const handleDestroy = () => {
    if (player.current) {
      player.current.destroy();
      player.current = null;
    }
  };

  return (
    <div className="player-wrapper">
      <h2>Flv使用示例 (Example of using HLS)：</h2>
      <div>
        <HlsPlayer id="hls-player-container" autoPlay={true} url={url} ref={player} style={{ width: '100%', height: 400 }} />
      </div>
      <div className="form">
        <div className="form-item">
          <label>url</label>
          {/* prettier-ignore */}
          <input onBlur={handleUrlBlur} placeholder="url" defaultValue="https://open.ys7.com/v3/openlive/BD3664803_1_2.m3u8?expire=1788159367&id=884089519710679040&t=36a80fcd4d30d46ad7dce5d3b0161e53509da2a0dc0371671a93e46d9d89896f&ev=100" />
        </div>
      </div>
      <div>
        <button onClick={handlePlay}>play</button>
        <button onClick={handlePause}>pause</button>
        <button onClick={handleDestroy}>destroy</button>
      </div>
    </div>
  );
};

export default Player;
