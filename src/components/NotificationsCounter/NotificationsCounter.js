import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';

import style from './style';

class NotificationsCounter extends Component {

  render() {
    const props = this.props;
    const {notifications, customStyle} = props;
    let newNotifications = 0;

    // increment the counter for the unread notifications
    for(let note in notifications) {

      let seenSwitch = 'seen';

      if (!notifications[`${note}`].seen) {
        seenSwitch = 'not-seen'
        newNotifications ++;
      }
    }

    return (
      <View style={[style.notificationBubble, customStyle || {}]}>
        <Text style={style.notificationBubbleText}>{ newNotifications }</Text>
      </View>
    )
  }
}

export default NotificationsCounter;
