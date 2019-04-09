import * as types from './actionConstants';


export const fetchRoomHotelSaga = (item) => ({
    type: types.FETCH_ROOM_HOTEL_INIT_SAGA,
    item
});

export const fetchRoomSaga = (item) => ({
    type: types.FETCH_ROOM_INIT_SAGA,
    item
});

export const fetchAccommodationSaga = (item) => ({
    type: types.FETCH_ACCOMMODATION_INIT_SAGA,
    item
});

export const fetchRoomHotelSuccess = (msg) => ({
    msg,
    type: types.FETCH_ROOM_HOTEL_SUCCESS
});

export const fetchRoomHotelFailure = (error) => ({
    type: types.FETCH_ROOM_HOTEL_FAILURE,
    error
});

export const fetchRoomHotelInit = (items) => ({
    type: types.FETCH_ROOM_HOTEL_INIT,
    items
});

export const fetchRoomInit = (items) => ({
    type: types.FETCH_ROOM_INIT,
    items
});

export const fetchAccommodationInit = (items) => ({
    type: types.FETCH_ACCOMMODATION_INIT,
    items
});


export const removeRoomHotelAction = (item) => ({
    type: types.REMOVE_ROOM_HOTEL,
    item
});

export const removeRoomHotelSaga = (item) => ({
    type: types.REMOVE_ROOM_HOTEL_SAGA,
    item
});

export const addRoomHotelAction = (item) => ({
    type: types.ADD_NEW_ROOM_HOTEL,
    item
});

export const addRoomHotelSaga = (item) => ({
    type: types.ADD_NEW_ROOM_HOTEL_SAGA,
    item
});

