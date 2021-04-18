import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, Dropdown, Layout, Menu } from 'antd';
import {
  CaretDownOutlined,
  LogoutOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { selectCurrentUser, signOut } from 'store/modules/auth';

const Header = () => {
  const currentUser = useSelector(selectCurrentUser);
  const history = useHistory();
  const dispatch = useDispatch();

  function handleRedirect({ key }) {
    if (key === 'signout') {
      dispatch(signOut());
      return;
    }

    history.push(`/${key}`);
  }

  const profileMenu = (
    <Menu onClick={handleRedirect}>
      <Menu.Item key='profile'>
        <UserOutlined />
        <span>Profile</span>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key='signout'>
        <LogoutOutlined />
        <span>Sign Out</span>
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout.Header className='site-header'>
      <Dropdown
        overlay={profileMenu}
        trigger={['click']}
        placement='bottomRight'
      >
        <Button>
          {currentUser.name}
          <CaretDownOutlined />
        </Button>
      </Dropdown>
    </Layout.Header>
  );
};

export default Header;
