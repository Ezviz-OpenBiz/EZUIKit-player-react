import * as React from 'react';

import '@ezuikit/player-react';

declare module 'ezuikit-js';
declare module '@ezuikit/player-react' {
  interface EzopenPlayerProps {
    children?: any;
  }
}
