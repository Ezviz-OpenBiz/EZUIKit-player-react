import { type FlvPlayerProps, FlvPlayerUmd, type FlvPlayerRef } from '@ezuikit/player-react';
import { useRef, useState } from 'react';
import { useCallback } from 'react';

/**
 * 使用 NPM 方式加载播放器
 * @param props EzopenPlayerProps
 * @returns
 */
const FlvPlayerComponent = (props: FlvPlayerProps) => {
  const playerRef = useRef<FlvPlayerRef>(null);
  const [options, setOptions] = useState<Partial<FlvPlayerProps>>({ ...props });

  const urlRef = useRef<HTMLInputElement>(null);
  const accessTokenRef = useRef<HTMLInputElement>(null);
  const staticPathRef = useRef<HTMLInputElement>(null);
  const languageRef = useRef<HTMLInputElement>(null);
  const widthRef = useRef<HTMLInputElement>(null);
  const heightRef = useRef<HTMLInputElement>(null);

  /**
   * 初始化Flv播放器
   */
  const handleInit = useCallback(() => {
    if (/^https:\/\//.test(urlRef.current?.value?.trim?.() ?? '')) {
      options.url = urlRef.current?.value.trim?.();
    }
    if (accessTokenRef.current?.value?.trim?.() ?? '') {
      options.accessToken = accessTokenRef.current?.value.trim?.();
    }
    if (staticPathRef.current?.value?.trim?.() ?? '') {
      options.staticPath = staticPathRef.current?.value.trim?.();
    }
    options.width = (widthRef.current?.value || '600').trim?.();
    options.height = (heightRef.current?.value || '400').trim?.();

    if (languageRef.current?.value?.trim?.() ?? '') {
      options.language = (languageRef.current?.value.trim?.() || 'zh') as FlvPlayerProps['language'];
    }

    setOptions({ ...options });
    // 初始化
    playerRef.current?.init?.(options);
  }, []);
  const handlePlay = useCallback(() => {
    // 播放
    playerRef.current?.play();
  }, []);
  const handlePause = useCallback(() => {
    // 停止播放
    playerRef.current?.pause();
  }, []);
  // const handleOpenSound = useCallback(() => {
  //   // 打开声音
  //   playerRef.current?.openSound();
  // }, []);
  // const handleCloseSound = useCallback(() => {
  //   // 关闭声音
  //   playerRef.current?.closeSound();
  // }, []);

  const handleDestroy = useCallback(() => {
    // 销毁
    playerRef.current?.destroy();
  }, []);

  return (
    <div>
      <div>
        <FlvPlayerUmd {...(options as FlvPlayerProps)} ref={playerRef} />
      </div>
      <div>
        <div>
          <input
            type="text"
            ref={urlRef}
            defaultValue="https://rtmp05open.ys7.com:9188/v3/openlive/BC7799091_1_1.flv?expire=1786777450&id=878293341244870656&t=f60d6e23c4736a4e66e278964137ec2905349157c41f961ca01bc78534711258&ev=100"
            placeholder="url"
            style={{ width: 500, marginBottom: 10 }}
          />
        </div>
        <div>
          <input type="text" ref={accessTokenRef} defaultValue="at.3xkyrqok6ugbm468b1rf5bjy7xxjeeiy-2obws661tg-01rl5v2-x6mfiygag" placeholder="accessToken" style={{ width: 500, marginBottom: 10 }} />
        </div>
        <div>
          <input type="text" ref={widthRef} defaultValue={'100%'} placeholder="width" style={{ width: 500, marginBottom: 10 }} />
        </div>
        <div>
          <input type="text" ref={heightRef} defaultValue={400} placeholder="height" style={{ width: 500, marginBottom: 10 }} />
        </div>
        <div>
          <input type="text" ref={staticPathRef} defaultValue="./ezuikit-flv/" placeholder="staticPath" style={{ width: 500, marginBottom: 10 }} />
        </div>
        <div>
          <input type="text" ref={languageRef} defaultValue="zh" placeholder="language" style={{ width: 500, marginBottom: 10 }} />
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
          {/* <button type="button" onClick={handleOpenSound}>
            打开声音
          </button>
          <button type="button" onClick={handleCloseSound}>
            关闭声音
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default FlvPlayerComponent;
