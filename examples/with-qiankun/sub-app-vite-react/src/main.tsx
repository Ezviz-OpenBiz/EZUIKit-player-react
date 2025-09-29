import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { renderWithQiankun, qiankunWindow } from '@/plugins/qiankun/helper';
import App from './App';

let root: any = null;

const render = (props: { [x: string]: any; container?: any }) => {
  const { container } = props;
  root = createRoot(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    container ? container.querySelector('#root') : document.getElementById('root'),
  );
  root.render(
    <BrowserRouter basename={props?.basename || ''}>
      <App />
    </BrowserRouter>,
  );
};

renderWithQiankun({
  mount(props) {
    console.log('[react18] props from main framework', props);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    render(props);
  },
  bootstrap() {
    console.log('[react18] react app bootstraped');
  },
  unmount(props) {
    const { container } = props;
    root.unmount(container ? container.querySelector('#root') : document.getElementById('root'));
  },
  update(props) {
    console.log('react18] react app update', props);
  },
});

if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render({});
}
