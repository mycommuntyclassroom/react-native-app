import { auth, database } from '../../helpers/firebase';
import {
  AsyncStorage
} from 'react-native'

export const setNotifications = (notifications) => {
  return (dispatch) => {
    dispatch({ 
      type: 'NOTIFICATIONS_ALERT',
      notifications 
    });
  };
};

export const startListeningForNotifications = () => {
  return (dispatch) => {
    auth.onAuthStateChanged((user) => {

      AsyncStorage.getItem('type', (err, result) => {
        console.log('this is the Notifications type: ', result);

        if (user && AsyncStorage.type !== 'CREATING_ACCOUNT') {
          const { uid } = user

          // grab all of the user's notifications and store them in the Redux store
          database
          .ref(`guardians/${uid}/notifications`)
          .on('value', snapshot => {
            dispatch(setNotifications(snapshot.val()));
          })
        }
      });
    });
  };
};