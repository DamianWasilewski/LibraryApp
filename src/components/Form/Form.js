import React, { Component } from 'react';

import { connect } from 'react-redux';
import { addBook } from '../../actions/bookActions';

import './Form.css';

class Form extends Component {
  
  state = {
    name: '',
    author: '',
    isbn: ''
  }

  onChangeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  };

  onSubmitHandler = (e) => {

    const {name, author, isbn} = this.state
    
          const newBook = {
          name: name,
          author: author,
          isbn: isbn
        }
        this.props.addBook(newBook);

        this.setState({
          name: '',
          author: '',
          isbn: ''
        })
    e.preventDefault();
  }

  render() {
    const { name, author, isbn } = this.state;

    return (
      <div className='formContainer'>
        <p>{this.book}</p>
        <div className='form'>
          <form className='bookForm' onSubmit={this.onSubmitHandler.bind(this)}>
            <div className='inputs'>
              <input 
              type='text' 
              name='name'  
              placeholder='Book name'
              onChange={this.onChangeHandler}
              value={name}/>
              <input 
              type='text' 
              name='author'  
              placeholder='Book author'
              onChange={this.onChangeHandler}
              value={author}/>
              <input 
              type='text' 
              name='isbn'  
              placeholder='ISBN'
              onChange={this.onChangeHandler}
              value={isbn}/>
            </div>
            <div className='buttonSpace'>
              <button>Add book</button>
            </div>
          </form>
        </div>
      </div>
    )
  }

}

const mapStateToProps = (state) => ({
  book: state.book
});

export default connect(mapStateToProps, { addBook })(Form);