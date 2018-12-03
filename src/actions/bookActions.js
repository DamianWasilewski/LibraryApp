import axios from 'axios';

import { GET_BOOKS, ADD_BOOK, DELETE_BOOK } from './types';

export const getBooks = () => dispatch => {
  axios.get('https://damianlibrary.herokuapp.com/library')
  .then(res => dispatch({
    type: GET_BOOKS,
    payload: res.data
  }))
};