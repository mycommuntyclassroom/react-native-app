import React from 'react';
import {
  AsyncStorage,
  View,
  TouchableHighlight,
  Text
} from 'react-native'

import { auth, database } from './firebase';
import { createUserWithEmailAndPassword } from '../helpers/firebase';
import actions from '../redux/actions';
import store from '../redux/store';
import Link from '../components/Link';
import styleVariables from '../styles/variables';

export function signInHandler (provider, type, data, callback) {
  // save a type within the AsyncStorage to use when we redirect to the app
  switch(type) {
    case 'CREATING_ACCOUNT':
      AsyncStorage.setItem('type', 'CREATING_ACCOUNT');
      AsyncStorage.setItem('status', 'COLLECTING_USER_PROFILE');
      break;
    case 'SIGNING_IN':
      AsyncStorage.setItem('type', 'SIGN_IN');
      break;
  }
  // method of logging in
  switch (provider) {
    case 'google':
      auth.signInWithRedirect(googleAuthProvider);
      break;
    case 'facebook':
      auth.signInWithRedirect(facebookAuthProvider);
      break;
    case 'manual':
      const { email, password } = data;
      return createUserWithEmailAndPassword(email, password, callback);
      break;
    default:
      // no action
  }
}

// REQUEST A FRIEND
// 
// Handle the event of making a friend request.
// prevent users from making multiple friend requests
// trigger a notification for the request when its made
// 
export function requestFriend (props, hostId, handlePending) {
  
  // EXIT this function if the friend request is pending
  if (checkRelationship('pending', props, hostId) === 'pending') return;

  const { displayName, uid } = props.auth;
  let message = 'would like to connect.';
  let timestamp = (new Date()).getTime();
  
  // build the userObj for the notifications tree
  let userObj = {
    noteType: 'friend',
    displayName,
    gid: uid,
    message,
    seen: false,
    timestamp
  }
  // send the request to the guardian's notifications branch
  const notificationItem = 
    database
      .ref(`guardians/${hostId}/notifications`)
      .push(userObj);

  const notificationKey = notificationItem.key;

  // add the requester's id and notificationKey to the reciepient's [incomingRequests] tree
  // first build the object that will go into the update method and the store
  let friendRequestObj = {};
  friendRequestObj[`${uid}`] = notificationKey;

  // add the reciepient's id to the requester's [pendingRequests] tree
  // first build the object that will go into the update method and the store
  let pendingRequestObj = {};
  pendingRequestObj[`${hostId}`] = uid;
  
  // note that the user has sent a request to the guardian
  database.ref(`guardians/${uid}/pendingRequests`)
          .update(pendingRequestObj);

  // send the request to the guardian's incomingRequests branch
  database.ref(`guardians/${hostId}/incomingRequests`)
          .update(friendRequestObj);

  // update the store with a pending status
  //
  // create a new instance of the current user object, add the new pending requests object
  const currentUserObj = props.user;
  const newUserObj = Object.assign({}, currentUserObj);
  const pendingGroup = props.user.pendingRequests || {}
  const newPendingGroup = Object.assign(pendingGroup, friendRequestObj);
  newUserObj['pendingRequests'] = newPendingGroup;

  // add a pending class to the add friend button
  return handlePending();

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
export function handleInvite (userData, inviteData, response, noteId, callback) {

  // modularize the internal workings of the invite into the 
  // acceptInvite, and denyInvite functions
  switch (response){
    case 'accept':
      // accept the guardian's invite
      acceptInvite(userData, inviteData, noteId, callback );
      break;
    case 'delete':
      // deny the guardian's invite
      denyInvite(userData, noteId );
    default:
      // no function
  }
}

export function acceptInvite (userData, inviteData, noteId, callback) {
  const { displayName, gid } = inviteData

  // NOTE: the uid is the guardian who MADE the request to connect
  // the userData.uid is the user of the account recieving this request

  // add the guardian to the user's profile
  let friendObj = { 
    gid,
    name: displayName
  }

  // update the user's friends list with the newly accepted guardian
  database
  .ref(`guardians/${userData.uid}/friends/${gid}`)
  .update(friendObj);

  // now REMOVE the invitation from the user's notifications
  database
  .ref(`guardians/${userData.uid}/notifications/${noteId}`)
  .remove();

  // add the user to the guardian's friends list
  database
  .ref(`guardians/${gid}/friends/${userData.uid}`)
  .update({ 
    gid: userData.uid,
    name: userData.displayName
  });

  // build notification messages for the newly connected users
  let userMessage = `You and ${displayName} are now connected.`;
  let guardianMessage = `You and ${userData.displayName} are now connected.`;
  let timestamp = (new Date()).getTime();
  
  // build the userObj and guardianObj for the notifications tree
  let userObj = {
    name: userData.displayName,
    gid,
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

  // send the new friend connection note to the user's notifications tree
  database.ref(`guardians/${userData.uid}/notifications`)
          .push(userObj);

  // send the new friend connection note to the guardian's notifications tree
  database.ref(`guardians/${gid}/notifications`)
          .push(guardianObj);

  // invoke the callback to hide the connect button
  callback && callback()
}

export function denyInvite (userData, note) {
  // delete the notification for the guardian's invitation
  database
  .ref(`guardians/${userData.uid}/notifications/${note}`)
  .remove();
}

// CHECK RELATIONSHIP STATUS
// 
// 
export function checkRelationship (relationship, props, gid) {

  switch (relationship) {
    case 'friend':
      // all admin users are considered friends to themselves
      if (gid === props.auth.uid) return true
      // check if the user is a friend
      const friends = props.user.friends || {};
      const friendsList = Object.keys(friends);
      return friendsList.indexOf(gid) !== -1 ? true : false;
      break;
    case 'incoming':
      // check if the user has been friend requested
      const incomingRequests = props.user.incomingRequests || {};
      for(var key in incomingRequests) {
        return key === gid && incomingRequests[key];
      }
      return false;
      break;
    case 'pending':
      // check if there is a pending request for the user
      const pendingRequests = props.user.pendingRequests || {};
      const pendingList = Object.keys(pendingRequests);
      return pendingList.indexOf(gid) !== -1 ? true : false
      break;
    default :
      // does nothing
      break;
  }

}
