import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import BackButton from '../BackButton';
import NotificationsCounter from '../NotificationsCounter';
import styleVariables from '../../styles/variables'
import style from './style';

class NotificationsHeader extends Component {

  render() {

    const props = this.props;

    return (
      <LinearGradient 
        start={{x: 1, y: 1}} end={{x: 0, y: 1}}
        colors={[styleVariables.mc2purpleElectric, styleVariables.mc2BlueElectric]} 
        style={style.container}
      >
        <BackButton {...props} />
        <View style={style.headerTabs}>
          <Text style={style.notificationsText}>Notifications</Text>
          <NotificationsCounter {...this.props} />
        </View>
      </LinearGradient>
    )
  }
}

export default NotificationsHeader;
