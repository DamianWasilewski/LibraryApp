import axios from 'axios';

import { REGISTER_USER,  AUTHENTICATED, AUTHENTICATION_ERROR, UNAUTHENTICATED } from './types';

export function loginUser(user) {
  return (dispatch) => {
      axios.post('https://damianlibrary.herokuapp.com/users/login',  user )
      .then(res => dispatch({ 
        type: AUTHENTICATED,
        payload: localStorage.setItem('usertoken', res.data.token)}))
      .catch(error => {
        dispatch({
          type: AUTHENTICATION_ERROR,
          payload: 'Invalid username or password'
        })
      })
  };
}

export const registerUser = user => dispatch => {
  axios.post('https://damianlibrary.herokuapp.com/users/register', user)
    .then(res => dispatch({
      type: REGISTER_USER,
      payload: res.data,
    }))
}

export const logoutUser = () => dispatch => {
  localStorage.clear();
  dispatch({
    type: UNAUTHENTICATED
  });
}
