import React from 'react';
import { FaAngleRight } from 'react-icons/lib/fa';
import { auth, database } from './firebase';
import actions from '../redux/actions';
import store from '../redux/store';

export function signInHandler (provider, type) {
  // save a type within the localstorage to use when we redirect to the app
  switch(type) {
    case 'CREATING_ACCOUNT':
      localStorage.setItem('type', 'CREATING_ACCOUNT');
      localStorage.setItem('status', 'COLLECTING_USER_PROFILE');
      break;
    case 'SIGNING_IN':
      localStorage.setItem('type', 'SIGNING_IN');
      break;
  }
  console.log('sign in handler called, COLLECTING_USER_PROFILE is SET localStorage.status: ', localStorage.status );
  switch (provider) {
    case 'google':
      auth.signInWithRedirect(googleAuthProvider);
      break;
    case 'facebook':
      auth.signInWithRedirect(facebookAuthProvider);
      break;
    case 'password':
      // 
      break;
    default:
      auth.signInWithRedirect(googleAuthProvider);
  }
}

// AUTHENTICATE THE USER
// 
// validate the user against the DB
// 
export function authenticateUser (user) {
  console.log('authenticateUser CALLED')
  // get the URL path
  let path = window.location.pathname;
  const { uid } = user;
  database
  .ref(`guardians/${uid}`)
  .once('value')
  .then((snapshot) => {
    // if the user exists within our DB log them in, otherwise redirect them
    if(snapshot.val() ){
      switch (path) {
        case '/sign-up':
          // take the user to the sign in or signup with a different account
          console.log('YOU ARE**** ALREADY A MEMBER***')
          alert('you are already a member. Sign in');
          break;
        default:
          // update the redux store with the user's data
          store.dispatch(actions.signedIn(snapshot.val()))
          break;
      }
    } 
    else {
      switch (path) {
        case '/':
          // Do nothing, its likely a non-user, visiting for the first time
          break;
        case '/login': 
          // take the user to the sign up or sign in with a different account
          alert('you are not a member foo! Sign up')
        case '/sign-up':
          console.log('authenticateUser SIGN-UP CALLED')
          store.dispatch(actions.createGuardianAccount(user));
          localStorage.removeItem('status');
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