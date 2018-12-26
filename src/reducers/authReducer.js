import { LOGIN_USER, REGISTER_USER, LOGOUT_USER } from '../actions/types';

let authState = {
  users: [],
  token: null,
  response: ''
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
        response: action.payload
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