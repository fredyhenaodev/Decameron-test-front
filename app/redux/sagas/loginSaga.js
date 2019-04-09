import { stopSubmit } from 'redux-form';
import {
    fetchLoginSuccess,
    fetchLoginFailure,
    fetchLogoutSuccess,
    fetchLogoutFailure,
  } from 'dan-actions/LoginActions';

import { FETCH_LOGIN_INIT, FETCH_LOGOUT_INIT } from 'dan-actions/actionConstants';
  
import API from '../services/api/login';
import { call, put, takeLatest } from 'redux-saga/effects';  
  
export function* fetchLogin(action) {
    const { payload } = action;
    try {
      const { data } = yield call(API.auth.getLogin, payload);
      if (data) {
        yield put(fetchLoginSuccess(payload));
        yield localStorage.clear();
        yield localStorage.setItem('token', data.access_token);
        window.location.replace('/app/hotels');
      }
    } catch (e) {
      // Error Form
      yield put(stopSubmit('Login', { _error: e.message }));
      yield put(fetchLoginFailure(e.message)); 
    }
}

export function* fetchLogout() {
  try {
    //const data = yield call(API.auth.getLogout);

    //yield put(fetchLogoutSuccess(data));
    yield localStorage.clear();
    window.location.replace('/login');
  } catch (e) {
    yield put(fetchLogoutFailure(e.message));
  }
}
  
  export function* loginSaga() {
    yield takeLatest(FETCH_LOGIN_INIT, fetchLogin);
  }

  export function* logoutSaga() {
    yield takeLatest(types.FETCH_LOGOUT_INIT, fetchLogout);
  }
  