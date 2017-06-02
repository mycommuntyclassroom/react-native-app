import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
  Text
} from 'react-native';

class AdminView extends Component {

  componentDidMount() {
    console.log('mounted Dashboard: ADMIN VIEW', this.props);
  }

  render() {
    const props = this.props;

    return(
      <View>
        <Text>DASHBOARD: ADMIN VIEW</Text>
      </View>
    )
  }
}

export default AdminView;
