import { LOGIN_USER, REGISTER_USER } from '../actions/types';

const authState = {
  users: []
}

export default function(state = authState, action) {
  switch(action.type) {
    case LOGIN_USER:
      return {
        ...state
      };
    case REGISTER_USER:
      return {
        ...state,
        users: [action.payload, ...state.users],
      };
    default:
      return state;
  }
}