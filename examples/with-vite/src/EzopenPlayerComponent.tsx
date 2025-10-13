import { type EzopenPlayerProps, type EzopenPlayerRef, EzopenPlayer } from '@ezuikit/player-react';
import { useRef, useState } from 'react';
import { useCallback } from 'react';

/**
 * 使用 NPM 方式加载播放器
 * @param props EzopenPlayerProps
 * @returns
 */
const EzopenPlayerComponent = (props: EzopenPlayerProps) => {
  const playerRef = useRef<EzopenPlayerRef>(null);
  const [options, setOptions] = useState<Partial<EzopenPlayerProps>>({ ...props });

  const urlRef = useRef<HTMLInputElement>(null);
  const accessTokenRef = useRef<HTMLInputElement>(null);
  const staticPathRef = useRef<HTMLInputElement>(null);
  const templateRef = useRef<HTMLInputElement>(null);
  const languageRef = useRef<HTMLInputElement>(null);
  const widthRef = useRef<HTMLInputElement>(null);
  const heightRef = useRef<HTMLInputElement>(null);
  const isCloudRecordRef = useRef<HTMLInputElement>(null);

  /**
   * 初始化播放器
   */
  const handleInit = useCallback(() => {
    if (/^ezopen:\/\//.test(urlRef.current?.value?.trim?.() ?? '')) {
      // @ts-ignore
      options.url = urlRef.current.value.trim?.();
    }
    if (accessTokenRef.current?.value?.trim?.() ?? '') {
      // @ts-ignore
      options.accessToken = accessTokenRef.current.value.trim?.();
    }
    if (staticPathRef.current?.value?.trim?.() ?? '') {
      // @ts-ignore
      options.staticPath = staticPathRef.current.value.trim?.();
    }
    if (templateRef.current?.value?.trim?.() ?? '') {
      // @ts-ignore
      options.template = templateRef.current.value.trim?.();
    }
    if (languageRef.current?.value?.trim?.() ?? '') {
      // @ts-ignore
      options.language = languageRef.current.value.trim?.();
    }
    const w = parseInt((widthRef.current?.value || '600').trim?.(), 10);
    if (!isNaN(w)) {
      // @ts-ignore
      options.width = w;
    }
    const h = parseInt((heightRef.current?.value || '400').trim?.(), 10);
    if (!isNaN(h)) {
      // @ts-ignore
      options.height = h;
    }
    if (isCloudRecordRef.current?.checked) {
      // @ts-ignore
      options.isCloudRecord = true;
    } else {
      // @ts-ignore
      options.isCloudRecord = false;
    }

    setOptions({ ...options });
    // 初始化
    playerRef.current?.init(options);
  }, []);
  const handlePlay = useCallback(() => {
    // 播放
    playerRef.current?.play();
  }, []);
  const handlePause = useCallback(() => {
    // 停止播放
    playerRef.current?.stop();
  }, []);
  const handleOpenSound = useCallback(() => {
    // 打开声音
    playerRef.current?.openSound();
  }, []);
  const handleCloseSound = useCallback(() => {
    // 关闭声音
    playerRef.current?.closeSound();
  }, []);
  const handleStartSave = useCallback(() => {
    // 开始录制
    playerRef.current?.startSave();
  }, []);
  const handleStopSave = useCallback(() => {
    // 结束录制
    playerRef.current?.stopSave();
  }, []);
  const handleStartTalk = useCallback(() => {
    // 开始对讲
    playerRef.current?.startTalk();
  }, []);
  const handleStopTalk = useCallback(() => {
    // 结束对讲
    playerRef.current?.stopTalk();
  }, []);
  const handleDestroy = useCallback(() => {
    // 销毁
    playerRef.current?.destroy();
  }, []);

  return (
    <div>
      <div>
        <EzopenPlayer {...(options as EzopenPlayerProps)} ref={playerRef} />
      </div>
      <div>
        <div>
          <input type="text" ref={urlRef} defaultValue="ezopen://open.ys7.com/BE9822912/1.hd.live" placeholder="url" style={{ width: 500, marginBottom: 10 }} />
        </div>
        <div>
          <input type="text" ref={accessTokenRef} defaultValue="at.3xkyrqok6ugbm468b1rf5bjy7xxjeeiy-2obws661tg-01rl5v2-x6mfiygag" placeholder="accessToken" style={{ width: 500, marginBottom: 10 }} />
        </div>
        <div>
          <input type="text" ref={widthRef} defaultValue={600} placeholder="width" style={{ width: 500, marginBottom: 10 }} />
        </div>
        <div>
          <input type="text" ref={heightRef} defaultValue={400} placeholder="height" style={{ width: 500, marginBottom: 10 }} />
        </div>
        <div>
          <input type="text" ref={templateRef} defaultValue={'pcLive'} placeholder="template" style={{ width: 500, marginBottom: 10 }} />
        </div>
        <div>
          <input type="text" ref={staticPathRef} defaultValue="./ezuikit_static" placeholder="staticPath" style={{ width: 500, marginBottom: 10 }} />
        </div>
        <div>
          <input type="text" ref={languageRef} defaultValue="zh" placeholder="language" style={{ width: 500, marginBottom: 10 }} />
        </div>
        <div>
          <input type="checkbox" ref={isCloudRecordRef} placeholder="isCloudRecord" /> isCloudRecord
        </div>
        <div>
          <button type="button" onClick={handleInit}>
            初始化
          </button>
          <button type="button" onClick={handlePlay}>
            播放
          </button>
          <button type="button" onClick={handlePause}>
            暂时
          </button>
          <button type="button" onClick={handleDestroy}>
            销毁
          </button>
          <button type="button" onClick={handleOpenSound}>
            打开声音
          </button>
          <button type="button" onClick={handleCloseSound}>
            关闭声音
          </button>
          <button type="button" onClick={handleStartSave}>
            开始录制
          </button>
          <button type="button" onClick={handleStopSave}>
            结束录制
          </button>
          <button type="button" onClick={handleStartTalk}>
            开始对讲
          </button>
          <button type="button" onClick={handleStopTalk}>
            结束对讲
          </button>
        </div>
      </div>
    </div>
  );
};

export default EzopenPlayerComponent;
