import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import store from './store';
import { AUTHENTICATED } from './actions/types';

const usertoken = localStorage.getItem('usertoken');
// If condition to auto authenticate depending if 'usertoken' is present in localStorage.
if(usertoken) {
  store.dispatch( {type: AUTHENTICATED} );
}

ReactDOM.render(<App />, document.getElementById('root'));


serviceWorker.unregister();
