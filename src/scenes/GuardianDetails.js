import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
  Text
} from 'react-native';


import Header from '../components/Header';
import GuardianView from '../components/GuardianView';

class GuardianDetails extends Component {

  render() {
    const props = this.props;
    const { app } = props;

    return (
      <View className="edit-view">
        <Header {...props} backOption scene='BrowseHosts' />
        <GuardianView { ...props } />
      </View>
    );
  };

}

export default GuardianDetails;
