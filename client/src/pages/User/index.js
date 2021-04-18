import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { selectIsAdmin } from 'store/modules/auth';
import { UserTable } from 'containers';

const User = () => {
  const isAdmin = useSelector(selectIsAdmin);

  if (!isAdmin) {
    return <Redirect to='/aprtments' />;
  }

  return (
    <div className='page user-page'>
      <h1 className='page-heading'>Users</h1>
      <UserTable />
    </div>
  );
};

export default User;
