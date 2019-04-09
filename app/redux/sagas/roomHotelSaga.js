import { 
    FETCH_ROOM_HOTEL_INIT_SAGA, 
    REMOVE_ROOM_HOTEL_SAGA, 
    ADD_NEW_ROOM_HOTEL_SAGA,
    FETCH_ROOM_INIT_SAGA,
    FETCH_ACCOMMODATION_INIT_SAGA
   } from 'dan-actions/actionConstants';

import {
    fetchHotelSuccess,
    fetchHotelFailure,
  } from 'dan-actions/HotelActions';

import {
    fetchRoomHotelInit,
    fetchRoomInit,
    fetchAccommodationInit
  } from 'dan-actions/RoomHotelAction';

import API from '../services/api/hotel';
import { call, put, takeLatest } from 'redux-saga/effects';

export function* fetchGetHotel(item) {
    try {
      const { data } = yield call(API.hotel.getHotel, item.item);
      if (data) {
        yield put(fetchHotelSuccess(''));
        yield put(fetchRoomHotelInit(data));
      }
    } catch (e) {
      yield put(fetchHotelFailure(e.message)); 
    }
}

export function* fetchGetRooms() {
  try {
    const { data } = yield call(API.room.getRooms);
    if (data) {
      yield put(fetchHotelSuccess(''));
      yield put(fetchRoomInit(data));
    }
  } catch (e) {
    yield put(fetchHotelFailure(e.message)); 
  }
}

export function* fetchGetAccommodations(item) {
  try {
    const { data } = yield call(API.room.getAccommodations, item.item);
    if (data) {
      yield put(fetchHotelSuccess(''));
      yield put(fetchAccommodationInit(data));
    }
  } catch (e) {
    yield put(fetchHotelFailure(e.message)); 
  }
}

export function* fetchSetRoom(item) {
  try {
    const { data } = yield call(API.hotel.setCreateRoom, item.item);
    if (data) {
      yield put(fetchHotelSuccess('Tipo de Habitación creada correctamente.'));
      yield put(fetchRoomHotelInit(data));
    }
  } catch (e) {
    yield put(fetchHotelFailure(e.message)); 
  }
}

export function* fetchDeleteRoom(item) {
  try {
    const { data } = yield call(API.hotel.setDeleteRoom, item.item);
    if (data) {
      yield put(fetchHotelSuccess('Tipo de Habitación eliminada correctamente.'));
      yield put(fetchRoomHotelInit(data));
    }
  } catch (e) {
    yield put(fetchHotelFailure(e.message)); 
  }
}

export function* getRoomHotelSaga() {
    yield takeLatest(FETCH_ROOM_HOTEL_INIT_SAGA, fetchGetHotel);
}

export function* getRoomSaga() {
  yield takeLatest(FETCH_ROOM_INIT_SAGA, fetchGetRooms);
}

export function* getAccommodationSaga() {
  yield takeLatest(FETCH_ACCOMMODATION_INIT_SAGA, fetchGetAccommodations);
}

export function* setRoomSaga() {
  yield takeLatest(ADD_NEW_ROOM_HOTEL_SAGA, fetchSetRoom);
}

export function* deleteRoomSaga() {
  yield takeLatest(REMOVE_ROOM_HOTEL_SAGA, fetchDeleteRoom);
}