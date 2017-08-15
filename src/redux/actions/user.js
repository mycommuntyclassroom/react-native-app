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
  return (dispatch) => {
    dispatch({ 
      type: 'LOGGED_IN',
      userData 
    });
  };
};

export const friendRequest = (friendRequestObj) => {
  return (dispatch) => {
    dispatch({ 
      type: 'FRIEND_REQUEST',
      friendRequestObj 
    });
  };
};

export function handleChildProfile(formData) {
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
  return (dispatch) => {
    dispatch({ 
      type: 'FRIEND_ADDED',
      friendObj 
    });
  };
}

// 
// 
export const startListeningForUsers = (navigator) => {
  return (dispatch) => {
    auth.onAuthStateChanged((user) => {

      AsyncStorage.getItem('type', (err, result) => {
        console.log('this is the users type: ', result);

        if (user) {
          
          // pull the user's tree from the DB
          database
          .ref(`guardians/${user.uid}`)
          .once('value')
          .then((snapshot) => {
            store.dispatch(userInfo(snapshot.val()));
          }) 
        }
      });
    });
  };
};
