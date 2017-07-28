import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
  Text
} from 'react-native';


import Header from '../components/Header';
import EditEventDetails from '../components/EditEventDetails';

class EditEvent extends Component {

  render() {
    const props = this.props;
    const { app } = props;

    return (
      <View className="edit-view">
        <Header { ...props } editMode={ true } />
        <EditEventDetails { ...props } />
      </View>
    );
  };

}

export default EditEvent;
