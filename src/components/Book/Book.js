import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';


import './Book.css';

class Book extends Component {
  render() {

    //Adding icon from FontAwesome library
    library.add(faTrashAlt);

    const { author, name, isbn, onClick } = this.props

    const token = localStorage.usertoken

    return  (
    <div className='Book'>
      <div className='Author'><span>{author}</span></div>
      <div className='Title'><span>{name}</span></div>
      <div className='Isbn'><span>{isbn}</span></div>
      {token && <div className='Book-button'><button 
      onClick={onClick}><span><FontAwesomeIcon icon="trash-alt" /></span></button></div>}
    </div>  
    )
  }
};

const mapStatetoProps = (state) => ({
  user: state.auth
})

export default connect(mapStatetoProps, { loginUser })(Book);