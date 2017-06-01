import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
  Text
} from 'react-native';

class Tutorial extends Component {

  constructor() {
    super();

  }

  componentDidMount() {
    console.log('mounted Tutorial', this.props);
  }

  render() {
    const { style, app } = this.props;
    return (
      <View style={[style.container, { backgroundColor: 'yellow' }]}>
        <Text style={style.title}>
          Tutorial
        </Text>
      </View>
    );
  };

}

export default Tutorial;
