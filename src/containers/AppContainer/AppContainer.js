import React, { Component } from 'react';
import Book from '../../components/Book/Book';

import './AppContainer.css';
import axios from 'axios';

class AppContainer extends Component {

  state = {
    books: []
  }

  componentDidMount() {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    axios.get(proxyUrl + 'https://damianlibrary.herokuapp.com/library')
      .then( response => {
        this.setState({ books: response.data.data });
      })
      .catch(error => {
        throw error;
      });
  }

  render () {
    const books = this.state.books.map(book => {
      return <Book key={book.book_id} name={book.name} author={book.author} isbn={book.isbn} />
    });

    return (
      <div className='container'>
        {books}
      </div>
    )
  }

}

export default AppContainer;