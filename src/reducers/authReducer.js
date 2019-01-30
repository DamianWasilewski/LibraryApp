import { REGISTER_USER, AUTHENTICATED, UNAUTHENTICATED, AUTHENTICATION_ERROR } from '../actions/types';

let authState = {
  response: ''
}

export default function(state = authState, action) {
  switch(action.type) {
    case AUTHENTICATED:
      return {
        ...state,
        authenticated: true
      };
    case UNAUTHENTICATED:
      return {
        ...state,
        authenticated: false
    };
    case AUTHENTICATION_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case REGISTER_USER:
      return {
        ...state, 
        response: action.payload
      };
    default:
      return state;
  }
}