import React from 'react';
import { Spin } from 'antd';

const Loader = () => (
  <div className='loader'>
    <Spin size='large' className='loader-spin' />
  </div>
);

export default Loader;
