import { useState } from 'react';
import './index.scss';
import { EzopenPlayer } from '@ezuikit/player-react';

function RootPage() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
      </div>
      <div>
        <EzopenPlayer
          id="player-container"
          url="ezopen://open.ys7.com/BE9822912/1.hd.live"
          accessToken="at.3xkyrqok6ugbm468b1rf5bjy7xxjeeiy-2obws661tg-01rl5v2-x6mfiygag"
          template="pcLive"
          width={600}
          height={400}
        />
        {/* <FlvPlayer />
        <HlsPlayer /> */}
      </div>
    </>
  );
}

export default RootPage;
