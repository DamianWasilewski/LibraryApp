import React, { Component } from 'react';

import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';

import './LoginForm.css';

class LoginForm extends Component {
  
  state = {
    user_name: '',
    password: '',
  }

  onChangeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  };

  onSubmitHandler = (e) => {

    const { user_name, password } = this.state
    
          const loggedUser = {
          user_name: user_name,
          password: password
        }
        this.props.loginUser(loggedUser);

        this.setState({
          user_name: '',
          password: ''
        })
    e.preventDefault();
  }

  render() {
    const { user_name, password } = this.state;

    return (
      <div className='formContainer'>
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