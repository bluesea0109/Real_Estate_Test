import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Input, Select } from 'antd';
import { get, upperFirst } from 'lodash';
import { REALTOR, CLIENT } from 'utils/config';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const UserForm = ({ initialValues, isLoading, onSubmit }) => {
  function handleSubmit(values) {
    onSubmit({ ...initialValues, ...values });
  }

  return (
    <Form {...layout} initialValues={initialValues} onFinish={handleSubmit}>
      <Form.Item
        name='name'
        label='Name'
        rules={[{ required: true, message: 'Please input name!' }]}
      >
        <Input placeholder='Name' />
      </Form.Item>

      <Form.Item name='email' label='Email'>
        <Input placeholder='Email' disabled />
      </Form.Item>

      <Form.Item
        name='role'
        label='Role'
        rules={[{ required: true, message: 'Please select a role!' }]}
      >
        <Select placeholder='Select a Role'>
          <Select.Option value={REALTOR}>{upperFirst(REALTOR)}</Select.Option>
          {get(initialValues, 'role') === CLIENT && (
            <Select.Option value={CLIENT}>{upperFirst(CLIENT)}</Select.Option>
          )}
        </Select>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button
          type='primary'
          htmlType='submit'
          loading={isLoading}
          disabled={isLoading}
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

UserForm.propTypes = {
  isLoading: PropTypes.bool,
  initialValues: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string,
  }),
  onSubmit: PropTypes.func.isRequired,
};

export default UserForm;
