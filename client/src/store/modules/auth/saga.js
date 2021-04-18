import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import { notification } from 'antd';
import { setAuthToken } from 'utils/token';
import { getErrorMessage, errorParser } from 'utils/error-handler';
import * as actions from './actions';

export const doSignIn = function* ({ payload }) {
  try {
    const res = yield call(axios.post, '/auth/signin/', payload);
    setAuthToken(res.data.token);
    yield put(actions.signInSuccess(res.data.user));
  } catch (error) {
    yield put(actions.signInFail(errorParser(error)));
    notification.error({ message: getErrorMessage(error) });
  }
};

export const doSignUp = function* ({ payload }) {
  try {
    const res = yield call(axios.post, '/auth/signup/', payload);
    setAuthToken(res.data.token);
    yield put(actions.signUpSuccess(res.data.user));
  } catch (error) {
    yield put(actions.signUpFail(errorParser(error)));
    notification.error({ message: getErrorMessage(error) });
  }
};

export const doGetProfile = function* () {
  try {
    const res = yield call(axios.get, '/me/');
    yield put(actions.getProfileSuccess(res.data));
  } catch (error) {
    yield put(actions.getProfileFail(errorParser(error)));
    notification.error({ message: getErrorMessage(error) });
  }
};

export const doUpdateProfile = function* ({ payload }) {
  try {
    const res = yield call(axios.patch, '/me/', payload);
    yield put(actions.updateProfileSuccess(res.data));
    notification.success({ message: 'Successfully updated profile' });
  } catch (error) {
    yield put(actions.updateProfileFail(errorParser(error)));
    notification.error({ message: getErrorMessage(error) });
  }
};

export const saga = function* () {
  yield takeLatest(actions.SIGN_IN, doSignIn);
  yield takeLatest(actions.SIGN_UP, doSignUp);
  yield takeLatest(actions.GET_PROFILE, doGetProfile);
  yield takeLatest(actions.UPDATE_PROFILE, doUpdateProfile);
};
