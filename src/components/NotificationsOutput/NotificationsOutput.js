import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
  Text,
  ScrollView
} from 'react-native';

import NotificationsHeader from '../NotificationsHeader';
import NotificationsItem from '../NotificationsItem';
import style from './style';

class NotificationsOutput extends Component {

  render() {
    const props = this.props;
    const { globalStyles, app } = props;

    let friends = app.props.user.friends || {};
    let friendsKeys = Object.keys(friends);

    let userNotifications = app.props.notifications;
    let newNotifications = 0;
    let notesOutput = [];
    let viewedNotifications = {}

    function buildNotifications() {
      if(userNotifications === null) { return }

      for(let note in userNotifications) {

        let seenSwitch = 'seen'

        // increment the counter for the unread notifications
        if (!userNotifications[`${note}`].seen) {
          newNotifications ++;
          seenSwitch = 'not-seen'
        }

        // build the notification cards
        let noteProp = userNotifications[`${note}`];

        // pass the notificationItem into the notesOutput array
        // noteType, userObj, noteProp, note, viewed
        notesOutput.unshift(
          <NotificationsItem
            {...props}
            auth={app.props.auth}
            noteProp={noteProp}
            seenSwitch={seenSwitch}
          />
        )

        // pass the note notifications to the 
        viewedNotifications[`${note}/seen`] = true;
      }
    }

    buildNotifications()

    return (
      <ScrollView style={style.container}>
        { notesOutput }
      </ScrollView>
    )
  };

}

export default NotificationsOutput;
