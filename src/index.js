import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import store from './redux/store';
import Data from './helpers/data';
import App from './components/App';
import thunk from 'redux-thunk';

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({});

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

Data.fetch();

export default () => (
  <Provider store={store}>
    <AppContainer />
  </Provider>
);
