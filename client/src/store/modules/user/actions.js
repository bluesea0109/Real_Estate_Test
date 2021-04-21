import { createAction } from 'redux-actions';
import { resolvedAction, rejectedAction } from 'utils/actions';

/**
 * Constants
 */

export const LIST_USER = 'LIST_USER';
export const CREATE_USER = 'CREATE_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const DELETE_USER = 'DELETE_USER';

/**
 * Action Creators
 */

export const listUser = createAction(LIST_USER);
export const listUserSuccess = createAction(resolvedAction(LIST_USER));
export const listUserFail = createAction(rejectedAction(LIST_USER));

export const createUser = createAction(CREATE_USER);
export const createUserSuccess = createAction(resolvedAction(CREATE_USER));
export const createUserFail = createAction(rejectedAction(CREATE_USER));

export const updateUser = createAction(UPDATE_USER);
export const updateUserSuccess = createAction(resolvedAction(UPDATE_USER));
export const updateUserFail = createAction(rejectedAction(UPDATE_USER));

export const deleteUser = createAction(DELETE_USER);
export const deleteUserSuccess = createAction(resolvedAction(DELETE_USER));
export const deleteUserFail = createAction(rejectedAction(DELETE_USER));
