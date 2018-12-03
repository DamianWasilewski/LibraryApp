import { GET_BOOKS, ADD_BOOK, DELETE_BOOK } from '../actions/types';

const initialState = {
  books: []
}

export default function(state = initialState, action) {
  switch(action.type) {
    case GET_BOOKS:
      return {
        ...state,
        books: action.payload
      }
    default:
      return state;
  }
}