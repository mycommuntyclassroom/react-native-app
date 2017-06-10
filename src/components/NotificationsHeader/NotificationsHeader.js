import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';

import BackButton from '../BackButton';
import NotificationsCounter from '../NotificationsCounter';

class NotificationsHeader extends Component {

  render() {
    return (
      <View className="notifications-header">
        <BackButton {...props} />
        <View className="menu-nav">
          <Text>Notifications</Text>
          <NotificationsCounter {...this.props} />
        </View>
      </View>
    )
  }
}

export default NotificationsHeader;
