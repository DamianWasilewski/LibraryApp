import { LOGIN_USER, REGISTER_USER, LOGOUT_USER } from '../actions/types';

const authState = {
  users: [],
  token: null
}

export default function(state = authState, action) {
  switch(action.type) {
    case LOGIN_USER:
      return {
        ...state,
        token: action.payload,
      };
    case REGISTER_USER:
      return {
        ...state,
        users: [action.payload, ...state.users], 
        status: action.status
      };
    case LOGOUT_USER:
      return {
        ...state,
        token: action.payload
      }
    default:
      return state;
  }
}