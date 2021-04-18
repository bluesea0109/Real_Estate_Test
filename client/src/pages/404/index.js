import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button, Result } from 'antd';
import { resetError } from 'store/modules/global';

const Page404 = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  function handleRedirect() {
    dispatch(resetError());
    history.push('/');
  }

  return (
    <Result
      status='404'
      title='404'
      subTitle='Sorry, the page you visited does not exist.'
      extra={
        <Button type='primary' onClick={handleRedirect}>
          Go Home
        </Button>
      }
    />
  );
};

export default Page404;
