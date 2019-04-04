import * as types from './actionConstants';


export const fetchHotelInit = () => ({
    type: types.FETCH_HOTEL_INIT
});

export const fetchHotelSuccess = () => ({
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