import { useCallback, useRef } from 'react';
import { EzopenPlayer, type EzopenPlayerRef } from '@ezuikit/player-react';
import { isMobile } from './utils';
import './index.css';

const Player = () => {
  const player = useRef<EzopenPlayerRef | null>(null);
  const urlRef = useRef<HTMLInputElement>(null);
  const accessTokenRef = useRef<HTMLInputElement>(null);
  const staticPathRef = useRef<HTMLInputElement>(null);
  const domainRef = useRef<HTMLInputElement>(null);
  const languageRef = useRef<HTMLSelectElement>(null);
  const templateRef = useRef<HTMLSelectElement>(null);

  const initPlayer = useCallback(() => {
    if (document.getElementById('player-container')) {
      let width = 600;
      let height = 400;

      const url = urlRef.current?.value.trim();
      const accessToken = accessTokenRef.current?.value.trim();
      const staticPath = staticPathRef.current?.value.trim() || undefined;
      const domain = domainRef.current?.value.trim() || 'https://open.ys7.com';
      const language = languageRef.current?.value.trim();
      const template = templateRef.current?.value.trim();

      if (!url || !accessToken) {
        console.warn('url or accessToken is empty!');
        return;
      }

      if (isMobile()) {
        width = document.documentElement.clientWidth;
        height = (width * 9) / 16;
      }
    }
  }, []);

  /** 播放 */
  const handlePlay = useCallback(() => {
    if (player.current) {
      player.current.play();
    }
  }, []);

  /** 停止 */
  const handleStop = useCallback(() => {
    if (player.current) {
      player.current.stop();
    }
  }, []);

  // /** 开启声音， 默认 0.8, 暂时不可调节， 如要调节请调节系统音量 */
  // const handleOpenSound = useCallback(() => {
  //   if (player.current) {
  //     player.current.openSound();
  //   }
  // }, []);

  // const handleCloseSound = useCallback(() => {
  //   if (player.current) {
  //     player.current.closeSound();
  //   }
  // }, []);

  // /** 开始录制， 录制需要在播放状态下才可以 */
  // const handleStartSave = useCallback(() => {
  //   if (player.current) {
  //     player.current.startSave();
  //   }
  // }, []);

  // const handleStopSave = useCallback(() => {
  //   if (player.current) {
  //     player.current.stopSave();
  //   }
  // }, []);

  // /** 抓图/截图 */
  // const handleCapturePicture = useCallback(() => {
  //   if (player.current) {
  //     player.current.capturePicture();
  //   }
  // }, []);

  // /** 全屏 */
  // const handleFullscreen = useCallback(() => {
  //   if (player.current) {
  //     player.current.fullScreen();
  //   }
  // }, []);

  // /** 获取OSD时间 */
  // const handleGetOSDTime = useCallback(() => {
  //   if (player.current) {
  //     player.current.getOSDTime();
  //   }
  // }, []);

  // /**
  //  * 开始对讲 （仅直播live）
  //  */
  // const handleStartTalk = useCallback(() => {
  //   if (player.current) {
  //     player.current.startTalk();
  //   }
  // }, []);

  // /**
  //  * 开始对讲 （仅直播live）
  //  */
  // const handleStopTalk = useCallback(() => {
  //   if (player.current) {
  //     player.current.stopTalk();
  //   }
  // }, []);

  const handleDestroy = () => {
    if (player.current) {
      player.current.destroy();
      player.current = null;
    }
  };

  return (
    <div className="player-wrapper">
      <h2>ezopen使用示例 (Example of using ezopen)：</h2>
      <div>
        {/* https://stackoverflow.com/questions/71831601/ts2786-component-cannot-be-used-as-a-jsx-component */}
        <EzopenPlayer
          template="pcLive"
          id="player-container"
          url="ezopen://open.ys7.com/BC7799091/1.hd.live"
          accessToken="at.bltajf842sg1a200226coblq4vft3bwq-4cl8isjzq6-0ncjeqd-9cbesk7br"
          width={600}
          height={400}
          ref={player}
        >
          1
        </EzopenPlayer>
      </div>
      <div className="form">
        <div className="form-item">
          <label>url</label>
          {/* prettier-ignore */}
          <input ref={urlRef} placeholder="ezopen url" defaultValue="ezopen://open.ys7.com/BC7799091/1.hd.live" />
        </div>
        <div className="form-item">
          <label>accessToken</label>
          {/* prettier-ignore */}
          <input ref={accessTokenRef} placeholder="ezopen accessToken" defaultValue="at.d525oyj8d7bwohb40ssn3266cfq2mwi2-8hgpypehn9-1fafaty-ea2fxbc1" />
        </div>
        <div className="form-item">
          <label>staticPath</label>
          {/* prettier-ignore */}
          {/* https://openstatic.ys7.com/ezuikit_js/v8.1.9/ezuikit_static */}
          <input ref={staticPathRef} placeholder="ezopen staticPath" defaultValue="" />
        </div>
        <div className="form-item">
          <label>domain</label>
          {/* prettier-ignore */}
          <input ref={domainRef} placeholder="ezopen env.domain" defaultValue="https://open.ys7.com" />
        </div>
        <div className="form-item">
          <label>language</label>
          <select ref={languageRef} defaultValue="zh" style={{ width: 100 }}>
            <option value="zh">zh</option>
            <option value="en">en</option>
          </select>
        </div>
        <div className="form-item">
          <label>template</label>
          {/* prettier-ignore */}
          <select ref={templateRef} defaultValue="pcLive" style={{ width: 100 }}>
            <option value="simple">simple</option>
            <option value="pcLive">pcLive</option>
            {/* To use the replay theme, please use the replay playback address */}
            <option value="pcRec">pcRec</option>
            {/* <option value="mobileLive">mobileLive</option>
            <option value="mobileRec">mobileRec</option> */}
          </select>
        </div>
      </div>
      <div>
        <button onClick={initPlayer}>初始化(init)</button>
        <button onClick={handleStop}>stop</button>
        <button onClick={handlePlay}>play</button>
        {/* <button onClick={handleOpenSound}>openSound</button>
        <button onClick={handleCloseSound}>closeSound</button>
        <button onClick={handleStartSave}>startSave</button>
        <button onClick={handleStopSave}>stopSave</button>
        <button onClick={handleCapturePicture}>capturePicture</button>
        <button onClick={handleFullscreen}>fullScreen</button>
        <button onClick={handleGetOSDTime}>getOSDTime</button>
        <button onClick={handleStartTalk}>开始对讲(startTalk)</button>
        <button onClick={handleStopTalk}>结束对讲(stopTalk)</button> */}
        <button onClick={handleDestroy}>destroy</button>
      </div>
    </div>
  );
};

export default Player;
