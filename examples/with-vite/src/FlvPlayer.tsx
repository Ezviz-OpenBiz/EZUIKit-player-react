import { useCallback, useRef, useState } from 'react';
import { FlvPlayer, type FlvPlayerRef } from '@ezuikit/player-react';
import './index.css';

const Player = () => {
  const player = useRef<FlvPlayerRef | null>(null);
  const [url, setUrl] = useState(
    'https://rtmp05open.ys7.com:9188/v3/openlive/BC7799091_1_1.flv?expire=1787928793&id=883122424964939776&t=fc6bfe3d7d066b9b07c5ce2592dbe153a4799c5553736b443819d968ab04304b&ev=100',
  );
  const staticPathRef = useRef<HTMLInputElement>(null);
  const domainRef = useRef<HTMLInputElement>(null);

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
        <FlvPlayer id="flv-player-container" autoPlay={false} url={url} ref={player} style={{ width: '100%', height: 400 }} />
      </div>
      <div className="form">
        <div className="form-item">
          <label>url</label>
          {/* prettier-ignore */}
          <input onBlur={handleUrlBlur} placeholder="ezopen url" defaultValue="https://rtmp05open.ys7.com:9188/v3/openlive/BC7799091_1_1.flv?expire=1787928793&id=883122424964939776&t=fc6bfe3d7d066b9b07c5ce2592dbe153a4799c5553736b443819d968ab04304b&ev=100" />
        </div>
        <div className="form-item">
          <label>staticPath</label>
          {/* prettier-ignore */}
          <input ref={staticPathRef} placeholder="ezopen staticPath" defaultValue="./flv_decoder/" />
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
