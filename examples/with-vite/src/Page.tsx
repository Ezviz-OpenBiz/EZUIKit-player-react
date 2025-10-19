// WARN：两种方式不可以同时使用，因为会有类的静态属性冲突
// import EzopenPlayerUmdComponent from './components/EzopenPlayerUmdComponent';
// import EzopenPlayerComponent from './components/EzopenPlayerComponent';
import FlvPlayerComponent from './components/FlvPlayerComponent';
import FlvPlayerUmdComponent from './components/FlvPlayerUmdComponent';

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
      {/* <div>
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
      </div> */}
      <div>
        <FlvPlayerComponent
          id="flv-container2"
          url="https://rtmp05open.ys7.com:9188/v3/openlive/BC7799091_1_1.flv?expire=1786777450&id=878293341244870656&t=f60d6e23c4736a4e66e278964137ec2905349157c41f961ca01bc78534711258&ev=100"
        />
      </div>
      <div>
        <FlvPlayerUmdComponent
          id="flv-container3"
          url="https://rtmp05open.ys7.com:9188/v3/openlive/BC7799091_1_1.flv?expire=1786777450&id=878293341244870656&t=f60d6e23c4736a4e66e278964137ec2905349157c41f961ca01bc78534711258&ev=100"
        />
      </div>
    </div>
  );
};

export default Page;
