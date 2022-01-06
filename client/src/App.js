import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Routes from './Routes';
import Header from './components/Header';
import CustomBrowserRouter from './CustomBrowserWrapper';
import { logout, setCurrentUser, clearCurrentUser, updateToken } from './actions/userActions';
import { decodeToken, isTokenExpired } from './jwtHelper';

import './normalize.css';
import './App.css';

import store from './configureStore';

if (localStorage.getItem('token')) {

  const decoded = decodeToken(localStorage.getItem('token'));
  store.dispatch(setCurrentUser(decoded));
  store.dispatch(updateToken(localStorage.getItem('token')));

  if (isTokenExpired(localStorage.getItem('token'))) {
    store.dispatch(logout());
    store.dispatch(clearCurrentUser());
    window.location.href = '/';
    window.location.reload();
  }
}

class App extends Component {
  render() {
    return (
      <CustomBrowserRouter>
          <div className="App">
            <BrowserRouter>
              <Header />
              <Routes />
            </BrowserRouter>
          </div>
      </CustomBrowserRouter>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.user.token
});

export default connect(mapStateToProps)(App);
