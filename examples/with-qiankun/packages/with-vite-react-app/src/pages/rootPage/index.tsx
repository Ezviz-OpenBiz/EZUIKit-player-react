import { useState } from 'react';
import viteLogo from '@/assets/vite.svg';
import reactLogo from '@/assets/react.svg';
import './index.scss';
// import { EzopenPlayer, FlvPlayer, HlsPlayer } from '@ezuikit/player-react';

function RootPage() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo vite" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
      <div>
        {/* <EzopenPlayer
          id="player-container"
          url="ezopen://open.ys7.com/BE9822912/1.hd.live"
          accessToken="at.3xkyrqok6ugbm468b1rf5bjy7xxjeeiy-2obws661tg-01rl5v2-x6mfiygag"
          template="pcLive"
          width={600}
          height={400}
        /> */}
        {/* <FlvPlayer />
        <HlsPlayer /> */}
      </div>
    </>
  );
}

export default RootPage;
