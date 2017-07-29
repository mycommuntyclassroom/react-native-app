import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
  Text,
  Image
} from 'react-native';

import { deviceDimensions } from '../styles';
import Header from '../components/Header';

class Feedback extends Component {

  constructor() {
    super();

    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    this.props.app.goToScene('loading', { sup: true });
    // this.props.app.goToScene('Feedback', { hostID: 123 });
  }

  render() {
    const props = this.props
    const { globalStyles, app } = this.props;
    const { deviceWidth, deviceHeight } = deviceDimensions;

    return (
      <View style={{marginBottom: 90, backgroundColor: 'white'}}>
        <Header { ...props } />
        <Image 
          source={require('../../images/feedback-screenshot.jpg')} 
          resizeMode='cover' 
          style={{width: deviceWidth, height: deviceHeight}} />
      </View>
    );
  };

}

export default Feedback;
