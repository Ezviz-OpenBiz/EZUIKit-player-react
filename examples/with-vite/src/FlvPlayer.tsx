import { useCallback, useEffect, useRef, useState } from 'react';
import { FlvPlayer, type FlvPlayerRef } from '@ezuikit/player-react';
import './index.css';

const Player = () => {
  const player = useRef<FlvPlayerRef | null>(null);
  const [url, setUrl] = useState(
    'https://rtmp05open.ys7.com:9188/v3/openlive/BD3664803_1_2.flv?expire=1788159367&id=884089519423696896&t=12bd81f8490494354f8ec93d8a5abd886d009fb6c20def9bca77ca42b6bbe607&ev=100',
  );
  const staticPathRef = useRef<HTMLInputElement>(null);

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
      <h2>Flv使用示例 (Example of using Flv)：</h2>
      <div>
        {/* https://stackoverflow.com/questions/71831601/ts2786-component-cannot-be-used-as-a-jsx-component */}
        <FlvPlayer id="flv-player-container" autoPlay={true} url={url} ref={player} style={{ width: 600, height: 400 }} />
      </div>
      <div className="form">
        <div className="form-item">
          <label>url</label>
          {/* prettier-ignore */}
          <input onBlur={handleUrlBlur} placeholder="ezopen url" defaultValue="https://rtmp05open.ys7.com:9188/v3/openlive/BD3664803_1_2.flv?expire=1788159367&id=884089519423696896&t=12bd81f8490494354f8ec93d8a5abd886d009fb6c20def9bca77ca42b6bbe607&ev=100" />
        </div>
        <div className="form-item">
          <label>staticPath</label>
          {/* prettier-ignore */}
          <input ref={staticPathRef} placeholder="ezopen staticPath" defaultValue="" />
        </div>
        {/* <div className="form-item">
          <label>domain</label>
          <input ref={domainRef} placeholder="ezopen env.domain" defaultValue="https://open.ys7.com" />
        </div> */}
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
