import React, { Component } from 'react';

import { connect } from 'react-redux';
import { addBook } from '../../actions/bookActions';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare, faTimes } from '@fortawesome/free-solid-svg-icons';

import './Form.css';

class Form extends Component {
  
  state = {
    name: '',
    author: '',
    isbn: '',
    showButton: true,
    showForm: false,
    errorMessages: {
      name: '',
      author: '',
      isbn: '',
      ifInputsFilled: ''
    }
  }
  //Search form validation function
  formValid = errorMessages => {
    let valid = true;

    Object.values(errorMessages).forEach(val => 
      {val.length > 0 && (valid = false)
    });

    return valid;
  }; 

  toggleButtonClickHandler = () => {
    this.setState((prevState) => {
      return {showButton: !prevState.showButton, showForm: !prevState.showForm}
    })
  }

  toggleFormButtonClickHandler = (e) => {
    e.preventDefault();
    this.setState((prevState) => {
      return {showButton: !prevState.showButton, showForm: !prevState.showForm}
    })
  }

  onChangeHandler = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let { errorMessages } = this.state;
    const isbnRegex = RegExp(/^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/g)

    switch(name) {
      case 'name':
        errorMessages.name = 
          value.length < 3 && value.length > 0
          ? 'minimum 3 characters required'
          : '';
          break;
      case 'author':
        errorMessages.author =
          value.length < 3 && value.length > 0
          ? 'minimum 3 characters required'
          : '';
          break;
      case 'isbn':
        errorMessages.isbn = 
          isbnRegex.test(value) && value.length > 0
          ? ''
          : 'ISBN must have 10 or 13 numbers'
          break;
      default:
      break;      
    }


    this.setState({errorMessages, [name]: value })
  };

  onSubmitHandler = (e) => {
    e.preventDefault();

    const {name, author, isbn, errorMessages} = this.state
    if(this.formValid(errorMessages)) {
      if(name && author && isbn) {

        const newBook = {
          name: name,
          author: author,
          isbn: isbn
        }
        this.props.addBook(newBook);

        this.setState({
          name: '',
          author: '',
          isbn: '',
          errorMessages: {
            name: '',
            author: '',
            isbn: '',
            ifInputsFilled: ''
          }
        })

      } else {
        this.setState(prevState => ({
          errorMessages: {
            ...prevState.errorMessages,
            ifInputsFilled: 'Please fill in all fields'
          }
        }))
      }
    }
  }

  render() {

    let formClasses = 'bookForm__form',
        toggleButtonClasses = 'toggle-button';

    if(this.state.showForm) {
      formClasses = 'bookForm__form open';
    }
    if(!this.state.showButton) {
      toggleButtonClasses = 'toggle-button closed';
    }

    //Adding icon from FontAwesome library
    library.add(faPlusSquare, faTimes);

    const { name, author, isbn, errorMessages } = this.state;

    return (
      <div className='bookForm_container'>
          {errorMessages.ifInputsFilled && <div className='errorBox'>{errorMessages.ifInputsFilled}</div>}
          <div className={toggleButtonClasses}>
            <button onClick={this.toggleButtonClickHandler.bind(this)}>
            <FontAwesomeIcon icon="plus-square" />
            </button>
          </div>
            <form className={formClasses} onSubmit={this.onSubmitHandler.bind(this)}>
              <div className='bookForm'>
                <div className='bookForm__inputs'>
                  <div className="bookForm__inputs-item">
                    <input 
                    type='text' 
                    name='name'  
                    placeholder='Book name'
                    onChange={this.onChangeHandler}
                    value={name}/>
                    {errorMessages.name.length > 0 && (
                      <span className='errorMessage'>{errorMessages.name}</span>
                    )}
                  </div>
                  <div className="bookForm__inputs-item">
                    <input 
                    type='text' 
                    name='author'  
                    placeholder='Book author'
                    onChange={this.onChangeHandler}
                    value={author}/>
                    {errorMessages.author.length > 0 && (
                      <span className='errorMessage'>{errorMessages.author}</span>
                    )}
                  </div>
                  <div className="bookForm__inputs-item">
                    <input 
                    type='text' 
                    name='isbn'  
                    placeholder='ISBN'
                    onChange={this.onChangeHandler}
                    value={isbn}/>
                    {errorMessages.isbn.length > 0 && (
                      <span className='errorMessage'>{errorMessages.isbn}</span>
                    )}
                  </div>
                </div>
                <div className='bookForm__submitButtonSpace'>
                  <button><FontAwesomeIcon icon="plus-square" /></button>
                </div>
                <div className="bookForm__formTogglerButtonSpace">
                  <button
                  onClick={this.toggleFormButtonClickHandler.bind(this)}>
                  <FontAwesomeIcon icon="times" />
                  </button> 
                </div>
              </div>
            </form>
          </div>
    )
  }

}

const mapStateToProps = (state) => ({
  book: state.book
});

export default connect(mapStateToProps, { addBook })(Form);