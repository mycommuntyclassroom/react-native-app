import React, {Component} from 'react';
import { database } from './firebase';

import RequestFriendButton from '../components/RequestFriendButton';
import actions from '../redux/actions';
import store from '../redux/store';


// GET ALL CLASSROOM EVENTS
// 
// grab all of the hosted class events
// and set a watch for data changes to the tree
// on any change to the data, trigger an update the store
// 
export function getHostEvents () {
  // grab all of the user's notifications and store them in the Redux store
  database
  .ref('hostEvents')
  .on('value', snapshot => {
    store.dispatch(actions.setHostEvents(snapshot.val()));
  })
}

// CHILD DROP-OFF
// 
// 
export function childDropOff (data, props) {

  const { gId } = props.params

  // set the new data on the students tree
  database.ref(`hostEvents/${gId}/${props.currentEventIndex}/students`)
          .set(data);

  let timestamp = (new Date()).getTime();

  let studentObj = {
    message: 'A child has been scheduled for your class!',
    seen: true,
    timestamp
  }

  // send the confirmation to the host's notifications tree
  database.ref(`guardians/${gId}/notifications`)
          .push(studentObj);
}