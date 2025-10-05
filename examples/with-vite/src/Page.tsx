// WARN：两种方式不可以同时使用，因为会有类的静态属性冲突
import EzopenPlayerUmdComponent from './EzopenPlayerUmdComponent';
import EzopenPlayerComponent from './EzopenPlayerComponent';

const Page = () => {
  return (
    <div>
      <h1>WARN：两种(UMD 和 NPM)方式不可以同时使用，因为会有类的静态属性冲突</h1>
      {/* <div>
        <EzopenPlayerComponent
          id="player-container1"
          url="ezopen://open.ys7.com/BE9822912/1.hd.live"
          accessToken="at.3xkyrqok6ugbm468b1rf5bjy7xxjeeiy-2obws661tg-01rl5v2-x6mfiygag"
          template="pcLive"
          width={600}
          height={400}
          // autoplay={false}
          loggerOptions={{ level: 'WARN', name: 'EzopenPlayer', showTime: true }}
        />
      </div>
      <div>
        <EzopenPlayerComponent
          id="player-container2"
          url="ezopen://open.ys7.com/BE9822912/1.live"
          accessToken="at.3xkyrqok6ugbm468b1rf5bjy7xxjeeiy-2obws661tg-01rl5v2-x6mfiygag"
          template="pcRec"
          width={600}
          height={400}
          loggerOptions={{ level: 'WARN', name: 'EzopenPlayer', showTime: true }}
        />
      </div> */}
      <div>
        <EzopenPlayerUmdComponent
          id="player-container1"
          url="ezopen://open.ys7.com/BE9822912/1.hd.live"
          accessToken="at.3xkyrqok6ugbm468b1rf5bjy7xxjeeiy-2obws661tg-01rl5v2-x6mfiygag"
          template="pcLive"
          width={600}
          height={400}
          // autoplay={false}
          loggerOptions={{ level: 'WARN', name: 'EzopenPlayer', showTime: true }}
        />
      </div>
      <div>
        <EzopenPlayerUmdComponent
          id="player-container2"
          url="ezopen://open.ys7.com/BE9822912/1.live"
          accessToken="at.3xkyrqok6ugbm468b1rf5bjy7xxjeeiy-2obws661tg-01rl5v2-x6mfiygag"
          template="pcRec"
          width={600}
          height={400}
          loggerOptions={{ level: 'WARN', name: 'EzopenPlayer', showTime: true }}
        />
      </div>
    </div>
  );
};

export default Page;
