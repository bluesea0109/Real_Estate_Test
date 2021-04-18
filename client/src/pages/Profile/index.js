import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  UPDATE_PROFILE,
  updateProfile,
  selectCurrentUser,
  selectAuthStatus,
} from 'store/modules/auth';

import { ProfileForm } from 'components';

const Profile = () => {
  const authStatus = useSelector(selectAuthStatus);
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  function handleSubmit(values) {
    dispatch(updateProfile(values));
  }

  return (
    <div className='page profile-page'>
      <h1 className='page-heading'>Profile</h1>
      <ProfileForm
        initialValues={currentUser}
        isLoading={authStatus === UPDATE_PROFILE}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default Profile;
