import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';

import AppContainer from './containers/AppContainer/AppContainer';

import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AppContainer />
        </div>
      </Provider>
    );
  }
}

export default App;
