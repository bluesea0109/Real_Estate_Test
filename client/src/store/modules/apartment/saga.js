import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import { notification } from 'antd';
import * as actions from './actions';
import { getErrorMessage, errorParser } from 'utils/error-handler';

export const doListApartment = function* ({ payload }) {
  try {
    const res = yield call(
      axios.get,
      '/apartments/',
      payload && { params: payload },
    );
    yield put(actions.listApartmentSuccess(res.data));
  } catch (error) {
    yield put(actions.listApartmentFail(errorParser(error)));
    notification.error({ message: getErrorMessage(error) });
  }
};

export const doCreateApartment = function* ({ payload }) {
  try {
    yield call(axios.post, `/apartments/`, payload);
    yield put(actions.createApartmentSuccess());
    yield put(actions.listApartment({ page: 1 }));
    notification.success({ message: 'Successfully created apartment' });
  } catch (error) {
    yield put(actions.createApartmentFail(errorParser(error)));
    notification.error({ message: getErrorMessage(error) });
  }
};

export const doGetApartment = function* ({ payload }) {
  try {
    const res = yield call(axios.get, `/apartments/${payload}`);
    yield put(actions.getApartmentSuccess(res.data));
  } catch (error) {
    yield put(actions.getApartmentFail(errorParser(error)));
    notification.error({ message: getErrorMessage(error) });
  }
};

export const doUpdateApartment = function* ({ payload }) {
  try {
    const res = yield call(axios.patch, `/apartments/${payload.id}`, payload);
    yield put(actions.updateApartmentSuccess(res.data));
    notification.success({ message: 'Successfully updated apartment' });
  } catch (error) {
    yield put(actions.updateApartmentFail(errorParser(error)));
    notification.error({ message: getErrorMessage(error) });
  }
};

export const doDeleteApartment = function* ({ payload }) {
  try {
    yield call(axios.delete, `/apartments/${payload}`);
    yield put(actions.deleteApartmentSuccess());
    yield put(actions.listApartment({ page: 1 }));
    notification.success({ message: 'Successfully deleted apartment' });
  } catch (error) {
    yield put(actions.deleteApartmentFail(errorParser(error)));
    notification.error({ message: getErrorMessage(error) });
  }
};

export const saga = function* () {
  yield takeLatest(actions.LIST_APARTMENT, doListApartment);
  yield takeLatest(actions.CREATE_APARTMENT, doCreateApartment);
  yield takeLatest(actions.GET_APARTMENT, doGetApartment);
  yield takeLatest(actions.UPDATE_APARTMENT, doUpdateApartment);
  yield takeLatest(actions.DELETE_APARTMENT, doDeleteApartment);
};
