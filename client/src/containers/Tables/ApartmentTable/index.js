import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Modal, Table, Tooltip, Input, Space } from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { ADMIN, REALTOR, DEFAULT_PAGE_SIZE } from 'utils/config';
import { selectUserRole } from 'store/modules/auth';
import {
  LIST_APARTMENT,
  CREATE_APARTMENT,
  UPDATE_APARTMENT,
  DELETE_APARTMENT,
  createApartment,
  updateApartment,
  deleteApartment,
  selectApartments,
  selectApartmentStatus,
} from 'store/modules/apartment';
import { listUser, selectUsers } from 'store/modules/user';
import { selectCurrentUser } from 'store/modules/auth';
import { Drawer, ApartmentForm } from 'components';
import { resolvedAction } from 'utils/actions';

const ApartmentTable = ({ getListApartment }) => {
  const [editingRecord, setEditingRecord] = useState(null);
  const [isDrawerOpened, setIsDrawerOpened] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState({});

  const role = useSelector(selectUserRole);
  const apartments = useSelector(selectApartments);
  const status = useSelector(selectApartmentStatus);
  const realtors = useSelector(selectUsers);
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      [
        resolvedAction(CREATE_APARTMENT),
        resolvedAction(UPDATE_APARTMENT),
      ].includes(status)
    ) {
      handleDrawerClose();
    }
  }, [status]);

  useEffect(() => {
    if (role === ADMIN) {
      dispatch(listUser({ role: REALTOR }));
    }
  }, [dispatch, role]);

  function handleSubmit(payload) {
    if (payload.id) {
      dispatch(
        updateApartment({ ...payload, currentPage: apartments.currentPage }),
      );
    } else {
      dispatch(createApartment(payload));
    }
  }

  function handleDrawerClose() {
    setEditingRecord(null);
    setIsDrawerOpened(false);
  }

  const isLoading = [
    LIST_APARTMENT,
    CREATE_APARTMENT,
    UPDATE_APARTMENT,
    DELETE_APARTMENT,
  ].includes(status);

  const setSearchValue = (dataIndex, name, e) => {
    setSelectedKeys({
      ...selectedKeys,
      [dataIndex + '_' + name]: e.target.value,
    });
  };

  const handleSearch = (confirm) => {
    confirm();
    getListApartment(1, selectedKeys);
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ confirm }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Input min ${dataIndex}`}
          value={selectedKeys[dataIndex + '_min']}
          onChange={(e) => setSearchValue(dataIndex, 'min', e)}
          style={{ width: 120, marginBottom: 8, display: 'block' }}
        />

        <Input
          placeholder={`Input max ${dataIndex}`}
          value={selectedKeys[dataIndex + '_max']}
          onChange={(e) => setSearchValue(dataIndex, 'max', e)}
          style={{ width: 120, marginBottom: 8, display: 'block' }}
        />

        <Space>
          <Button
            type='primary'
            onClick={() => handleSearch(confirm)}
            icon={<SearchOutlined />}
            size='small'
            style={{ width: 120 }}
          >
            Search
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
  });

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => (
        <Tooltip title={record.name}>
          <span>
            {record.name.length > 10
              ? record.name.substring(0, 10) + '...'
              : record.name}
          </span>
        </Tooltip>
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (_, record) => (
        <Tooltip title={record.description}>
          <span>
            {record.description.length > 20
              ? record.description.substring(0, 20) + '...'
              : record.description}
          </span>
        </Tooltip>
      ),
    },
    {
      title: 'Floor Area Size',
      dataIndex: 'floorAreaSize',
      key: 'floorAreaSize',
      ...getColumnSearchProps('floorAreaSize'),
    },
    {
      title: 'Price Per Month',
      dataIndex: 'pricePerMonth',
      key: 'pricePerMonth',
      ...getColumnSearchProps('pricePerMonth'),
    },
    {
      title: 'Number of Rooms',
      dataIndex: 'numberOfRooms',
      key: 'numberOfRooms',
      ...getColumnSearchProps('numberOfRooms'),
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Status',
      dataIndex: 'rented',
      key: 'rented',
      render: (_, record) => (
        <span>{record.rented ? 'rented' : 'available'}</span>
      ),
    },
    {
      title: 'Realtor',
      dataIndex: ['realtor', 'name'],
      key: 'realtor',
    },
  ];

  if (role === ADMIN || role === REALTOR) {
    columns.push({
      title: 'Action',
      key: 'action',
      render: (_, record) =>
        role === ADMIN || record.realtorId === currentUser.id ? (
          <React.Fragment>
            <Button
              icon={<EditOutlined />}
              style={{ marginRight: 5 }}
              shape='circle'
              size='small'
              onClick={() => {
                setEditingRecord(record);
                setIsDrawerOpened(true);
              }}
            />
            <Button
              icon={<DeleteOutlined />}
              shape='circle'
              size='small'
              danger
              onClick={() => {
                Modal.confirm({
                  title: 'Do you want to delete this aprtment?',
                  icon: <ExclamationCircleOutlined />,
                  maskClosable: true,
                  onOk: () => {
                    dispatch(deleteApartment(record.id));
                  },
                });
              }}
            />
          </React.Fragment>
        ) : null,
    });
  }

  return (
    <React.Fragment>
      {(role === REALTOR || role === ADMIN) && (
        <div className='page-add-record'>
          <Button
            type='primary'
            icon={<PlusOutlined />}
            onClick={() => setIsDrawerOpened(true)}
          >
            Add Apartment
          </Button>
        </div>
      )}
      <Table
        dataSource={apartments.results}
        columns={columns}
        rowKey='id'
        size='small'
        loading={isLoading}
        bordered
        pagination={{
          defaultPageSize: DEFAULT_PAGE_SIZE,
          total: apartments.totalCount,
          current: apartments.currentPage,
          size: 'default',
        }}
        onChange={(pagination) =>
          getListApartment(pagination.current, selectedKeys)
        }
      />
      <Drawer
        title='Aparment'
        visible={isDrawerOpened}
        onClose={handleDrawerClose}
      >
        <ApartmentForm
          initialValues={editingRecord}
          isLoading={isLoading}
          realtors={realtors.results}
          role={role}
          onSubmit={handleSubmit}
        />
      </Drawer>
    </React.Fragment>
  );
};

ApartmentTable.propTypes = {
  getListApartment: PropTypes.func.isRequired,
};

export default ApartmentTable;
