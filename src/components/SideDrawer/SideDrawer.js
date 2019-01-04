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
      <ul className='sideDrawer__navigation-list'>
        <li className='sideDrawer__navigation-list-item'>
          <Link to='/login' className='sideDrawer__navigation-link'>
            Login
          </Link>
        </li>
        <li className='sideDrawer__navigation-list-item'>
          <Link to='/register' className='sideDrawer__navigation-link'>
            Register
          </Link>
        </li>
      </ul>
    )
    const profileLink = (
      <ul className='sideDrawer__navigation-list'>
        <li className='sideDrawer__navigation-list-item'>
          <Link to='/profile' className='sideDrawer__navigation-link'>
            Account
          </Link>
        </li>
        <li className='sideDrawer__navigation-list-item'>
          <a href='#' onClick={this.logOutHandler.bind(this)} className='sideDrawer__navigation-link'>
            Logout
          </a>
        </li>
      </ul>
    )

    return (
      
        <nav className={drawerClasses}>
          <div className="sideDrawer__navigation">
            <div className='sideDrawer__navigation-home-item'>
              <Link to='/' className='sideDrawer__navigation-link'>
              Home
              </Link>
            </div>     
            {localStorage.usertoken ? profileLink : loginRegistrationLink}
          </div>
        </nav>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.auth
});

export default connect(mapStateToProps, { loginUser, logoutUser })(withRouter(SideDrawer));