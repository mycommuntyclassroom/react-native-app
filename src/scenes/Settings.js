import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
  Text
} from 'react-native';

class Settings extends Component {

  constructor() {
    super();

    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    this.props.app.goToScene('loading', { sup: true });
    // this.props.app.goToScene('Settings', { hostID: 123 });
  }

  componentDidMount() {
    console.log('mounted Settings', this.props);
  }

  render() {
    const { style, app } = this.props;
    return (
      <View style={[style.container, { backgroundColor: 'darkturquoise' }]}>
        <Text style={style.title}>
          Settings
        </Text>
      </View>
    );
  };

}

export default Settings;
