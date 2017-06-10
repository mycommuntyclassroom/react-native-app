import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
  Text
} from 'react-native';

import NotificationsHeader from '../components/NotificationsHeader';
import { chooseNotificationItem } from '../helpers/user';

class Notifications extends Component {

  componentDidMount() {
    console.log('---------------mounted Notifications------------------', this.props);
  }

  render() {
    const props = this.props;
    const { style, app } = props;

    console.log('these are the props: ', props);
    console.log('props.user.friends: ', app.props.user.friends);
    let friends = app.props.user.friends || {};
    console.log('here are the friends: ', friends);
    let friendsKeys = Object.keys(friends);

    console.log('Here are the friendsKeys for friends: ', friendsKeys);

    let userNotifications = app.props.notifications;
    console.log('userNotifications: ', userNotifications)
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
        console.log('********outPUTTING THE  notification items::: ')
        console.log('1st - props.auth: ', props.auth)
        console.log('2dn - noteProp: ', noteProp)
        console.log('3rd - note: ', note)
        console.log('4th - seenSwitch: ', seenSwitch)
        console.log('5th - friends: ', friends)
        notesOutput.unshift(chooseNotificationItem(app.props.auth, noteProp, note, seenSwitch, friends));

        // pass the note notifications to the 
        viewedNotifications[`${note}/seen`] = true;
      }
    }

    buildNotifications()

        // <NotificationsHeader {...props} />
    return (
      <View style={[style.container, { backgroundColor: 'maroon' }]}>
        <View className="notes-group">
          { notesOutput }
        </View>
      </View>
    )
  };

}

export default Notifications;
