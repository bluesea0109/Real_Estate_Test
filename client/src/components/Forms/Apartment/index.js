import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Form,
  Input,
  InputNumber,
  Switch,
  AutoComplete,
  Select,
} from 'antd';

import { MAP_API_KEY, MAP_BASE_URL, ADMIN } from 'utils/config';

const { Option } = Select;

const layout = {
  labelCol: {
    span: 10,
  },
  wrapperCol: {
    span: 14,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 10,
    span: 14,
  },
};

const ApartmentForm = ({
  initialValues,
  isLoading,
  realtors,
  role,
  onSubmit,
}) => {
  const [addressOptions, setAddressOptions] = useState([]);
  const [longitude, setLongitude] = useState(
    initialValues ? initialValues.longitude : null,
  );
  const [latitude, setLatitude] = useState(
    initialValues ? initialValues.latitude : null,
  );

  function handleSubmit(values) {
    onSubmit({
      ...initialValues,
      ...values,
      longitude,
      latitude,
    });
  }

  const onSearch = (searchValue) => {
    if (!searchValue) {
      return;
    }

    fetch(`${MAP_BASE_URL}?key=${MAP_API_KEY}&address=${searchValue}`)
      .then((response) => response.json())
      .then((data) => {
        if (!data?.results) {
          return;
        }

        let addresses = [];

        data.results.forEach((item) => {
          addresses.push({
            value: item.formatted_address,
            longitude: item.geometry.location.lng,
            latitude: item.geometry.location.lat,
          });
        });

        setAddressOptions(addresses);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onSelect = (selectValue) => {
    addressOptions.forEach((item) => {
      if (item.value === selectValue) {
        setLatitude(item.latitude);
        setLongitude(item.longitude);
      }
    });
  };

  return (
    <Form {...layout} initialValues={initialValues} onFinish={handleSubmit}>
      <Form.Item
        name='name'
        label='Name'
        rules={[{ required: true, message: 'Please input name!' }]}
      >
        <Input placeholder='Name' />
      </Form.Item>

      <Form.Item
        name='description'
        label='Description'
        rules={[{ required: true, message: 'Please input description!' }]}
      >
        <Input.TextArea placeholder='Description' />
      </Form.Item>

      <Form.Item
        name='floorAreaSize'
        label='Floor Area Size'
        rules={[
          {
            required: true,
            message: 'Please input correct floor area size!',
            type: 'number',
            min: 0,
          },
        ]}
      >
        <InputNumber placeholder='Floor Area Size' />
      </Form.Item>

      <Form.Item
        name='pricePerMonth'
        label='Price Per Month'
        rules={[
          {
            required: true,
            message: 'Please input correct price per month!',
            type: 'number',
            min: 0,
          },
        ]}
      >
        <InputNumber placeholder='Price Per Month' />
      </Form.Item>

      <Form.Item
        name='numberOfRooms'
        label='Number of Rooms'
        rules={[
          {
            required: true,
            message: 'Please input correct number of rooms!',
            type: 'number',
            min: 0,
          },
        ]}
      >
        <InputNumber placeholder='Number of Rooms!' />
      </Form.Item>

      <Form.Item
        name='address'
        label='Address'
        rules={[{ required: true, message: 'Please input address!' }]}
      >
        <AutoComplete
          options={addressOptions}
          onSearch={onSearch}
          onSelect={onSelect}
          placeholder='Please input city and zip code!'
        />
      </Form.Item>

      {role === ADMIN ? (
        <Form.Item
          name='realtorId'
          label='Realtor'
          rules={[{ required: true, message: 'Please select realtor!' }]}
        >
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder='Search to Select'
            optionFilterProp='children'
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            filterSort={(optionA, optionB) =>
              optionA.children
                .toLowerCase()
                .localeCompare(optionB.children.toLowerCase())
            }
          >
            {realtors.map(({ id, name }) => (
              <Option key={id} value={id}>
                {name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      ) : null}

      <Form.Item
        name='rented'
        label='Status'
        rules={[{ required: false, message: 'Please select status!' }]}
        valuePropName='checked'
      >
        <Switch />
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

ApartmentForm.propTypes = {
  isLoading: PropTypes.bool,
  initialValues: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    desctiption: PropTypes.string,
    floorAreaSize: PropTypes.number,
    pricePerMonth: PropTypes.number,
    numberOfRooms: PropTypes.number,
    rented: PropTypes.bool,
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  }),
  realtors: PropTypes.array.isRequired,
  role: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ApartmentForm;
