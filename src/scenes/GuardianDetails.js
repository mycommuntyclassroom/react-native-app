import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
  Text
} from 'react-native';


import Header from '../components/Header';
import GuardianView from '../components/GuardianView';

class GuardianDetails extends Component {

  componentDidMount() {
    console.log('mounted GuardianDetails', this.props);
  }

  render() {
    const props = this.props;
    const { app } = props;

    return (
      <View className="edit-view">
        <Header {...props} backOption />
        <GuardianView { ...props } />
      </View>
    );
  };

}

export default GuardianDetails;
