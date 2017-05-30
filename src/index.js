import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import store from './redux/store';
import Data from './helpers/data';
import App from './components/App';
import thunk from 'redux-thunk';

// import { startListeningForUsers } from './redux/actions/user';
// import { startListeningToAuthChanges } from './redux/actions/auth';
// import { startListeningForNotifications } from './redux/actions/notifications';

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

// store.dispatch(startListeningForUsers());
// store.dispatch(startListeningToAuthChanges());
// store.dispatch(startListeningForNotifications());