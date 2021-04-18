import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Routes from 'routes';
import { selectUserError } from 'store/modules/user';
import { Loader } from 'components';
import { Page404 } from 'pages';
import { setUserData } from 'utils/auth-helpers';
import { has404Error } from 'utils/error-handler';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  const userError = useSelector(selectUserError);

  const dispatch = useDispatch();

  useEffect(() => {
    getProfileFromToken();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function getProfileFromToken() {
    setIsLoading(true);

    await setUserData(dispatch);

    setIsLoading(false);
  }

  if (isLoading) {
    return <Loader />;
  }

  if (has404Error([userError])) {
    return <Page404 />;
  }

  return <Routes />;
};

export default App;
