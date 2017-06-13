import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';

class NotificationsCounter extends Component {

  render() {
    const props = this.props;
    let userNotifications = props.notifications;
    let newNotifications = 0;

    // increment the counter for the unread notifications
    for(let note in userNotifications) {

      let seenSwitch = 'seen';

      if (!userNotifications[`${note}`].seen) {
        seenSwitch = 'not-seen'
        newNotifications ++;
      }
    }

    return <View className="notification-bubble"><Text>{ newNotifications }</Text></View>
  }
}

export default NotificationsCounter;