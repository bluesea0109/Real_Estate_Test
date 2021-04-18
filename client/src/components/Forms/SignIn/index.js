import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

const SignInForm = ({ isLoading, onSubmit }) => (
  <Form onFinish={onSubmit}>
    <Form.Item
      name='email'
      rules={[
        { type: 'email', message: 'The input is not valid email!' },
        { required: true, message: 'Please input your email!' },
      ]}
    >
      <Input prefix={<UserOutlined />} placeholder='Email' />
    </Form.Item>
    <Form.Item
      name='password'
      rules={[{ required: true, message: 'Please input your Password!' }]}
    >
      <Input prefix={<LockOutlined />} type='password' placeholder='Password' />
    </Form.Item>

    <Form.Item>
      <Button
        type='primary'
        htmlType='submit'
        loading={isLoading}
        disabled={isLoading}
      >
        Sign In
      </Button>
      <Link to='/signup'>
        <Button type='link' disabled={isLoading}>
          Sign up now!
        </Button>
      </Link>
    </Form.Item>
  </Form>
);

SignInForm.propTypes = {
  isLoading: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
};

export default SignInForm;
