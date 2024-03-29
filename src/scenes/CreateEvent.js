import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
  Text
} from 'react-native';


import Header from '../components/Header';
import CreateEventForm from '../components/CreateEventForm';

class CreateEvent extends Component {

  render() {
    const props = this.props;
    const { app } = props;

    return (
      <View className="edit-view">
        <Header { ...props } editMode={ true } />
        <CreateEventForm { ...props } />
      </View>
    );
  };

}

export default CreateEvent;
