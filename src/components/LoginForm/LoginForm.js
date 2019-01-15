import React, { Component } from 'react';

import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';

import './LoginForm.css';
import { error, isError } from 'util';

class LoginForm extends Component {
  
  state = {
    user_name: '',
    password: '',
    validation: true,
    errorMessage: ''
  }

  onChangeHandler = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    this.setState({ [name]: value })
  };

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
          this.props.loginUser(loggedUser);
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
    console.log(this.props.user)
    //Adding icon from FontAwesome library
    library.add(faSignInAlt);
    //Declaring token as variable
    const token = localStorage.usertoken
    if(token) {
      this.props.history.push('/')
    }
    const { user_name, password, validation, errorMessage } = this.state;
    return (
      <div className='formContainer'>
        {!validation && <div className='errorBox'>{errorMessage}</div>}
        <div className='form'>
          <form className='bookForm' onSubmit={this.onSubmitHandler}>
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
  user: state.auth
});

export default connect(mapStateToProps, { loginUser })(LoginForm);