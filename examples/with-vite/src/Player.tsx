import { useCallback, useRef, useEffect, useState } from 'react';
import { EzopenPlayer, type EzopenPlayerRef, type EzopenPlayerProps } from '@ezuikit/player-react';
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

  const [ezopenPlayer, setEzopenPlayer] = useState<EzopenPlayerProps>({
    id: 'player-container-video',
    url: 'ezopen://open.ys7.com/BA5551167/1.hd.live',
    accessToken: '',
  });

  const initPlayer = useCallback(() => {
    if (document.getElementById('player-container')) {
      let width = 600;
      let height = 400;

      const url = urlRef.current?.value.trim();
      const accessToken = accessTokenRef.current?.value.trim();
      const staticPath = staticPathRef.current?.value.trim() || undefined;
      const domain = domainRef.current?.value.trim() || 'https://open.ys7.com';
      const language = languageRef.current?.value.trim() as 'en' | 'zh';
      const template = templateRef.current?.value.trim();

      if (!url || !accessToken) {
        console.warn('url or accessToken is empty!');
        return;
      }
      setEzopenPlayer((p: EzopenPlayerProps) => {
        return {
          ...p,
          url,
          domain,
          staticPath,
          accessToken,
          template,
          language,
        };
      });
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
  const handlfullScreen = () => {
    if (player.current) {
      player.current.$emit('fullScreen', () => {});
    }
  };

  const setWaterMarkFont = () => {
    if (player.current) {
      player.current.$emit('setWaterMarkFont', {
        fontString: ["1111"],
        startPos: { fX: "0.5", fY: "0.5" },
        fontColor: { fR: parseFloat((11 / 255).toString()).toFixed(3), fG: parseFloat((11 / 255).toString()).toFixed(3), fB: parseFloat((11 / 255).toString()).toFixed(3), fA: 1 },
        fontSize: { nFontWidth: "16", nFontHeight: "16" },
        fontRotate: { fRotateAngle: "0", fFillFullScreen: true },
        fontNumber: { nRowNumber: "4", nColNumber: "4" },
        space: 1,
      });
     
    }
  };
  const getPlayRate = () => {
    if (player.current) {
      let a = player.current.$emit('getPlayRate', (rate: number) => {
        console.log('rate', rate);
      });
      console.log('🚀 ~ getPlayRate ~ a:', a);
    }
  };

  const getVideoLevelList = () => {
    if (player.current) {
      let a = player.current.$emit('getVideoLevelList', (rate: number) => {
        console.log('rate', rate);
      });
      console.log('🚀 ~ getVideoLevelList ~ a:', a);
    }
  };

  const getOSDTime = () => {
    if (player.current) {
      let a = player.current.$emit('getOSDTime') as Promise<any>;
      console.log('🚀 ~ getOSDTime ~ a:', a);
      a.then((res) => {
        console.log('🚀 ~ getOSDTime ~ res:', res);
      });
    }
  };

  const handleError = (en: any) => {
    console.log('error', en);
  };

  return (
    <div className="player-wrapper">
      <h2>ezopen使用示例 (Example of using ezopen)：</h2>
      <div className="player" id="player-container">
        {/* https://stackoverflow.com/questions/71831601/ts2786-component-cannot-be-used-as-a-jsx-component */}
        <EzopenPlayer {...ezopenPlayer} handleError={handleError} ref={player} isAutoSize={true}></EzopenPlayer>
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
          <input ref={accessTokenRef} placeholder="ezopen accessToken" defaultValue="" />
        </div>
        <div className="form-item">
          <label>staticPath</label>
          {/* prettier-ignore */}
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
            <option value="mobileLive">mobileLive</option>
            <option value="mobileRec">mobileRec</option>
          </select>
        </div>
        <div className="form-item">
          <button onClick={handlfullScreen}>全屏</button>
          <button onClick={setWaterMarkFont}>添加水印</button>
          <button onClick={getPlayRate}>获取当前播放速率</button>
          <button onClick={getVideoLevelList}>获取码率列表</button>
          <button onClick={getOSDTime}>获取当前时间</button>
        </div>
      </div>
      <div>
        <button onClick={initPlayer}>初始化(init)</button>
        <button onClick={handleStop}>stop</button>
        <button onClick={handlePlay}>play</button>
        <button onClick={handleDestroy}>destroy</button>
      </div>
    </div>
  );
};

export default Player;
