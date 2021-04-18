import React from 'react';
import { Drawer } from 'antd';

const CustomDrawer = ({ children, ...otherProps }) => (
  <Drawer
    placement='right'
    closable
    maskClosable
    width={400}
    destroyOnClose
    {...otherProps}
  >
    {children}
  </Drawer>
);

export default CustomDrawer;
