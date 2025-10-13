## 播放器结合 React 组件

### 开发

- 解码资源

  复制 `dist` 下 `ezuikit_static` 、`ezuikit-flv` 和 `ezuikit-hls` 到 react 项目的静态资源目录下


## 使用

### ezopen

```ts
// ESM
import { EzopenPlayer } from "@ezuikit/player-react"
<EzopenPlayer  id="container"  url="ezopen://open.ys7.com/{序列号}/{通道号}.live" accessToken="...." />
```

### flv

```ts
// ESM
import { FlvPlayer } from "@ezuikit/player-react"
<FlvPlayer  id="container"  url="https://..." />
```

### hls
```ts
// ESM
import { HlsPlayer } from "@ezuikit/player-react"
<HlsPlayer  id="container"  url="https://..." />
```

## Ezopen 提供单独的构建组件

```ts
// ESM
import EzopenPlayer from "@ezuikit/player-react/Ezopen/index.mjs"

// 如果不支持 ESM, 可以使用 umd 的组件，为了解决qiankun框架拦截window导致解码资源不能加载
// 使用 umd 需要把ezuikit.js和解码资源(ezuikit_static) 存储静态资源目录下
// import EzopenPlayerUmd from "@ezuikit/player-react/Ezopen/umd.js"

<EzopenPlayer  id="container"  url="ezopen://open.ys7.com/{序列号}/{通道号}.live" accessToken="...." />
```

## Flv 提供单独的构建组件

```ts
// ESM
import FlvPlayer from "@ezuikit/player-react/Flv/index.mjs"

// 如果不支持 ESM, 可以使用 umd 的组件, 为了解决qiankun框架拦截window导致解码资源不能加载
// 使用 umd 需要把库和解码资源(ezuikit-flv) 存储静态资源目录下
// import FlvPlayerUmd from "@ezuikit/player-react/Flv/umd.js"

<FlvPlayer id="container"  url="https://...." />
```
