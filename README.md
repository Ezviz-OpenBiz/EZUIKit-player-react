## 播放器结合 React 组件

### 开发

- 安装依赖 `pnpm install`
- 编译组件

  1. `cd components`
  2. `pnpm run dev` 或者生产环境 `pnpm run build`
- 运行示例启动服务 `pnpm run dev` (需要在根目录下)
- 解码资源

  复制 `dist` 下 `ezuikit_static` 、`flv_decoder` 和 `hls_decoder` 到 react 项目的静态资源目录下





## 🚀🚀🚀**组件引用地方统计** (保持在最底部)

统计原因： 组件内部有额外依赖【`ezuikit_static` 、`flv_decoder` 和 `hls_decoder`】线上版本来源于主应用openweb_console

- 云录制2.0 `/console/cloudRecordV2.html`
