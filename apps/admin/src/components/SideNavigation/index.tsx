import React, { useEffect, useState } from 'react';
import { Layout, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import { sideNavigateMenu } from '../../constants/menuItems';

const { Sider } = Layout;

export const SideNavigation = React.memo(() => {
  const navigate = useNavigate();
  const [selectedKey, setSelectedKey] = useState<string[]>([]);
  useEffect(() => {
    const paths = window.location.pathname.split('/');
    if (paths.length < 2) return;
    setSelectedKey([paths[paths.length - 1]]);
    return () => {
      //
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.location.pathname]);
  return (
    <Sider width={250} className="site-layout-background">
      <Menu
        mode="inline"
        selectedKeys={selectedKey}
        defaultOpenKeys={['admin']}
        style={{ height: '100%', borderRight: 0 }}
      >
        {sideNavigateMenu.map((item) => {
          if (!item.subMenu)
            return (
              <Menu.Item
                key={item.key}
                icon={item.icon}
                onClick={() => navigate(`/${item.key}`)}
              >
                {item.title}
              </Menu.Item>
            );
          return (
            <Menu.SubMenu key={item.key} icon={item.icon} title={item.title}>
              {item.subMenu.map((e) => (
                <Menu.Item
                  key={e.key}
                  icon={e.icon}
                  onClick={() => navigate(`/${item.key}/${e.key}`)}
                >
                  {e.title}
                </Menu.Item>
              ))}
            </Menu.SubMenu>
          );
        })}
      </Menu>
    </Sider>
  );
});
