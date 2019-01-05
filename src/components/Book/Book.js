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
      <div className='Name'>{author}</div>
      <div className='Author'>{name}</div>
      <div className='Isbn'>{isbn}</div>
      {token && <div className='Book-button'><button 
      onClick={onClick}><FontAwesomeIcon icon="trash-alt" /></button></div>}
    </div>  
    )
  }
};

const mapStatetoProps = (state) => ({
  user: state.auth
})

export default connect(mapStatetoProps, { loginUser })(Book);