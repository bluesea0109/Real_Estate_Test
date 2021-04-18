import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Input } from 'antd';
import { pick } from 'lodash';
import { RoleTag } from 'components';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
  className: 'profile-form',
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
  className: 'profile-form-actions',
};

const ProfileForm = ({ initialValues, isLoading, onSubmit }) => {
  function handleSubmit(values) {
    onSubmit(
      pick({ ...initialValues, ...values }, [
        'id',
        'name',
        'oldPassword',
        'newPassword',
      ]),
    );
  }

  return (
    <Form
      {...formItemLayout}
      initialValues={initialValues}
      onFinish={handleSubmit}
    >
      <Form.Item
        name='name'
        label='Name'
        rules={[{ required: true, message: 'Please input your name!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item label='Email'>
        <Input value={initialValues.email} disabled />
      </Form.Item>

      <Form.Item label='Role'>
        <RoleTag role={initialValues.role} />
      </Form.Item>

      <Form.Item
        name='oldPassword'
        label='Old Password'
        dependencies={['newPassword']}
        rules={[
          ({ getFieldValue }) => ({
            validator(_rule, value) {
              const newPassword = getFieldValue('newPassword');
              if (newPassword && !value) {
                return Promise.reject('Old password is required!');
              }

              return Promise.resolve();
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item name='newPassword' label='New Password'>
        <Input.Password />
      </Form.Item>

      <Form.Item
        name='confirm'
        label='Confirm Password'
        dependencies={['newPassword']}
        rules={[
          ({ getFieldValue }) => ({
            validator(_rule, value) {
              const newPassword = getFieldValue('newPassword');
              if (value !== newPassword) {
                return Promise.reject(
                  'The two passwords that you entered do not match!',
                );
              }

              return Promise.resolve();
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
          Update
        </Button>
      </Form.Item>
    </Form>
  );
};

ProfileForm.propTypes = {
  initialValues: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
  }),
  isLoading: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
};

export default ProfileForm;
