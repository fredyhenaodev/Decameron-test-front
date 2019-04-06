import * as types from './actionConstants';

export const fetchLoginInit = user => ({
    type: types.FETCH_LOGIN_INIT,
    payload: user
});

export const fetchLoginSuccess = user => ({
    type: types.FETCH_LOGIN_SUCCESS,
    payload: user
});

export const fetchLoginFailure = error => ({
    type: types.FETCH_LOGIN_FAILURE,
    error
});

export const fetchSignupInit = data => ({
    type: types.FETCH_SIGNUP_INIT,
    payload: data
});


export const fetchSignupSuccess = msg => ({
    type: types.FETCH_SIGNUP_SUCCESS,
    payload: msg
});

export const fetchSignupFailure = error => ({
    type: types.FETCH_SIGNUP_FAILURE,
    error
});