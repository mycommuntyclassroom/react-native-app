import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
  Text
} from 'react-native';

class Hosts extends Component {

  constructor() {
    super();

    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    this.props.app.goToScene('loading', { sup: true });
    // this.props.app.goToScene('hosts', { hostID: 123 });
  }

  render() {
    const { globalStyles, app } = this.props;

    return (
      <View style={[globalStyles.container, { backgroundColor: 'cadetblue' }]}>
        <Text style={globalStyles.title}>
          Hosts
        </Text>
      </View>
    );
  };

}

export default Hosts;
