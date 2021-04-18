import { createAction } from 'redux-actions';

/**
 * Constants
 */

export const RESET_ERROR = 'RESET_ERROR';

/**
 * Action Creators
 */

export const resetError = createAction(RESET_ERROR);
