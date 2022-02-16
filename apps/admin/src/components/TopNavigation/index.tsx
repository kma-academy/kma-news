import React from 'react';
import { Layout, Menu, Badge } from 'antd';
import {
  QuestionCircleOutlined,
  BellOutlined,
  UserOutlined,
  BookOutlined,
  LogoutOutlined,
  CaretDownOutlined,
} from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectProfile, logoutAction } from '@kma-news/auth-slice';
import './index.css';
const { Header } = Layout;

export const TopNavigation = () => {
  const profile = useAppSelector(selectProfile);
  const dispatch = useAppDispatch();
  return (
    <Header className="header" style={{ height: '50px', lineHeight: '50px' }}>
      <div className="logo" style={{ display: 'inline-block', float: 'left' }}>
        <img
          src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
          alt=""
          width="30px"
          height="30px"
        />
      </div>
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[]}
        style={{ justifyContent: 'flex-end' }}
      >
        <Menu.Item key="1">
          <QuestionCircleOutlined />
        </Menu.Item>
        <Menu.Item key="notification">
          <Badge dot>
            <BellOutlined style={{ fontSize: '16px', color: '#fff' }} />
          </Badge>
        </Menu.Item>
        {profile && (
          <Menu.SubMenu
            key="setting"
            icon={<CaretDownOutlined />}
            title={profile?.name}
          >
            <Menu.Item
              key="profile"
              icon={<UserOutlined />}
              className="submenu_child"
            >
              Chỉnh sửa tài khoản
            </Menu.Item>
            <Menu.Item
              key="follow"
              icon={<BookOutlined />}
              className="submenu_child"
            >
              Tin tức
            </Menu.Item>
            <Menu.Item
              key="logout"
              icon={<LogoutOutlined />}
              className="submenu_child"
              onClick={() => dispatch(logoutAction())}
            >
              Đăng xuất
            </Menu.Item>
          </Menu.SubMenu>
        )}
      </Menu>
    </Header>
  );
};
