import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
  Text
} from 'react-native';


import Header from '../components/Header';
import EditGuardianAccount from '../components/EditGuardianAccount';

class EditGuardian extends Component {

  componentDidMount() {
    console.log('mounted EditGuardian', this.props);
  }

  render() {
    const props = this.props;
    const { app } = props;

    return (
      <View className="edit-view">
        <Header { ...props } editMode={ true } />
        <EditGuardianAccount { ...props } />
      </View>
    );
  };

}

export default EditGuardian;
