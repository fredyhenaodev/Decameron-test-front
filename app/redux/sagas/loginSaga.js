import {
    fetchLoginSuccess,
    fetchLoginFailure
  } from 'dan-actions/LoginActions';
import {FETCH_LOGIN_INIT, FETCH_SIGNUP_INIT} from 'dan-actions/actionConstants';
  
import API from '../services/api/login';
import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchSignupSuccess, fetchSignupFailure } from '../../actions/LoginActions';
  
  
export function* fetchLogin(action) {
    const { payload } = action;
    try {
      const { data } = yield call(API.auth.getLogin, payload);
      if (data) {
        yield put(fetchLoginSuccess(payload));
        yield localStorage.clear();
        yield localStorage.setItem('token', data.token);
        window.location.replace('/app');
      }
    } catch (e) {
      yield put(fetchLoginFailure(e.message)); 
    }
}

export function* fetchsignup(action) {
    const { payload } = action;
    try {
        const { data } = yield call(API.auth.setRegister, payload);
        if(data){
            yield put(fetchSignupSuccess(payload));
            yield localStorage.clear();
            yield localStorage.setItem('token', data.token);
            window.location.replace('/app');
        }
    } catch(e) {
        yield put(fetchSignupFailure(e.message));
    }
}
  
  
  export function* loginSaga() {
    yield takeLatest(FETCH_LOGIN_INIT, fetchLogin);
  }

  export function* signupSaga() {
      yield takeLatest(FETCH_SIGNUP_INIT, fetchsignup);
  }
  