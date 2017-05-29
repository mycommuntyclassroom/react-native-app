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

  componentDidMount() {
    console.log('mounted Hosts', this.props);
  }

  render() {
    const { style, app } = this.props;

    return (
      <View style={[style.container, { backgroundColor: 'cadetblue' }]}>
        <Text style={style.title}>
          Hosts
        </Text>
      </View>
    );
  };

}

export default Hosts;
