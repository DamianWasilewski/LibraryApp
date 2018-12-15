import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import './Navbar.css'

class Navbar extends Component {

  logOutHandler(e) {
    e.preventDefault()
    localStorage.removeItem('usertoken')
    this.props.history.push('/login')
  }

  render() {
    const loginRegistrationLink = (
      <ul className='navbar-navigation-dynamic'>
        <li className='navbar-navigation-item'>
          <Link to='/login' className='navbar-navigation-link'>
            Login
          </Link>
        </li>
        <li className='navbar-navigation-item'>
          <Link to='/register' className='navbar-navigation-link'>
            Register
          </Link>
        </li>
      </ul>
    )
    const profileLink = (
      <ul className='navbar-navigation-dynamic'>
        <li className='navbar-navigation-item'>
          <Link to='/profile' className='navbar-navigation-link'>
            Account
          </Link>
        </li>
        <li className='navbar-navigation-item'>
          <a href='#' onClick={this.logOutHandler.bind(this)} className='navbar-navigation-link'>
            Logout
          </a>
        </li>
      </ul>
    )

    return (
      <div className='navbar'>
        <ul className="navbar-navigation">
          <li className="navbar-navigation-item">
            <Link to='/' className='navbar-navigation-link'>
              Home
            </Link>
          </li>
        </ul>
        {localStorage.usertoken ? profileLink : loginRegistrationLink}
      </div>
    )
  }
}

export default withRouter(Navbar)