import { auth } from '../../helpers/firebase';
import { authenticateUser } from '../../helpers/user';
import store from '../store';
import {
  AsyncStorage
} from 'react-native'



// auth actions
export function createGuardianAccount (user) {
  console.log('Creat Guardian Action Called: ', user)
  return {
    type: 'CREATING_ACCOUNT',
    user
  };
};

export function newAccountCreated(formData) {
  console.log('newAccountCreated in AUTH ACTION CALLED');
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
  console.log('signedIn called')
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
  console.log('startListeningToAuthChanges PROPS: ')
  return (dispatch) => {
    auth.onAuthStateChanged((user) => {

      console.log('this is the AsyncStorage.type: ', AsyncStorage.type)
      console.log('this is the AsyncStorage.status: ', AsyncStorage.status)
      // CREATE AN ACCOUNT
      // 
      // if the AsyncStorage is set to CREATING_ACCOUNT, update the redux store accordingly
      if (AsyncStorage.type === 'CREATING_ACCOUNT'){
        console.log('startListeningToAuthChanges CREATING_ACCOUNT CALLED')
        authenticateUser(user);
      }
      // SIGN IN
      // 
      // if we're not in the CREATING_ACCOUNT phase, and the stateChange
      // returns a user, AND were on the index, log the user in
      // 
      else if (user && AsyncStorage.type !== 'CREATING_ACCOUNT') {
        console.log('met the condition, is a valid login user')
        // determine what to do with the user
        authenticateUser(user, navigator);

      }
      else {
        dispatch(signedOut());
      }
    });
  };
};
