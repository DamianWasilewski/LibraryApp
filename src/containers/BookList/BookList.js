import React, { Component } from 'react';

import Book from '../../components/Book/Book';
import './BookList.css';

class BookList extends Component {

  state = {
    search: ''
  }

  updateSearch (e) {
    this.setState({search: e.target.value});
  }

  render () {
    let filteredBooks = this.props.books.filter(book => {
      return book.name.toLowerCase().indexOf(this.state.search) !== -1;
    });

    return (
      <div>
        <div className='SearchInput'>
          <input type='text'
          value={this.state.search}
          onChange={this.updateSearch.bind(this)} />
        </div>
        <div className='BookList'>
          <ul>
            {filteredBooks.map(book => {
              return <Book key={book.book_id} name={book.name} author={book.author} isbn={book.isbn} />
            })}
          </ul>
        </div>
    </div>
    )
  }
};

export default BookList;