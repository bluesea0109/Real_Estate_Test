import { createAction } from 'redux-actions';
import { resolvedAction, rejectedAction } from 'utils/actions';

/**
 * Constants
 */

export const LIST_APARTMENT = 'LIST_APARTMENT';
export const CREATE_APARTMENT = 'CREATE_APARTMENT';
export const UPDATE_APARTMENT = 'UPDATE_APARTMENT';
export const DELETE_APARTMENT = 'DELETE_APARTMENT';

/**
 * Action Creators
 */

export const listApartment = createAction(LIST_APARTMENT);
export const listApartmentSuccess = createAction(
  resolvedAction(LIST_APARTMENT),
);
export const listApartmentFail = createAction(rejectedAction(LIST_APARTMENT));

export const createApartment = createAction(CREATE_APARTMENT);
export const createApartmentSuccess = createAction(
  resolvedAction(CREATE_APARTMENT),
);
export const createApartmentFail = createAction(
  rejectedAction(CREATE_APARTMENT),
);

export const updateApartment = createAction(UPDATE_APARTMENT);
export const updateApartmentSuccess = createAction(
  resolvedAction(UPDATE_APARTMENT),
);
export const updateApartmentFail = createAction(
  rejectedAction(UPDATE_APARTMENT),
);

export const deleteApartment = createAction(DELETE_APARTMENT);
export const deleteApartmentSuccess = createAction(
  resolvedAction(DELETE_APARTMENT),
);
export const deleteApartmentFail = createAction(
  rejectedAction(DELETE_APARTMENT),
);
