import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, Form, Input } from 'antd';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const SignUpForm = ({ isLoading, onSubmit }) => (
  <Form {...formItemLayout} onFinish={onSubmit}>
    <Form.Item
      name='name'
      label='Name'
      rules={[{ required: true, message: 'Please input your name!' }]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      name='email'
      label='Email'
      rules={[
        { type: 'email', message: 'The input is not valid email!' },
        { required: true, message: 'Please input your email!' },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      name='password'
      label='Password'
      rules={[{ required: true, message: 'Please input your password!' }]}
      hasFeedback
    >
      <Input.Password />
    </Form.Item>

    <Form.Item
      name='confirm'
      label='Confirm Password'
      dependencies={['password']}
      hasFeedback
      rules={[
        { required: true, message: 'Please confirm your password!' },
        ({ getFieldValue }) => ({
          validator(_rule, value) {
            if (!value || getFieldValue('password') === value) {
              return Promise.resolve();
            }
            return Promise.reject(
              'The two passwords that you entered do not match!',
            );
          },
        }),
      ]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item {...tailFormItemLayout}>
      <Button
        type='primary'
        htmlType='submit'
        loading={isLoading}
        disabled={isLoading}
      >
        Sign Up
      </Button>
      <Link to='/signin'>
        <Button type='link' disabled={isLoading}>
          Sign in now!
        </Button>
      </Link>
    </Form.Item>
  </Form>
);

SignUpForm.propTypes = {
  isLoading: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
};

export default SignUpForm;
