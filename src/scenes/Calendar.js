import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
  Text,
  Image
} from 'react-native';

import { deviceDimensions } from '../styles';
import Header from '../components/Header';
import FooterNav from '../components/FooterNav';

class Calendar extends Component {

  render() {
    const props = this.props
    const { globalStyles, app } = props;
    const { deviceWidth, deviceHeight } = deviceDimensions;

    return (
      <View style={{marginBottom: 90, backgroundColor: 'white'}}>
        <Header { ...props } />
        <Image 
          source={require('../../images/calender-screen-shot.jpg')} 
          resizeMode='cover' 
          style={{width: deviceWidth, height: deviceHeight - 90}} />
        <FooterNav {...props} />
      </View>
    );
  };

}

export default Calendar;
