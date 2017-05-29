import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
  Text,
  Image
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
        <Image source={require('../../images/welcome-family-page.jpg')} style={{width: '100%', height: 230}}/>
      </View>
    );
  };

}

export default Welcome;
