import React, { Component } from 'react';
import BookList from '../BookList/BookList';

import { Provider } from 'react-redux';
import store from '../../store';
import { connect } from 'react-redux';
import { getBooks } from '../../actions/bookActions';
import PropTypes from 'prop-types';

import './AppContainer.css';

class AppContainer extends Component {


  componentDidMount() {
    this.props.getBooks();
  }

  render () {
    const { books } = this.props.book;
    return (
      <Provider store = {store}>
        <div className='container'>
          <BookList books={books}/>
        </div>
      </Provider>
    )
  }
}

AppContainer.propTypes = {
  getBooks: PropTypes.func.isRequired,
  book: PropTypes.object.isRequired
}

const mapStatetoProps = (state) => ({
  book: state.book
});

export default connect(mapStatetoProps, { getBooks })(AppContainer);