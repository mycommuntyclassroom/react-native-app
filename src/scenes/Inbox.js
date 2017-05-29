import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
  Text
} from 'react-native';

class Inbox extends Component {

  constructor() {
    super();

    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    this.props.app.goToScene('loading', { sup: true });
    // this.props.app.goToScene('Inbox', { hostID: 123 });
  }

  componentDidMount() {
    console.log('mounted Inbox', this.props);
  }

  render() {
    const { style, app } = this.props;
    return (
      <View style={[style.container, { backgroundColor: 'cadetblue' }]}>
        <Text style={style.title}>
          Inbox
        </Text>
      </View>
    );
  };

}

export default Inbox;
