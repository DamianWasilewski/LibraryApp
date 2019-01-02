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
    errorMessage: ''
  }

  onChangeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  };

  onSubmitHandler = (e) => {
    e.preventDefault();
    const { user_name, password, first_name, last_name, email } = this.state

    
    if(user_name && password && first_name && last_name && email) {
      if(new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(email)) {
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
          errorMessage: ''
        })
    } else {
      this.setState({ errorMessage: 'Please enter correct email adress' })
    }
  } else { 
    this.setState({ errorMessage: 'Please fill in all fields' })
  }
}

  render() {
    //Adding icon from FontAwesome library
    library.add(faUserPlus);
    const { user_name, password, first_name, last_name, email } = this.state;

    const response = this.props.user

    return (
      <div className='formContainer'>
        <div className='errorBox'>
          <p>{this.state.errorMessage}</p>
        </div>
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
              <input 
              type='text' 
              name='first_name'  
              placeholder='First name'
              onChange={this.onChangeHandler}
              value={first_name}/>
              <input 
              type='text' 
              name='last_name'  
              placeholder='Last Name'
              onChange={this.onChangeHandler}
              value={last_name}/>
              <input 
              type='text' 
              name='email'  
              placeholder='Email'
              onChange={this.onChangeHandler}
              value={email}/>            
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