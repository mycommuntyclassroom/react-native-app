import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
  Text
} from 'react-native';


import Header from '../components/Header';
import EditChildAccount from '../components/EditChildAccount';

class EditChild extends Component {

  componentDidMount() {
    console.log('mounted EditChild', this.props);
  }

  render() {
    const props = this.props;
    const { app } = props;

    return (
      <View className="edit-view">
        <Header { ...props } editMode={ true } />
        <EditChildAccount { ...props } />
      </View>
    );
  };

}

export default EditChild;
