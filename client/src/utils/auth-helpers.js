import axios from 'axios';
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';
import {
  getProfileSuccess,
  signOut,
  selectIsSignedIn,
} from 'store/modules/auth';
import { getAuthToken } from 'utils/token';

export const userIsAuthenticated = connectedRouterRedirect({
  redirectPath: '/signin',
  allowRedirectBack: false,
  authenticatedSelector: selectIsSignedIn,
  wrapperDisplayName: 'UserIsAuthenticated',
});

export const userIsNotAuthenticated = connectedRouterRedirect({
  redirectPath: '/',
  allowRedirectBack: false,
  authenticatedSelector: (state) => !selectIsSignedIn(state),
  wrapperDisplayName: 'UserIsNotAuthenticated',
});

export async function setUserData(dispatch) {
  const token = getAuthToken();

  if (!token) {
    return;
  }

  try {
    const res = await axios.get('/me');
    dispatch(getProfileSuccess(res.data));
  } catch {
    dispatch(signOut());
  }
}
