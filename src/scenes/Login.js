import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
  Text
} from 'react-native';

class Login extends Component {

  constructor() {
    super();

    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    this.props.app.goToScene('hosts', { sup: true });
    // this.props.app.goToScene('hosts', { hostID: 123 });
  }

  componentDidMount() {
    console.log('mounted Login', this.props);
  }

  render() {
    const { style, app } = this.props;
    return (
      <View style={[style.container, { backgroundColor: 'cornflowerblue' }]}>
        <Text style={style.title}>
          Login
        </Text>
      </View>
    );
  };

}

export default Login;
