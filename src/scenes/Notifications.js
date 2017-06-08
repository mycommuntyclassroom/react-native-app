import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
  Text
} from 'react-native';

class Notifications extends Component {

  constructor() {
    super();

    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    this.props.app.goToScene('loading', { sup: true });
    // this.props.app.goToScene('Notifications', { hostID: 123 });
  }

  componentDidMount() {
    console.log('mounted Notifications', this.props);
  }

  render() {
    const { style, app } = this.props;
    return (
      <View style={[style.container, { backgroundColor: 'maroon' }]}>
        <Text style={style.title}>
          Notifications
        </Text>
      </View>
    );
  };

}

export default Notifications;
