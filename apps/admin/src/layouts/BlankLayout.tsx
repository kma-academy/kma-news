import React from 'react';
import Layout from 'antd/lib/layout';
import { Outlet } from 'react-router-dom';

const { Content } = Layout;

export const BlankLayout: React.FC = (props) => {
  return (
    <Content
      className="site-layout-background"
      style={{
        padding: 24,
        margin: 0,
        minHeight: '100vh',
        overflowY: 'scroll',
      }}
    >
      <Outlet />
    </Content>
  );
};
