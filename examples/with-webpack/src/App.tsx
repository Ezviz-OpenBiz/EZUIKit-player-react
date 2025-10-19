import React from 'react';
import './App.css';
import FlvPlayerComponent from './components/FlvPlayerComponent';
import FlvPlayerUmdComponent from './components/FlvPlayerUmdComponent';

function App() {
  return (
    <div className="App">
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
}

export default App;
