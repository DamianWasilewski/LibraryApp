import axios from 'axios';

import { LOGIN_USER, REGISTER_USER } from './types';

export const loginUser = () => dispatch => {
  axios.post('https://damianlibrary.herokuapp.com/users/login')
    .then(res => dispatch({
      type: LOGIN_USER,
      payload: res.data
    }))
}

export const registerUser = user => dispatch => {
  axios.post('https://damianlibrary.herokuapp.com/users/register', user)
    .then(res => dispatch({
      type: REGISTER_USER,
      payload: res.data
    }))
}