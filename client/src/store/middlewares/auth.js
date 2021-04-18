import get from 'lodash/get';
import { SIGN_OUT } from 'store/modules/auth';

const AuthMiddleware = (store) => (next) => (action) => {
  if (action.type.includes('/fail') !== -1) {
    const status = get(action, 'payload.response.status');

    if (status === 401) {
      store.dispatch({ type: SIGN_OUT });
    }
  }

  return next(action);
};

export default AuthMiddleware;
