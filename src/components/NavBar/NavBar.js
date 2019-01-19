import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser, logoutUser } from '../../actions/authActions';

import { Link, withRouter } from 'react-router-dom';

import '../SideDrawer/DrawerToggler';

import './Navbar.css'
import DrawerToggler from '../SideDrawer/DrawerToggler';

class Navbar extends Component {

  logOutHandler(e) {
    e.preventDefault()
    this.props.logoutUser()
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
            Profile
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
      <header className='navbar'>
        <nav className='navbar__navigation'>
          <div className='navbar__toggle-button'>
            <DrawerToggler click={this.props.drawerToggleHandler}/>
          </div>
          <div className='navbar__logo'>
            <Link to='/' className='navbar__navigation-link'>
            Home
            </Link>
          </div>
          <div className='distance' />
          <div className='navbar__navigation-items'>
            {localStorage.usertoken ? profileLink : loginRegistrationLink}
          </div>
        </nav>
      </header>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.auth
});

export default connect(mapStateToProps, { loginUser, logoutUser })(withRouter(Navbar));