import { handleActions, combineActions } from 'redux-actions';
import { RESET_ERROR } from 'store/modules/global';
import { resolvedAction, rejectedAction } from 'utils/actions';

import { LIST_USER, CREATE_USER, UPDATE_USER, DELETE_USER } from './actions';

const initialState = {
  users: {
    currentPage: 1,
    totalCount: 0,
    results: [],
  },
  status: 'INIT',
  error: null,
};

export const reducer = handleActions(
  {
    [combineActions(LIST_USER, CREATE_USER, UPDATE_USER, DELETE_USER)]: (
      state,
      { type },
    ) => ({
      ...state,
      error: null,
      status: type,
    }),
    [resolvedAction(LIST_USER)]: (state, { payload, type }) => ({
      ...state,
      users: payload,
      status: type,
    }),
    [resolvedAction(CREATE_USER)]: (state, { type }) => ({
      ...state,
      status: type,
    }),
    [resolvedAction(UPDATE_USER)]: (state, { payload, type }) => ({
      ...state,
      users: {
        ...state.users,
        results: state.users.results.map((user) =>
          user.id === payload.id ? payload : user,
        ),
      },
      status: type,
    }),
    [resolvedAction(DELETE_USER)]: (state, { payload, type }) => ({
      ...state,
      status: type,
    }),
    [combineActions(
      rejectedAction(LIST_USER),
      rejectedAction(UPDATE_USER),
      rejectedAction(DELETE_USER),
    )]: (state, { payload, type }) => ({
      ...state,
      error: payload,
      status: type,
    }),
    [RESET_ERROR]: (state) => ({
      ...state,
      error: null,
    }),
  },
  initialState,
);
