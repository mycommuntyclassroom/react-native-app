import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
  Text
} from 'react-native';

import NotificationsHeader from '../NotificationsHeader';
import { chooseNotificationItem } from '../../helpers/user';
import style from './style';

class NotificationsOutput extends Component {

  componentDidMount() {
    console.log('---------------mounted NotificationsOutput------------------', this.props);
  }

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
        console.log('this is the noteProp: ', noteProp)

        // pass the notificationItem into the notesOutput array
        // noteType, userObj, noteProp, note, viewed
        notesOutput.unshift(chooseNotificationItem(app.props.auth, noteProp, note, seenSwitch, friends));

        // pass the note notifications to the 
        viewedNotifications[`${note}/seen`] = true;
      }
    }

    buildNotifications()

    return (
      <View style={style.container}>
        { notesOutput }
      </View>
    )
  };

}

export default NotificationsOutput;