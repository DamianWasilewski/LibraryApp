import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser, logoutUser } from '../../actions/authActions';

import { Link, withRouter } from 'react-router-dom';

import './SideDrawer.css'

class SideDrawer extends Component {

  logOutHandler(e) {
    e.preventDefault()
    this.props.logoutUser()
    this.props.history.push('/login')
  }

  render() {
    let drawerClasses = 'side-drawer';
    if(this.props.show) {
      drawerClasses = 'side-drawer open';
    }

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
      
        <nav className={drawerClasses}>     
            {localStorage.usertoken ? profileLink : loginRegistrationLink}
        </nav>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.auth
});

export default connect(mapStateToProps, { loginUser, logoutUser })(withRouter(SideDrawer));