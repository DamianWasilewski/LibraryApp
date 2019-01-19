import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';

import './Profile.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fab } from '@fortawesome/free-brands-svg-icons';

class Profile extends Component {
  state = {
    user_name: '',
    first_name: '',
    last_name: '',
    email: ''
  }

  componentDidMount() {
    const token = localStorage.usertoken;
    const decoded = jwt_decode(token);
    const { user_name, first_name, last_name, email } = decoded;
    this.setState({
      user_name: user_name,
      first_name: first_name,
      last_name: last_name,
      email: email
    })
  }

  render() {
    const { user_name, first_name, last_name, email } = this.state;
    return (
      <div className="profile">
        <div className="profile__title"><h1>Account Details</h1></div>
        <div className="profile__items">
          <div className="profile__items-item"><span><b>Username:</b>   {user_name}</span></div>
          <div className="profile__items-item"><span><b>First name:</b> {first_name}</span></div>
          <div className="profile__items-item"><span><b>Last name:</b> {last_name}</span></div>
          <div className="profile__items-item"><span><b>Email:</b> {email}</span></div>
        </div>
      </div>
    )
  }
}

export default Profile;