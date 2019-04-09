import {
    fetchHotelData,
    fetchHotelSuccess,
    fetchHotelFailure,
    removeHotelAction,
    saveHotelAction,
    submitAction
  } from 'dan-actions/HotelActions';

import { 
  FETCH_HOTEL_INIT, 
  REMOVE_HOTEL_SAGA, 
  CREATE_HOTEL_SAGA, 
  EDIT_HOTEL_SAGA,
  SAVE_HOTEL_SAGA
 } from 'dan-actions/actionConstants';
 
import API from '../services/api/hotel';
import { call, put, takeLatest } from 'redux-saga/effects';
  
export function* fetchGetHotels() {
    try {
      const { data } = yield call(API.hotel.getHotels);
      
      if (data) {
        yield put(fetchHotelSuccess(''));
        yield put(fetchHotelData(data));
      }
    } catch (e) {
      yield put(fetchHotelFailure(e.message)); 
    }
}

export function* fetchDeleteHotel(item) {
  try {
    const { data } = yield call(API.hotel.setDeleteHotel, item.item.toJS().id);
    
    if (data) {
      yield put(fetchHotelSuccess(data.message));
      yield put(removeHotelAction(item.item));
    }
  } catch (e) {
    yield put(fetchHotelFailure(e.message)); 
  }
}

export function* fetchCreateHotel(item) {
  try {
    const { data } = yield call(API.hotel.setCreateHotel, item.item.toJS());
    
    if (data) {
      yield put(fetchHotelSuccess(data.message));
      yield put(submitAction(data.hotel));
    }
  } catch (e) {
    yield put(fetchHotelFailure(e.message)); 
  }
}

export function* fetchSaveHotel(item) {
  try {
    const { data } = yield call(API.hotel.setUpdateHotel, item.item.toJS());
    if (data) {
      yield put(fetchHotelSuccess(data.message));
      yield put(saveHotelAction(item.item));
    }
  } catch (e) {
    yield put(fetchHotelFailure(e.message)); 
  }
}

export function* fetchUpdateHotel(item) {
  try {
    console.log(item)
    /*const { data } = yield call(API.hotel.setDeleteHotel, item.item.toJS().id);
    
    if (data) {
      yield put(fetchHotelSuccess());
      yield put(removeHotelAction(item));
    }*/
  } catch (e) {
    yield put(fetchHotelFailure(e.message)); 
  }
}
   
export function* allHotelsSaga() {
    yield takeLatest(FETCH_HOTEL_INIT, fetchGetHotels);
}

export function* deleteHotelSaga() {
  yield takeLatest(REMOVE_HOTEL_SAGA, fetchDeleteHotel);
}

export function* createHotelSaga() {
  yield takeLatest(CREATE_HOTEL_SAGA, fetchCreateHotel);
}

export function* updateHotelSaga() {
  yield takeLatest(EDIT_HOTEL_SAGA, fetchUpdateHotel);
}

export function* hotelSaveSaga() {
  yield takeLatest(SAVE_HOTEL_SAGA, fetchSaveHotel)
}
  