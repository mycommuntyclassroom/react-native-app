import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
  Text
} from 'react-native';

class Dashboard extends Component {

  constructor() {
    super();

  }

  componentDidMount() {
    console.log('mounted Dashboard', this.props);
  }

  render() {
    const { style, app } = this.props;
    return (
      <View style={[style.container, { backgroundColor: 'white' }]}>
        <Text>
          Dashboard HERE
        </Text>
      </View>
    );
  };

}

export default Dashboard;
