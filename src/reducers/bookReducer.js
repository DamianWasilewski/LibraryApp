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
      };
    case DELETE_BOOK:
      return {
        ...state,
        books: state.books.filter(book => book.book_id !== action.payload)
      };
    default:
      return state;
  }
}