import React, { Component } from 'react';

import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';

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

      this.props.history.push('/login')
    } else {
      this.setState({ errorMessage: 'Please enter correct email adress' })
    }
  } else { 
    this.setState({ errorMessage: 'Please fill in all fields' })
  }
  e.preventDefault();
}

  render() {
    const { user_name, password, first_name, last_name, email } = this.state;

    return (
      <div className='formContainer'>
        <div className='errorBox'>
          <p>{this.state.errorMessage}</p>
        </div>
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
              <button>Register</button>
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

export default connect(mapStateToProps, { registerUser })(RegisterForm);