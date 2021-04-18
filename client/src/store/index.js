import { createBrowserHistory } from 'history';
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import { all } from 'redux-saga/effects';
import authMiddleware from 'store/middlewares/auth';
import { reducer as authReducer, saga as authSaga } from 'store/modules/auth';
import { reducer as userReducer, saga as userSaga } from 'store/modules/user';
import {
  reducer as apartmentReducer,
  saga as apartmentSaga,
} from 'store/modules/apartment';

// Create a history of your choosing (we're using a browser history in this case)
export const history = createBrowserHistory();

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history);

// Redux-saga middleware
const sagaMiddleware = createSagaMiddleware();

const middlewares = [middleware, sagaMiddleware, authMiddleware];

const enhancers = [applyMiddleware(...middlewares)];

// If Redux DevTools Extension is installed use it, otherwise use Redux compose
/* eslint-disable no-underscore-dangle */
const composeEnhancers =
  process.env.NODE_ENV !== 'production' &&
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;
/* eslint-enable */

export const store = createStore(
  combineReducers({
    auth: authReducer,
    user: userReducer,
    apartment: apartmentReducer,
    router: connectRouter(history),
  }),
  composeEnhancers(...enhancers),
);

// Run saga middleware
sagaMiddleware.run(function* rootSaga() {
  yield all([authSaga(), userSaga(), apartmentSaga()]);
});
