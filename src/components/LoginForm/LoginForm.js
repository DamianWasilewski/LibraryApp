import React, { Component } from 'react';

import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';

import './LoginForm.css';

class LoginForm extends Component {
  
  state = {
    user_name: '',
    password: '',
    validation: false,
    errorMessage: ''
  }

  onChangeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value })
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
    const token = localStorage.usertoken
    if(token) {
      this.props.history.push('/')
    } else {
      console.log(this.props.user)
    }
    const { user_name, password, validation } = this.state;

    return (
      <div className='formContainer'>
        {!validation && <div className="errorBox">
          <p>{this.state.errorMessage}</p>
        </div>}
        <div className='form'>
          <form className='bookForm' onSubmit={this.onSubmitHandler.bind(this)}>
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
              <button>Login</button>
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