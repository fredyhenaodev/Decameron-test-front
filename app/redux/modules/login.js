import { Map, fromJS } from 'immutable';
import { 
  FETCH_LOGIN_INIT,
  FETCH_LOGIN_SUCCESS,
  FETCH_LOGIN_FAILURE,
  FETCH_SIGNUP_INIT,
  FETCH_SIGNUP_SUCCESS,
  FETCH_SIGNUP_FAILURE
} from '../../actions/actionConstants';

const initialState = {
  usersLogin: Map({}),
  loading: false,
  error: null
};
const initialImmutableState = fromJS(initialState);
export default function reducer(state = initialImmutableState, action = {}) {
  switch (action.type) {
    case FETCH_LOGIN_INIT:
      return state.withMutations((mutableState) => {
        mutableState.set('error', null);
        mutableState.set('loading', true);
      });
    case FETCH_LOGIN_SUCCESS:
      return state.withMutations((mutableState) => {
        const items = fromJS(action.payload);
        mutableState.set('usersLogin', Map(items));
        mutableState.set('error', null);
        mutableState.set('loading', false);
      });
    case FETCH_LOGIN_FAILURE:
      return state.withMutations((mutableState) => {
        const items = fromJS(action.error);
        mutableState.set('error', items);
        mutableState.set('loading', false);
      });
    case FETCH_SIGNUP_INIT:
      return state.withMutations((mutableState) => {
        mutableState.set('error', null);
        mutableState.set('loading', true);
      });
    case FETCH_SIGNUP_SUCCESS:
      return state.withMutations((mutableState) => {
        mutableState.set('error', null);
        mutableState.set('loading', false);
      });
    case FETCH_SIGNUP_FAILURE:
      return state.withMutations((mutableState) => {
        const items = fromJS(action.error);
        mutableState.set('error', items);
        mutableState.set('loading', false);
      });
    default:
      return state;
  }
} 
