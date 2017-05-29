import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
  Text
} from 'react-native';

class Welcome extends Component {

  constructor() {
    super();

    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    this.props.app.goToScene('login', { sup: true });
    // this.props.app.goToScene('hosts', { hostID: 123 });
  }

  componentDidMount() {
    console.log('mounted Welcome', this.props);
  }

  render() {
    const { style, app } = this.props;
    return (
      <View style={[style.container, { backgroundColor: 'orange' }]}>
        <Text style={style.title}>
          Welcome
        </Text>
      </View>
    );
  };

}

export default Welcome;
