import { auth, database, googleAuthProvider } from '../../helpers/firebase';
import store from '../store';
import {
  AsyncStorage
} from 'react-native'

export const updateUserInfo = () => {
  return (dispatch) => {
    dispatch({ type: 'LOGGED_IN' });
  };
};

export const userInfo = (userData) => {
  console.log('userInfo called, heres the data: ', userData);
  return (dispatch) => {
    dispatch({ 
      type: 'LOGGED_IN',
      userData 
    });
  };
};

export function handleChildProfile(formData) {
  console.log('this is the handleChildProfile data: ', formData);
  return {
    type: 'CHILD_ACCOUNT_SET',
    formData
  };
}

export function handleHostEvent(formData) {
  return {
    type: 'HANDLE_EVENT',
    formData
  };
}

const createNewUser = (user) => {
  return {
    type: 'NEW_ACCOUNT_IN_PROGRESS',
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    uid: user.uid,
    isMember: false
  };
};

export function acceptFriendRequest(friendObj) {
  console.log('acceptFriendRequest CALLED')
  return (dispatch) => {
    dispatch({ 
      type: 'FRIEND_ADDED',
      friendObj 
    });
  };
}


// 
// 
export const startListeningForUsers = () => {
  return (dispatch) => {
    auth.onAuthStateChanged((user) => {

      console.log('this is the AsyncStorage.type: ', AsyncStorage.type)
      if (user && AsyncStorage.type !== 'CREATING_ACCOUNT') {
        
        // pull the user's tree from the DB
        database
        .ref(`guardians/${user.uid}`)
        .once('value')
        .then((snapshot) => {
          store.dispatch(userInfo(snapshot.val()));
        }) 
      }
    });
  };
};
