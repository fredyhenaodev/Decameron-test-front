import {
    fetchHotelData,
    fetchHotelSuccess,
    fetchHotelFailure,
    removeHotelAction
  } from 'dan-actions/HotelActions';

import { FETCH_HOTEL_INIT, REMOVE_HOTEL_SAGA } from 'dan-actions/actionConstants';
 
import API from '../services/api/hotel';
import { call, put, takeLatest } from 'redux-saga/effects';
  
export function* fetchGetHotels() {
    try {
      const { data } = yield call(API.hotel.getHotels);
      
      if (data) {
        yield put(fetchHotelSuccess());
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
      yield put(fetchHotelSuccess());
      yield put(removeHotelAction(item));
    }
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
  