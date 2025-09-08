import React, { useState } from 'react';
import FlvPlayer from './FlvPlayer';
import Player from './Player';
import HlsPlayer from './HlsPlayer';

type TabStateType = 'Player' | 'FlvPlayer' | 'HlsPlayer';
function Tab() {
  const [openPlayer, setOpenPlayer] = useState<TabStateType>('Player');
  const click = (_: TabStateType) => {
    setOpenPlayer(_);
  };

  return (
    <>
      <div >
        {/* prettier-ignore */}
        <button onClick={()=>{ click("Player")}}>Player</button>
        {/* prettier-ignore */}
        <button onClick={()=>{ click("FlvPlayer")}}>FlvPlayer</button>
        {/* prettier-ignore */}
        <button onClick={()=>{ click("HlsPlayer")}}>HlsPlayer</button>
      </div>
      <div style={{ width:"100vw"}}>
        {openPlayer === 'Player' && <Player />}
        {openPlayer === 'FlvPlayer' && <FlvPlayer />}
        {openPlayer === 'HlsPlayer' && <HlsPlayer />}
      </div>
    </>
  );
}

export default Tab;
