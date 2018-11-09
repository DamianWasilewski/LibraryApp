import React, { Component } from 'react';
import BookList from '../BookList/BookList';

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

    return (
      <div className='container'>
        <BookList books={this.state.books}/>
      </div>
    )
  }

}

export default AppContainer;