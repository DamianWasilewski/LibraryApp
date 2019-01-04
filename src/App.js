import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import store from './store';

import SideDrawer from './components/SideDrawer/SideDrawer';
import Footer from './components/Footer/Footer';
import Backdrop from './components/Backdrop/Backdrop';
import RegisterForm from './components/RegisterForm/RegisterForm';
import LoginForm from './components/LoginForm/LoginForm';
import Navbar from './components/Navbar/Navbar';
import AppContainer from './containers/AppContainer/AppContainer';

import './App.css';

class App extends Component {

  state = {
    SideDrawerOpened: false
  };

  drawerTogglerHandler = () => {
    this.setState((prevState) => {
      return {SideDrawerOpened: !prevState.SideDrawerOpened};
    });
  };

  backdropClickHandler = () => {
    this.setState({SideDrawerOpened: false});
  };


  render() {
    let backdrop;

    if (this.state.SideDrawerOpened) {
      backdrop = <Backdrop click={this.backdropClickHandler} />
    }

    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar drawerToggleHandler={this.drawerTogglerHandler}/>
            <SideDrawer show={this.state.SideDrawerOpened}/>
            {backdrop}
            <main>
              <Route exact path='/' component={AppContainer} />
              <div className='container'>
                <Route exact path='/login' component={LoginForm} />
                <Route exact path='/register' component={RegisterForm} />
              </div>
            </main>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
