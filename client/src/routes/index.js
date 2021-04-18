import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import {
  SignInPage,
  SignUpPage,
  ProfilePage,
  UserPage,
  ApartmentPage,
} from 'pages';
import { MainLayout } from 'containers';
import {
  userIsNotAuthenticated,
  userIsAuthenticated,
} from 'utils/auth-helpers';

const AuthenticatedRoutes = () => (
  <MainLayout>
    <Switch>
      <Redirect exact from='/' to='/apartments' />
      <Route exact path='/profile' component={ProfilePage} />
      <Route exact path='/users' component={UserPage} />
      <Route exact path='/apartments' component={ApartmentPage} />
    </Switch>
  </MainLayout>
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route
        exact
        path='/signin'
        component={userIsNotAuthenticated(SignInPage)}
      />
      <Route
        exact
        path='/signup'
        component={userIsNotAuthenticated(SignUpPage)}
      />
      <Route path='/' component={userIsAuthenticated(AuthenticatedRoutes)} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
