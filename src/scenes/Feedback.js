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
import   MapView   from './custMapView';

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
        <MapView
          initialRegion={{
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}
          style={{flex:1}} >

        <MapView.Circle
          center={{latitude: 37.78825, longitude: -122.4324}}
          radius={1000}
          fillColor='rgba(160,123,220,0.22)'
          strokeColor='rgba(160,123,220,0.22)'
        />
        </MapView>
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