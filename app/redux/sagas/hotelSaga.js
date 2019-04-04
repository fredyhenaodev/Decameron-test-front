import {
    fetchHotelData,
    fetchHotelSuccess,
    fetchHotelFailure
  } from 'dan-actions/HotelActions';

import { FETCH_HOTEL_INIT } from 'dan-actions/actionConstants';
 
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
   
export function* allHotelsSaga() {
    yield takeLatest(FETCH_HOTEL_INIT, fetchGetHotels);
  }
  