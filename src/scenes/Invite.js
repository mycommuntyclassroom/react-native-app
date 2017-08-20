import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
  Text
} from 'react-native';
import DropdownAlert from 'react-native-dropdownalert'
import InviteForm from '../components/Invite'
import Header from '../components/Header';
import FooterNav from '../components/FooterNav';

class Invite extends Component {

  constructor() {
    super();

    this.onPress = this.onPress.bind(this);
    this.showAlert = this.showAlert.bind(this);

  }

  showAlert(type,title,message) {
    this.dropdown.alertWithType(type, title, message);
  };


  onPress() {
    this.props.app.goToScene('loading', { sup: true });
    // this.props.app.goToScene('Invite', { hostID: 123 });
  }

  render() {
    const props = this.props;
    return (
      <View style={{flex:1, backgroundColor: 'white'}}>
        <Header { ...props } />
        <InviteForm {...props}
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

export default Invite;
