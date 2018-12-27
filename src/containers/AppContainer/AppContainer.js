import React, { Component } from 'react';
import BookList from '../BookList/BookList';
import Form from '../../components/Form/Form';

import { connect } from 'react-redux';
import { getBooks } from '../../actions/bookActions';
import { loginUser } from '../../actions/authActions';
import PropTypes from 'prop-types';

import './AppContainer.css';

class AppContainer extends Component {

  componentDidMount () {
    this.props.getBooks();
  }

  render () {
    const { books } = this.props.book;

    const token = localStorage.usertoken

    return (
        <div className='container'>
          {token && <Form />}
          <BookList books={books}/>
        </div>
    )
  }
}

AppContainer.propTypes = {
  getBooks: PropTypes.func.isRequired,
  book: PropTypes.object.isRequired
}

const mapStatetoProps = (state) => ({
  book: state.book,
  user: state.auth
});

export default connect(mapStatetoProps, { getBooks, loginUser })(AppContainer);