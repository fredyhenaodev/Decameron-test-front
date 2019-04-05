import { fromJS, List } from 'immutable';
import { 
    FETCH_DATA_HOTEL,
    FETCH_HOTEL_INIT,
    FETCH_HOTEL_SUCCESS,
    FETCH_HOTEL_FAILURE,
    REMOVE_HOTEL,
    CLOSE_NOTIF
} from '../../actions/actionConstants';

const initialState = {
    hotelData: List([]),
    notifMsg: '',
    loading: false,
    error: null
  };

const initialImmutableState = fromJS(initialState);

export default function reducer(state = initialImmutableState, action = {})
{
    switch(action.type){
        case FETCH_HOTEL_INIT:
            return state.withMutations((mutableState) => {
                mutableState.set('error', null);
                mutableState.set('loading', true);
            });
        
        case FETCH_HOTEL_SUCCESS:
            return state.withMutations((mutableState) => {
                mutableState.set('error', null);
                mutableState.set('loading', false);
            });

        case FETCH_HOTEL_FAILURE:
            return state.withMutations((mutableState) => {
                const items = fromJS(action.error);
                mutableState.set('error', items);
                mutableState.set('loading', false);
            });

        case FETCH_DATA_HOTEL:
            return state.withMutations((mutableState) => {
                const items = fromJS(action.items);
                mutableState.set('hotelData', items);
            });

        case REMOVE_HOTEL:
            return state.withMutations((mutableState) => {
              const index = state.get('hotelData').indexOf(action.item);
              mutableState
                .update('hotelData', hotelData => hotelData.splice(index, 1));
            });
        
        default:
            return state;
    }
}

