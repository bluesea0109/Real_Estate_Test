import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card } from 'antd';
import { SIGN_IN, signIn, selectAuthStatus } from 'store/modules/auth';
import { SignInForm } from 'components';

const SignIn = () => {
  const authStatus = useSelector(selectAuthStatus);
  const dispatch = useDispatch();

  function handleSubmit(values) {
    dispatch(signIn(values));
  }

  return (
    <div className='auth-page'>
      <Card className='auth-wrapper signin'>
        <h1 className='auth-heading'>Sign In</h1>
        <SignInForm
          isLoading={authStatus === SIGN_IN}
          onSubmit={handleSubmit}
        />
      </Card>
    </div>
  );
};

export default SignIn;
