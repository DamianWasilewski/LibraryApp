import React, { Component } from 'react';

import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';

import './RegisterForm.css';

class RegisterForm extends Component {
  
  state = {
    user_name: '',
    password: '',
    first_name: '',
    last_name: '',
    email: '',
    errorMessages: {
      user_name: '',
      password: '',
      first_name: '',
      last_name: '',
      email: '',
    }
  }
  //Form Validation function
  formValid = errorMessages => {
    let valid = true;

    Object.values(errorMessages).forEach(val => 
      {val.length > 0 && (valid = false)
    });

    return valid;
  }; 

  onChangeHandler = (e) => {
    e.preventDefault();

    const emailRegex = RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g);

    const { name, value } = e.target;
    let errorMessages = this.state.errorMessages;

    //Form validation
    switch(name) {
      case 'user_name':
        errorMessages.user_name = 
          value.length < 6 && value.length > 0 
          ? 'minimum 6 characters required' 
          : '';
        break;
      case 'password':
        errorMessages.password =
          value.length < 7 && value.length > 0 
          ? 'minimum 7 characters required' 
          : '';
          break;
      case 'first_name':
        errorMessages.first_name =
          value.length < 3 && value.length > 0 
          ? 'minimum 3 characters required' 
          : '';
          break;
      case 'last_name':
        errorMessages.last_name = 
          value.length < 5 && value.length > 0 
          ? 'minimum 5 characters required' 
          : '';
          break;
      case 'email':
        errorMessages.email = 
          emailRegex.test(value) && value.length > 0 
          ? '' 
          : 'Invalid email adress';
          break;
      default:
      break; 
    }


    this.setState({errorMessages, [name]: value })
  };

  onSubmitHandler = (e) => {
    e.preventDefault();
    const { user_name, password, first_name, last_name, email, errorMessages } = this.state

    if (this.formValid(errorMessages)) {
    if(user_name && password && first_name && last_name && email) {
          const newUser = {
          user_name: user_name,
          password: password,
          first_name: first_name,
          last_name: last_name,
          email: email
        }

        this.props.registerUser(newUser);
          
        this.setState({
          user_name: '',
          password: '',
          first_name: '',
          last_name: '',
          email: '',
          errorMessages: {
            user_name: '',
            password: '',
            first_name: '',
            last_name: '',
            email: '',
          }
        })
    } else { 
    this.setState({ errorMessage: 'Please fill in all fields' })
  }
}
}

  render() {
    //Adding icon from FontAwesome library
    library.add(faUserPlus);
    const { user_name, password, first_name, last_name, email, errorMessages } = this.state;

    const response = this.props.user

    return (
      <div className='formContainer'>
        {response.error && <div className='errorBox'>
        <p>{response.error}</p>
        </div>}
        {response.status && <div className='errorBox'>
        <p>{response.status}</p>
        </div>}
        <div className='form'>
          <form className='bookForm' onSubmit={this.onSubmitHandler}>
            <div className='inputs'>
              <input 
              type='text' 
              className={errorMessages.first_name.length > 0 ? 'error' : null}
              name='user_name'  
              placeholder='Username'
              onChange={this.onChangeHandler}
              noValidate
              value={user_name}/>
              {errorMessages.user_name.length > 0 && (
                <span className='errorMessage'>{errorMessages.user_name}</span>
              )}
              <input 
              type='password'
              className={errorMessages.first_name.length > 0 ? 'error' : null} 
              name='password'  
              placeholder='Password'
              onChange={this.onChangeHandler}
              noValidate
              value={password}/>
              {errorMessages.password.length > 0 && (
                <span className='errorMessage'>{errorMessages.password}</span>
              )}
              <input 
              type='text'
              className={errorMessages.first_name.length > 0 ? 'error' : null} 
              name='first_name'  
              placeholder='First name'
              onChange={this.onChangeHandler}
              noValidate
              value={first_name}/>
              {errorMessages.first_name.length > 0 && (
                <span className='errorMessage'>{errorMessages.first_name}</span>
              )}
              <input 
              type='text'
              className={errorMessages.first_name.length > 0 ? 'error' : null} 
              name='last_name'  
              placeholder='Last Name'
              onChange={this.onChangeHandler}
              noValidate
              value={last_name}/>
              {errorMessages.last_name.length > 0 && (
                <span className='errorMessage'>{errorMessages.last_name}</span>
              )}
              <input 
              type='text'
              className={errorMessages.first_name.length > 0 ? 'error' : null}
              name='email'  
              placeholder='Email'
              onChange={this.onChangeHandler}
              noValidate
              value={email}/> 
              {errorMessages.email.length > 0 && (
                <span className='errorMessage'>{errorMessages.email}</span>
              )}           
            </div>
            <div className='buttonSpace'>
              <button><FontAwesomeIcon icon="user-plus" /></button>
            </div>
          </form>
        </div>
      </div>
    )
  }

}

const mapStateToProps = (state) => ({
  user: state.auth.response
});

export default connect(mapStateToProps, { registerUser })(RegisterForm);