import { createAction } from 'redux-actions';
import { resolvedAction, rejectedAction } from 'utils/actions';

/**
 * Constants
 */

export const SIGN_IN = 'SIGN_IN';
export const SIGN_UP = 'SIGN_UP';
export const SIGN_OUT = 'SIGN_OUT';

export const GET_PROFILE = 'GET_PROFILE';
export const UPDATE_PROFILE = 'UPDATE_PROFILE';

/**
 * Action Creators
 */

export const signIn = createAction(SIGN_IN);
export const signInSuccess = createAction(resolvedAction(SIGN_IN));
export const signInFail = createAction(rejectedAction(SIGN_IN));

export const signOut = createAction(SIGN_OUT);

export const signUp = createAction(SIGN_UP);
export const signUpSuccess = createAction(resolvedAction(SIGN_UP));
export const signUpFail = createAction(rejectedAction(SIGN_UP));

export const getProfile = createAction(GET_PROFILE);
export const getProfileSuccess = createAction(resolvedAction(GET_PROFILE));
export const getProfileFail = createAction(rejectedAction(GET_PROFILE));

export const updateProfile = createAction(UPDATE_PROFILE);
export const updateProfileSuccess = createAction(
  resolvedAction(UPDATE_PROFILE),
);
export const updateProfileFail = createAction(rejectedAction(UPDATE_PROFILE));
