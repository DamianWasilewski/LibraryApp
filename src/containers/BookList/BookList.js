import React, { Component } from 'react';

import { Provider } from 'react-redux';
import store from '../../store';
import { connect } from 'react-redux';
import { deleteBook } from '../../actions/bookActions';
import PropTypes from 'prop-types';

import Book from '../../components/Book/Book';
import './BookList.css';

class BookList extends Component {

  state = {
    search: '',
    selectedValue: 'name',
    options: [
      {
        name: 'Name',
        value: 'name',
      },
      {
        name: 'Author',
        value: 'author',
      },
      {
        name: 'ISBN',
        value: 'isbn',
      }
    ]
  }

  updateSearch (e) {
    this.setState({search: e.target.value});
  }

  selectedValueHandler (e) {
    this.setState({selectedValue: e.target.value});
  }

  deleteBookHandler = (id) => {
    this.props.deleteBook(id);
  }

  render () {
    

    let filteredBooks;
          if (this.state.selectedValue === 'name') {
            filteredBooks = this.props.books.filter(book => {
              return book.name.toLowerCase().indexOf(this.state.search) !== -1;
            })
          } else if (this.state.selectedValue === 'author') {
            filteredBooks = this.props.books.filter(book => {
              return book.author.toLowerCase().indexOf(this.state.search) !== -1;
            })
          } else if (this.state.selectedValue === 'isbn') {
            filteredBooks = this.props.books.filter(book => {
              return book.isbn.toString().indexOf(this.state.search) !== -1;
            })
          };

    return (
    <Provider store={store}>
      <div>
        <div className='SearchInput'>
          <input type='text'
          value={this.state.search}
          onChange={this.updateSearch.bind(this)} />
          <select
            id="searchSelect"
            name="searchSelect"
            onChange={this.selectedValueHandler.bind(this)} >
            {this.state.options.map(item => (
              <option key={item.value} value={item.value}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className='BookList'>
          <ul>
            {filteredBooks.map(book => {
              return <Book 
              key={book.book_id} 
              name={book.name} 
              author={book.author} 
              isbn={book.isbn}
              onClick={this.deleteBookHandler.bind(this, book.book_id)} />
            })}
          </ul>
        </div>
      </div>
    </Provider>
    )
  }
};

BookList.propTypes = {
  deleteBook: PropTypes.func.isRequired,
  book: PropTypes.object.isRequired
}

const mapStatetoProps = (state) => ({
  book: state.book
})

export default connect(mapStatetoProps, { deleteBook })(BookList);