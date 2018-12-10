import React, { Component } from 'react';

import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';

import './RegisterForm.css';

class RegisterForm extends Component {
  
  state = {
    user_name: '',
    password: '',
  }

  onChangeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  };

  onSubmitHandler = (e) => {

    const { user_name, password } = this.state
    
          const newUser = {
          user_name: user_name,
          password: password
        }
        this.props.registerUser(newUser);

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
              <button>Register</button>
            </div>
          </form>
        </div>
      </div>
    )
  }

}

const mapStateToProps = (state) => ({
  user: state.users
});

export default connect(mapStateToProps, { registerUser })(RegisterForm);