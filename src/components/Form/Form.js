import React, { Component } from 'react';

import { connect } from 'react-redux';
import { addBook } from '../../actions/bookActions';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';

import './Form.css';

class Form extends Component {
  
  state = {
    title: '',
    author: '',
    isbn: '',
    errorMessages: {
      title: '',
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

  onChangeHandler = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let { errorMessages } = this.state;
    const isbnRegex = RegExp(/^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/g)

    switch(name) {
      case 'title':
        errorMessages.title = 
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

    const {title, author, isbn, errorMessages} = this.state
    if(this.formValid(errorMessages)) {
      if(title && author && isbn) {

        const newBook = {
          title: title,
          author: author,
          isbn: isbn
        }
        this.props.addBook(newBook);

        this.setState({
          title: '',
          author: '',
          isbn: '',
          errorMessages: {
            title: '',
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

    //Adding icon from FontAwesome library
    library.add(faPlusSquare);

    const { name, author, isbn, errorMessages } = this.state;

    return (
      <div className='bookForm_container'>
          {errorMessages.ifInputsFilled && <div className='errorBox'>{errorMessages.ifInputsFilled}</div>}
            <form className='bookForm__form' onSubmit={this.onSubmitHandler.bind(this)}>
              <div className='bookForm'>
                <div className='bookForm__inputs'>
                  <div className="bookForm__inputs-item">
                    <input 
                    type='text' 
                    name='title'  
                    placeholder='Book name'
                    onChange={this.onChangeHandler}
                    value={name}/>
                    {errorMessages.title.length > 0 && (
                      <span className='errorMessage'>{errorMessages.title}</span>
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
                <div className='bookForm__buttonSpace'>
                  <button><FontAwesomeIcon icon="plus-square" /></button>
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