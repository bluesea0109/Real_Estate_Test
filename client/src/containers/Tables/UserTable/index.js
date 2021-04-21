import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Modal, Table } from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { DEFAULT_PAGE_SIZE } from 'utils/config';
import {
  LIST_USER,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
  listUser,
  createUser,
  updateUser,
  deleteUser,
  selectUsers,
  selectUserStatus,
} from 'store/modules/user';
import { Drawer, UserForm, RoleTag } from 'components';
import { resolvedAction } from 'utils/actions';

const UserTable = () => {
  const [editingRecord, setEditingRecord] = useState(null);
  const [isDrawerOpened, setIsDrawerOpened] = useState(false);
  const users = useSelector(selectUsers);
  const status = useSelector(selectUserStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listUser());
  }, [dispatch]);

  useEffect(() => {
    if (
      [resolvedAction(CREATE_USER), resolvedAction(UPDATE_USER)].includes(
        status,
      )
    ) {
      handleDrawerClose();
    }
  }, [status]);

  function handleDrawerClose() {
    setEditingRecord(null);
    setIsDrawerOpened(false);
  }

  function handleSubmit(payload) {
    if (payload.id) {
      dispatch(updateUser(payload));
    } else {
      dispatch(createUser(payload));
    }
  }

  const isLoading = [LIST_USER, UPDATE_USER, DELETE_USER].includes(status);

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
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role) => <RoleTag role={role} />,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
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
                title: 'Do you want to delete this user?',
                icon: <ExclamationCircleOutlined />,
                maskClosable: true,
                onOk: () => {
                  dispatch(deleteUser(record.id));
                },
              });
            }}
          />
        </React.Fragment>
      ),
    },
  ];

  return (
    <React.Fragment>
      <div className='page-add-record'>
        <Button
          type='primary'
          icon={<PlusOutlined />}
          onClick={() => setIsDrawerOpened(true)}
        >
          Add User
        </Button>
      </div>
      <Table
        dataSource={users.results}
        columns={columns}
        rowKey='id'
        size='small'
        loading={isLoading}
        bordered
        pagination={{
          defaultPageSize: DEFAULT_PAGE_SIZE,
          total: users.totalCount,
          current: users.currentPage,
          size: 'default',
        }}
        onChange={(pagination) =>
          dispatch(listUser({ page: pagination.current }))
        }
      />
      <Drawer title='User' visible={isDrawerOpened} onClose={handleDrawerClose}>
        <UserForm
          initialValues={editingRecord}
          isLoading={isLoading}
          // onSubmit={(values) => dispatch(updateUser(values))}
          onSubmit={handleSubmit}
        />
      </Drawer>
    </React.Fragment>
  );
};

export default UserTable;
