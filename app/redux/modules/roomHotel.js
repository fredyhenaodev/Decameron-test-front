import { fromJS, List, Map } from 'immutable';
import { 
    FETCH_ROOM_HOTEL_INIT,
    FETCH_ROOM_HOTEL_SUCCESS,
    FETCH_ROOM_HOTEL_FAILURE,
    ADD_NEW_ROOM_HOTEL,
    REMOVE_ROOM_HOTEL,
    FETCH_ROOM_INIT,
    FETCH_ACCOMMODATION_INIT,
    CLOSE_NOTIF_ROOM,
    OPEN_NOTIF_ROOM
} from '../../actions/actionConstants';

const initialState = {
    hotelData: List([]),
    formValues: Map(),
    typeRoom: List([]),
    rooms: List([]),
    accommodations: List([]),
    notifMsg: '',
    loading: false,
    error: null
};

const initialImmutableState = fromJS(initialState);

export default function reducer(state = initialImmutableState, action = {})
{
    switch(action.type){
        case FETCH_ROOM_HOTEL_INIT:
            return state.withMutations((mutableState) => {
                const item = fromJS(action.items);
                const room = fromJS(action.items.type_rooms);
                mutableState.set('hotelData', item);
                mutableState.set('typeRoom', room);
                mutableState.set('error', null);
                mutableState.set('loading', true);
            });
        
        case FETCH_ROOM_INIT:
            return state.withMutations((mutableState) => {
                const items = fromJS(action.items);
                mutableState.set('rooms', items);
                mutableState.set('error', null);
                mutableState.set('loading', true);
            });

        case FETCH_ACCOMMODATION_INIT:
            return state.withMutations((mutableState) => {
                mutableState.set('accommodations', List([]));
                const items = fromJS(action.items.accommodations);
                mutableState.set('accommodations', items);
                mutableState.set('error', null);
                mutableState.set('loading', true);
            });
        
        case FETCH_ROOM_HOTEL_SUCCESS:
            return state.withMutations((mutableState) => {
                const items = fromJS(action.msg);
                mutableState.set('error', null);
                mutableState.set('loading', false);
                mutableState.set('notifMsg', items);
            });

        case FETCH_ROOM_HOTEL_FAILURE:
            return state.withMutations((mutableState) => {
                const items = fromJS(action.error);
                mutableState.set('error', items);
                mutableState.set('loading', false);
                mutableState.set('notifMsg', items);
            });

        case ADD_NEW_ROOM_HOTEL:
          return state.withMutations((mutableState) => {
            mutableState
            .update('hotelData', hotelData => hotelData.unshift(Map(action.item)));
              mutableState.set('showFrm', false);
              mutableState.set('formValues', Map());
            });

        case REMOVE_ROOM_HOTEL:
            return state.withMutations((mutableState) => {
              const index = state.get('hotelData').indexOf(action.item);
              mutableState
                .update('hotelData', hotelData => hotelData.splice(index, 1));
            });
        
        case CLOSE_NOTIF_ROOM:
            return state.withMutations((mutableState) => {
              mutableState.set('notifMsg', '');
            });

        case OPEN_NOTIF_ROOM:
          return state.withMutations((mutableState) => {
            mutableState.set('notifMsg', action.notif);
          });
        
        default:
            return state;
    }
}
