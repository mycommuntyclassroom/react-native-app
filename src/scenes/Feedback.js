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
import FeedbackForm from '../components/FeedbackForm'
import DropdownAlert from 'react-native-dropdownalert'

class Feedback extends Component {

  constructor() {
    super();

    this.onPress = this.onPress.bind(this);
    this.showAlert = this.showAlert.bind(this);
  }

  onPress() {
    this.props.app.goToScene('loading', { sup: true });
    // this.props.app.goToScene('Feedback', { hostID: 123 });
  }

  showAlert(type,title,message) {
    this.dropdown.alertWithType(type, title, message);
  };

  render() {
    const props = this.props
    const { globalStyles, app } = this.props;
    const { deviceWidth, deviceHeight } = deviceDimensions;

    return (
      <View style={{flex:1, backgroundColor: 'white'}}>
        <Header { ...props } />
        <FeedbackForm {...props}
          alertFunc={this.showAlert}
        />
        <FooterNav {...props} />
        <DropdownAlert
          ref={(ref) => this.dropdown = ref}
          containerStyle={{ padding: 16, flexDirection: 'row', zIndex:10 }}
          translucent={true}
        />
      </View>
    );
  };

}

export default Feedback;