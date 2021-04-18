import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  ApartmentOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { selectIsAdmin } from 'store/modules/auth';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const isAdmin = useSelector(selectIsAdmin);

  return (
    <Layout.Sider
      className='site-sider'
      collapsible
      collapsed={isCollapsed}
      onCollapse={setIsCollapsed}
    >
      <Link to='/'>
        <ApartmentOutlined className='site-logo' />
      </Link>
      <Menu
        theme='dark'
        mode='inline'
        defaultSelectedKeys={location.pathname.split('/')[1] || 'apartments'}
      >
        <Menu.Item key='profile'>
          <Link to='/profile'>
            <UserOutlined />
            <span>Profile</span>
          </Link>
        </Menu.Item>
        {isAdmin && (
          <Menu.Item key='users'>
            <Link to='/users'>
              <TeamOutlined />
              <span>Users</span>
            </Link>
          </Menu.Item>
        )}
        <Menu.Item key='apartments'>
          <Link to='/apartments'>
            <ApartmentOutlined />
            <span>Apartments</span>
          </Link>
        </Menu.Item>
      </Menu>
    </Layout.Sider>
  );
};

export default Sidebar;
