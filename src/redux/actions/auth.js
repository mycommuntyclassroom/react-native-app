import { auth } from '../../helpers/firebase';
import store from '../store';
import {
  AsyncStorage
} from 'react-native'



// auth actions
export function createGuardianAccount (user) {
  return {
    type: 'CREATING_ACCOUNT',
    user
  };
};

export function newAccountCreated(formData) {
  return {
    type: 'NEW_ACCOUNT_CREATED',
    formData
  };
};

export const signIn = (provider) => {
  return (dispatch) => {
    dispatch({ type: 'ATTEMPTING_LOGIN' });
  };
};

export function signOut() {
  return (dispatch) => {
    dispatch({type: 'SIGN_OUT'})
    auth.signOut();
  };
};

export function signedIn (user) {
  return {
    type: 'SIGN_IN',
    user
  };
};

export const signedOut = () => {
  return {
    type: 'SIGN_OUT'
  };
};

export const startListeningToAuthChanges = (navigator) => {
  return (dispatch) => {
    auth.onAuthStateChanged((user) => {

      console.log('this is the auth USER: ', user)

      AsyncStorage.getItem('type', (err, result) => {
        console.log('this is the auth type: ', result);

        // SIGN IN
        // 
        // if we're not in the CREATING_ACCOUNT phase, and the stateChange
        // returns a user, AND were on the index, log the user in
        // 
        if (user) {
          // sign the user in
          AsyncStorage.setItem('type', 'SIGN_IN');
          // navigator.push('Dashboard', {});

        }
        // CREATE AN ACCOUNT
        // 
        // if the AsyncStorage is set to CREATING_ACCOUNT, update the redux store accordingly
        else if (AsyncStorage.type === 'CREATING_ACCOUNT'){
          console.log('CREATING_ACCOUNT, do nada');
        }
        else {
          AsyncStorage.setItem('type', 'SIGN_OUT');
          dispatch(signedOut());
        }
      });
    });
  };
};
