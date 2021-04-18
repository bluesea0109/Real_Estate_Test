import { handleActions, combineActions } from 'redux-actions';
import { RESET_ERROR } from 'store/modules/global';
import { resolvedAction, rejectedAction } from 'utils/actions';
import { clearAuthToken } from 'utils/token';

import {
  SIGN_IN,
  SIGN_OUT,
  SIGN_UP,
  GET_PROFILE,
  UPDATE_PROFILE,
} from './actions';

const initialState = {
  user: null,
  status: 'INIT',
  error: null,
};

export const reducer = handleActions(
  {
    [combineActions(SIGN_IN, SIGN_UP, GET_PROFILE, UPDATE_PROFILE)]: (
      state,
      { type },
    ) => ({
      ...state,
      error: null,
      status: type,
    }),
    [combineActions(resolvedAction(SIGN_IN), resolvedAction(SIGN_UP))]: (
      state,
      { payload, type },
    ) => ({
      ...state,
      user: payload,
      status: type,
    }),
    [combineActions(
      resolvedAction(GET_PROFILE),
      resolvedAction(UPDATE_PROFILE),
    )]: (state, { payload, type }) => ({
      ...state,
      user: payload,
      status: type,
    }),
    [combineActions(
      rejectedAction(SIGN_IN),
      rejectedAction(SIGN_UP),
      rejectedAction(GET_PROFILE),
      rejectedAction(UPDATE_PROFILE),
    )]: (state, { payload, type }) => ({
      ...state,
      error: payload,
      status: type,
    }),
    [SIGN_OUT]: () => {
      clearAuthToken();
      return { ...initialState, user: null };
    },
    [RESET_ERROR]: (state) => ({
      ...state,
      error: null,
    }),
  },
  initialState,
);
