import React, { Component } from 'react';

import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';

import './LoginForm.css';

class LoginForm extends Component {
  
  state = {
    user_name: '',
    password: '',
    validation: true,
    errorMessage: ''
  }

  componentWillUpdate() {
    const token = localStorage.getItem('usertoken');
    if(token) {
      this.props.history.push('/')
    }
  }

  onChangeHandler = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    this.setState({ [name]: value })
  };

  errorMsg() {
      if(this.props.errorMsg) {
        return (
          <div className="errorMessage">
            <span>{this.props.errorMsg}</span>
          </div>
        );
      }
      return null;
  }

  errorMesssage() {
    const { validation, errorMessage } = this.state;

    if(!validation) {
      return (
        <div className="errorMessage">
          <span>{errorMessage}</span>
        </div>
      );
    }
    return null;
}

  onSubmitHandler = (e) => {
    e.preventDefault();
    const { user_name, password } = this.state

    if(user_name && password) {
        this.setState({validation: true}, () => {
          const loggedUser = {
            user_name: user_name,
            password: password
          }

          this.setState({
            user_name: '',
            password: '',
          })
          this.props.loginUser(loggedUser, this.props.history);
        })
    } else {
      if (!user_name) {
        this.setState({validation: false, errorMessage: 'Please enter your username'})
      }
      if (!password) {
        this.setState({validation: false, errorMessage: 'Please enter your password'})
      }
    }
  }

  render() {
    //Adding icon from FontAwesome library
    library.add(faSignInAlt);

    const { user_name, password, validation, errorMessage } = this.state;
    return (
      <div className='formContainer'>
        {this.errorMsg()}
        {this.errorMesssage()}
        <div className='loginForm'>
        <span className='loginForm__header'><p>Login existing user</p></span>
          <form className='bookLoginForm' onSubmit={this.onSubmitHandler}>
            <div className='inputs'>
              <input 
              type='text' 
              name='user_name'  
              placeholder='Username'
              onChange={this.onChangeHandler}
              value={user_name}/>
              <input 
              type='password' 
              name='password'  
              placeholder='Password'
              onChange={this.onChangeHandler}
              value={password}/>
            </div>
            <div className='buttonSpace'>
              <button><FontAwesomeIcon icon="sign-in-alt" /></button>
            </div>
          </form>
        </div>
      </div>
    )
  }

}

const mapStateToProps = (state) => ({
  user: state.auth,
  errorMsg: state.auth.error,
  authenticated: state.authenticated
});

export default connect(mapStateToProps, { loginUser })(LoginForm);