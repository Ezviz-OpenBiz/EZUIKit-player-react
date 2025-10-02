/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Link, Outlet } from 'react-router-dom';
import { useAppSelector } from '@/store';
import { type TMenuList } from '@/types';
import menusList from '@/mock/menusList';
import styles from './layout.module.scss';
import { useEffect, useState } from 'react';

const Layout = () => {
  const { currentApp, microAppIsLoading } = useAppSelector((state) => state.common);

  const [currentMenus, setCurrentMenus] = useState<TMenuList>([]);

  useEffect(() => {
    // 根据当前激活的子应用，匹配左侧菜单
    setCurrentMenus(
      menusList.find((item) => item.path === '/' + currentApp?.activeRule?.replace(/^\//, ''))
        ?.children || [],
    );
    console.log('currentMenus ===', currentMenus);
  }, [currentApp?.name]);

  return (
    <div className={styles.layout}>
      <div className={styles['layout-header']}>
        {/* 头部菜单 */}
        {menusList.map((item, index) => (
          <Link key={item?.id || index} to={item.path} style={{ marginRight: '15px' }}>
            {item.name}
          </Link>
        ))}
      </div>
      <div className={styles['layout-container']}>
        <div className={styles['layout-left']}>
          {/* 侧边栏 */}
          {currentMenus?.map((item) => (
            <Link to={item.path} key={item.path}>
              {item.name}
            </Link>
          ))}
        </div>
        <div className={styles['layout-right']}>
          <button>主应用(micro-main)按钮</button>
          {microAppIsLoading && <div className={styles['layout-loading']}>loading...</div>}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
