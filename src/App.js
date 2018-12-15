import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import store from './store';

import RegisterForm from './components/RegisterForm/RegisterForm';
import LoginForm from './components/LoginForm/LoginForm';
import Navbar from './components/Navbar/Navbar';
import AppContainer from './containers/AppContainer/AppContainer';

import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path='/' component={AppContainer} />
            <div className='container'>
              <Route exact path='/login' component={LoginForm} />
              <Route exact path='/register' component={RegisterForm} />
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
