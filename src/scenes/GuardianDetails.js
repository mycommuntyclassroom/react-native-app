import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
  Text,
  ScrollView
} from 'react-native';


import Header from '../components/Header';
import GuardianView from '../components/GuardianView';
import FooterNav from '../components/FooterNav';

class GuardianDetails extends Component {

  render() {
    const props = this.props;
    const { app } = props;

    return (
      <View className="edit-view">
        <ScrollView>
        <Header {...props} backOption scene='BrowseHosts' />
        <GuardianView { ...props } />
        </ScrollView>
        <FooterNav {...props} />
      </View>
    );
  };

}

export default GuardianDetails;
