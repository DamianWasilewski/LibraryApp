import React from 'react';

import './Book.css';

const book = (props) => (
  <div className='Book'>
    <div className='Name'>{props.name}</div>
    <div className='Author'>{props.author}</div>
    <div className='Isbn'>{props.isbn}</div>
  </div>
);

export default book;