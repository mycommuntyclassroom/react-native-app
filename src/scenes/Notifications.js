import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
  Text
} from 'react-native';

import NotificationsHeader from '../components/NotificationsHeader';
import NotificationsOutput from '../components/NotificationsOutput';
import FooterNav from '../components/FooterNav';

class Notifications extends Component {

  render() {
    const props = this.props;
    const { globalStyles, app } = props;

    return (
      <View style={{flex: 1}}>
        <NotificationsHeader {...props} />
        <NotificationsOutput {...props} />
        <FooterNav {...props} />
      </View>
    )
  };

}

export default Notifications;
