import { handleActions, combineActions } from 'redux-actions';
import { RESET_ERROR } from 'store/modules/global';
import { resolvedAction, rejectedAction } from 'utils/actions';

import {
  LIST_APARTMENT,
  CREATE_APARTMENT,
  UPDATE_APARTMENT,
  DELETE_APARTMENT,
} from './actions';

const initialState = {
  apartments: {
    currentPage: 1,
    totalCount: 0,
    results: [],
  },
  status: 'INIT',
  error: null,
};

export const reducer = handleActions(
  {
    [combineActions(
      LIST_APARTMENT,
      CREATE_APARTMENT,
      UPDATE_APARTMENT,
      DELETE_APARTMENT,
    )]: (state, { type }) => ({
      ...state,
      error: null,
      status: type,
    }),
    [resolvedAction(LIST_APARTMENT)]: (state, { payload, type }) => ({
      ...state,
      apartments: payload,
      status: type,
    }),
    [resolvedAction(CREATE_APARTMENT)]: (state, { type }) => ({
      ...state,
      status: type,
    }),
    [resolvedAction(UPDATE_APARTMENT)]: (state, { type }) => ({
      ...state,
      status: type,
    }),
    [resolvedAction(DELETE_APARTMENT)]: (state, { type }) => ({
      ...state,
      status: type,
    }),
    [combineActions(
      rejectedAction(LIST_APARTMENT),
      rejectedAction(CREATE_APARTMENT),
      rejectedAction(UPDATE_APARTMENT),
      rejectedAction(DELETE_APARTMENT),
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
