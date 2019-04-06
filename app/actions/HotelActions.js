import * as types from './actionConstants';


export const fetchHotelInit = () => ({
    type: types.FETCH_HOTEL_INIT
});

export const fetchHotelSuccess = (msg) => ({
    msg,
    type: types.FETCH_HOTEL_SUCCESS
});

export const fetchHotelFailure = (error) => ({
    type: types.FETCH_HOTEL_FAILURE,
    error
});

export const fetchHotelData = (items) => ({
    type: types.FETCH_DATA_HOTEL,
    items
});

export const removeHotelAction = (item) => ({
    type: types.REMOVE_HOTEL,
    item
});

export const removeHotelSaga = (item) => ({
    type: types.REMOVE_HOTEL_SAGA,
    item
});

export const addHotelAction = (anchor) => ({
    type: types.ADD_NEW_HOTEL,
    anchor
});

export const saveHotelAction = (item) => ({
    type: types.SAVE_HOTEL,
    item
});

export const saveHotelSaga = (item) => ({
    type: types.SAVE_HOTEL_SAGA,
    item
});

export const addHotelSaga = (item) => ({
    type: types.CREATE_HOTEL_SAGA,
    item
});

export const editHotelSaga = (item) => ({
    type: types.EDIT_HOTEL_SAGA,
    item
});

export const editHotelAction = (item) => ({
    type: types.EDIT_HOTEL,
    item
});

export const updateHotelAction = (event, item) => ({
    type: types.UPDATE_HOTEL,
    event,
    item
});

export const closeAction = () => ({
    type: types.CLOSE_FORM
});

export const submitAction = (newData) => ({
    type: types.SUBMIT_DATA,
    newData
});

export const closeNotifAction = () => ({
    type: types.CLOSE_NOTIF,
});

export const openNotifAction = (msg) => ({
    msg,
    type: types.OPEN_NOTIF,
});

