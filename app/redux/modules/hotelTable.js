import { fromJS, List, Map } from 'immutable';
import { 
    FETCH_DATA_HOTEL,
    FETCH_HOTEL_INIT,
    FETCH_HOTEL_SUCCESS,
    FETCH_HOTEL_FAILURE,
    REMOVE_HOTEL,
    ADD_NEW_HOTEL,
    SAVE_HOTEL,
    EDIT_HOTEL,
    UPDATE_HOTEL,
    CLOSE_FORM,
    SUBMIT_DATA,
    OPEN_NOTIF,
    CLOSE_NOTIF
} from '../../actions/actionConstants';

const initialState = {
    hotelData: List([]),
    formValues: Map(),
    showFrm: false,
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
                const items = fromJS(action.msg);
                mutableState.set('error', null);
                mutableState.set('loading', false);
                mutableState.set('notifMsg', items);
            });

        case FETCH_HOTEL_FAILURE:
            return state.withMutations((mutableState) => {
                const items = fromJS(action.error);
                mutableState.set('error', items);
                mutableState.set('loading', false);
                mutableState.set('notifMsg', items);
            });

        case FETCH_DATA_HOTEL:
            return state.withMutations((mutableState) => {
                const items = fromJS(action.items);
                mutableState.set('hotelData', items);
            });

        case ADD_NEW_HOTEL:
          return state.withMutations((mutableState) => {
            const raw = state.get('hotelData').last();
            mutableState.set('showFrm', true);
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

        case SUBMIT_DATA:
          return state.withMutations((mutableState) => {
            mutableState
            .update('hotelData', hotelData => hotelData.unshift(Map(action.newData)));
              mutableState.set('showFrm', false);
              mutableState.set('formValues', Map());
            });

        case CLOSE_FORM:
            return state.withMutations((mutableState) => {
              mutableState
                .set('formValues', Map())
                .set('showFrm', false);
            });
        
        case CLOSE_NOTIF:
            return state.withMutations((mutableState) => {
              mutableState.set('notifMsg', '');
            });

        case OPEN_NOTIF:
          return state.withMutations((mutableState) => {
            mutableState.set('notifMsg', action.notif);
          });
        
        default:
            return state;
    }
}

