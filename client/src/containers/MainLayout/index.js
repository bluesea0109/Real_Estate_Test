import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import { Header, Sidebar } from 'containers';

const MainLayout = ({ children }) => (
  <Layout className='site-main-layout'>
    <Sidebar />
    <Layout>
      <Header />
      <Layout.Content className='site-content'>{children}</Layout.Content>
    </Layout>
  </Layout>
);

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
