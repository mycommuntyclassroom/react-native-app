import React from 'react';
import { FaAngleRight } from 'react-icons/lib/fa';
import { auth, database } from './firebase';
import { createUserWithEmailAndPassword } from '../helpers/firebase';
import actions from '../redux/actions';
import store from '../redux/store';

import {
  AsyncStorage
} from 'react-native'

export function signInHandler (provider, type, data) {
  // save a type within the AsyncStorage to use when we redirect to the app
  switch(type) {
    case 'CREATING_ACCOUNT':
      AsyncStorage.setItem('type', 'CREATING_ACCOUNT');
      console.log('CURRENTLY Creating an ACCOUNT, AsyncStorage.type: ', AsyncStorage.getItem('type'))
      AsyncStorage.setItem('status', 'COLLECTING_USER_PROFILE');
      break;
    case 'SIGNING_IN':
      AsyncStorage.setItem('type', 'SIGNING_IN');
      break;
  }
  console.log('sign in handler called, COLLECTING_USER_PROFILE is SET AsyncStorage.status: ', AsyncStorage.status );
  switch (provider) {
    case 'google':
      auth.signInWithRedirect(googleAuthProvider);
      break;
    case 'facebook':
      auth.signInWithRedirect(facebookAuthProvider);
      break;
    case 'manual':
      const { email, password } = data;
      console.log('***Email and PW called: ', data);
      createUserWithEmailAndPassword(email, password);
      break;
    default:
      // no action
  }
}

// AUTHENTICATE THE USER
// 
// validate the user against the DB
// 
export function authenticateUser (user, navigator) {
  console.log('authenticateUser CALLED')
  console.log('THIS IS THE navigator PASSED: ', navigator)
  // get the current scene
  let currentRoute = navigator.getCurrentRoutes().pop().scene;
  console.log('HERE** is the currentRoute: ', currentRoute)
  const { uid } = user;
  database
  .ref(`guardians/${uid}`)
  .once('value')
  .then((snapshot) => {
    // if the user exists within our DB log them in, otherwise redirect them
    if(snapshot.val() ){
      console.log('is a valid user')
      switch (currentRoute) {
        case '/sign-up':
          // take the user to the sign in or signup with a different account
          console.log('YOU ARE**** ALREADY A MEMBER***')
          break;
        default:
          // update the redux store with the user's data
          store.dispatch(actions.signedIn(snapshot.val()))
          break;
      }
    } 
    else {
      switch (currentRoute) {
        case 'Welcome':
          console.log('this is a non-user')
          // Do nothing, its likely a non-user, visiting for the first time
          break;
        case 'Login': 
          // take the user to the sign up or sign in with a different account
          console.log('you are not a member foo! Sign up')
          break;
        case 'SignUp':
          console.log('authenticateUser SIGN-UP CALLED')
          store.dispatch(actions.createGuardianAccount(user));
          AsyncStorage.removeItem('status');
          break;
        default:
          // Do nothing
          break;
      }
    }
  })

}

// REQUEST A FRIEND
// 
// 
export function requestFriend (userData, hostId) {

  const { displayName, uid } = userData;
  let message = 'would like to connect.';
  let timestamp = (new Date()).getTime();
  
  // build the userObj for the notifications tree
  let userObj = {
    noteType: 'friend',
    displayName,
    uid,
    message,
    seen: false,
    timestamp
  }
  // send the request to the notifications tree
  database.ref(`guardians/${hostId}/notifications`)
          .push(userObj);
  // add the requested user's id to the requester's [pendingRequests] tree
  // first set the object that will go into the update method
  let emptyObj = {};
  emptyObj[`${hostId}`] = uid;
  let passedId = emptyObj;
  
  database.ref(`guardians/${uid}/pendingRequests`)
          .update(passedId);

}

// GET THE GUARDIAN'S DATA
// 
// retrive the guardian's branch of data based on the id passed in the params
// 
export function getGuardianData (gid, callback) {
  database
  .ref(`guardians/${gid}`)
  .once('value')
  .then((snapshot) => {
    callback(snapshot.val());
  })
}

// ACCEPT/DENY FRIEND REQUEST
// 
// 
export function handleInvite (userData, inviteData, response, note) {

  // modularize the internal workings of the invite into the 
  // acceptInvite, and denyInvite functions
  switch (response){
    case 'accept':
      // accept the guardian's invite
      acceptInvite(userData, inviteData, note );
    case 'delete':
      // deny the guardian's invite
      denyInvite(userData, note );
  }
}

export function acceptInvite (userData, inviteData, note) {
  const { displayName, uid } = inviteData

  // add the guardian to the user's profile
  let friendObj = { 
    gid: uid,
    name: displayName
  }

  // update the user's friends list with the newly accepted guardian
  database
  .ref(`guardians/${userData.uid}/friends/${uid}`)
  .update(friendObj);

  // now REMOVE the invitation from the user's notifications
  database
  .ref(`guardians/${userData.uid}/notifications/${note}`)
  .remove();

  // add the user to the guardian's friends profile
  database
  .ref(`guardians/${uid}/friends/${userData.uid}`)
  .update({ 
    gid: userData.uid,
    name: userData.displayName
  });

  // 
  let userMessage = `You and ${displayName} are now connected.`;
  let guardianMessage = `You and ${userData.displayName} are now connected.`;
  let timestamp = (new Date()).getTime();
  
  // build the userObj for the notifications tree
  let userObj = {
    name: userData.displayName,
    gid: userData.uid,
    message: userMessage,
    seen: true,
    timestamp
  }

  let guardianObj = {
    name: userData.displayName,
    gid: userData.uid,
    message: guardianMessage,
    seen: true,
    timestamp
  }

  // send the confirmation to the user's notifications tree
  database.ref(`guardians/${userData.uid}/notifications`)
          .push(userObj);

  // send the confirmation to the guardian's notifications tree
  database.ref(`guardians/${uid}/notifications`)
          .push(guardianObj);
}

export function denyInvite (userData, note) {
  // delete the notification for the guardian's invitation
  database
  .ref(`guardians/${userData.uid}/notifications/${note}`)
  .remove();
}

// NOTIFICATION OUTPUT
// 
// 
export function chooseNotificationItem (userObj, noteProp, note, seenSwitch, friends) {
  let elements;
  let noteClass;
  let noteType = noteProp.noteType || '';
  switch( noteType ) {
    case 'friend':
      elements = 
        <div className="action-items">
          <div className="cta-buttons">
            <div className="connect" onClick={() => handleInvite(userObj, noteProp, 'accept', note)}>Connect</div>
            <div className="delete" onClick={() => handleInvite(userObj, noteProp, 'delete', note)}>Delete<FaAngleRight/></div>
          </div>
          <a to={`guardian/${noteProp.uid}`} className="profile-view">Click to view Profile</a>
        </div>;
      break;
    default: 
      elements = <div className="action-items"></div>;
      noteClass = 'standard'
  }

  return(
    <div className="note" key={`${note}`} id={`${note}`}> 
      <div className={`note-info ${noteClass}`}>
        <div className={`switch ${seenSwitch}`}></div>
        <h3>{noteProp.displayName}</h3>
        <div className="message">{noteProp.message}</div>
      </div>
      {elements}
    </div>
  )
}