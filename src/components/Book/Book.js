import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';


import './Book.css';

class Book extends Component {
  render() {

    const { author, name, isbn, onClick } = this.props

    const token = localStorage.usertoken

    return  (
    <div className='Book'>
      <div className='Name'>{author}</div>
      <div className='Author'>{name}</div>
      <div className='Isbn'>{isbn}</div>
      {token && <button 
      onClick={onClick}>Delete</button>}
    </div>  
    )
  }
};

const mapStatetoProps = (state) => ({
  user: state.auth
})

export default connect(mapStatetoProps, { loginUser })(Book);