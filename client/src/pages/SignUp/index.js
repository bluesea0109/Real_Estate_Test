import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card } from 'antd';
import { SIGN_UP, signUp, selectAuthStatus } from 'store/modules/auth';
import { SignUpForm } from 'components';

const SignUp = () => {
  const authStatus = useSelector(selectAuthStatus);
  const dispatch = useDispatch();

  function handleSubmit(values) {
    dispatch(signUp(values));
  }

  return (
    <div className='auth-page'>
      <Card className='auth-wrapper'>
        <h1 className='auth-heading'>Sign Up</h1>
        <SignUpForm
          isLoading={authStatus === SIGN_UP}
          onSubmit={handleSubmit}
        />
      </Card>
    </div>
  );
};

export default SignUp;
