import { fromJS, List, Map } from 'immutable';
import { 
    FETCH_DATA_HOTEL,
    FETCH_HOTEL_INIT,
    FETCH_HOTEL_SUCCESS,
    FETCH_HOTEL_FAILURE,
    REMOVE_HOTEL,
    ADD_EMPTY_HOTEL,
    SAVE_HOTEL,
    EDIT_HOTEL,
    UPDATE_HOTEL,
    CLOSE_NOTIF
} from '../../actions/actionConstants';

const initialState = {
    hotelData: List([]),
    notifMsg: '',
    loading: false,
    error: null
  };

const initialItem = (keyTemplate, anchor) => {
  const [...rawKey] = keyTemplate.keys();
  const staticKey = {
    id: (+new Date() + Math.floor(Math.random() * 999999)).toString(36),
  };
  for (let i = 0; i < rawKey.length; i += 1) {
    if (rawKey[i] !== 'id' && rawKey[i] !== 'edited') {
      staticKey[rawKey[i]] = anchor[i].initialValue;
    }
  }
    // Push another static key
  staticKey.edited = true;
  
  return Map(staticKey);
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

        case ADD_EMPTY_HOTEL:
            return state.withMutations((mutableState) => {
              const raw = state.get('hotelData').last();
              const initial = initialItem(raw, action.anchor);
              mutableState.update('hotelData', hotelData => hotelData.unshift(initial));
            });

        case EDIT_HOTEL:
            return state.withMutations((mutableState) => {
              const index = state.get('hotelData').indexOf(action.item);
              mutableState.update('hotelData', hotelData => hotelData
                .setIn([index, 'edited'], true)
              );
            });
        
        case SAVE_HOTEL:
            return state.withMutations((mutableState) => {
              const index = state.get('hotelData').indexOf(action.item);
              mutableState
                .update('hotelData', hotelData => hotelData
                  .setIn([index, 'edited'], false)
                );
            });

        case REMOVE_HOTEL:
            return state.withMutations((mutableState) => {
              const index = state.get('hotelData').indexOf(action.item);
              mutableState
                .update('hotelData', hotelData => hotelData.splice(index, 1));
            });

        case UPDATE_HOTEL:
            return state.withMutations((mutableState) => {
              const index = state.get('hotelData').indexOf(action.item);
              const cellTarget = action.event.target.name;
              const newVal = type => {
                if (type === 'checkbox') {
                  return action.event.target.checked;
                }
                return action.event.target.value;
              };
              mutableState.update('hotelData', hotelData => hotelData
                .setIn([index, cellTarget], newVal(action.event.target.type))
              );
            });
        
        default:
            return state;
    }
}

