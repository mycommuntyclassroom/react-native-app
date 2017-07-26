import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
  Text
} from 'react-native';


import Header from '../components/Header';
import CreateChildAccount from '../components/CreateChildAccount';

class CreateChild extends Component {
  
  render() {
    const props = this.props;
    const { app } = props;

    return (
      <View className="edit-view">
        <Header { ...props } editMode={ true } />
        <CreateChildAccount { ...props } />
      </View>
    );
  };

}

export default CreateChild;
