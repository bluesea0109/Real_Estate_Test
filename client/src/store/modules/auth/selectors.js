import { ADMIN, REALTOR, CLIENT } from 'utils/config';

import { get } from 'lodash';

export const selectCurrentUser = (state) => get(state, 'auth.user');

export const selectIsSignedIn = (state) => !!get(state, 'auth.user');

export const selectUserRole = (state) => get(state, 'auth.user.role');

export const selectIsAdmin = (state) => get(state, 'auth.user.role') === ADMIN;

export const selectIsRealtor = (state) =>
  get(state, 'auth.user.role') === REALTOR;

export const selectIsClient = (state) =>
  get(state, 'auth.user.role') === CLIENT;

export const selectAuthStatus = (state) => get(state, 'auth.status');

export const selectAuthError = (state) => get(state, 'auth.error');
