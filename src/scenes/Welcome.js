import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
  Text,
  Image,
  Button
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
        <Image source={require('../../images/logo.png')} style={{flex:1, width: 100, height: 100}}/>
        <Text style={style.title}>
          Welcome
        </Text>
        <Image source={require('../../images/welcome-family-page.jpg')} style={{flex:1, width: '100%', height: 230}}/>
        <TouchableHighlight
          onPress={() => {
            app.goToScene('Settings', {});
          }}>
          <Text style={style.navText}>
            button here
          </Text>
        </TouchableHighlight>
      </View>
    );
  };

}

export default Welcome;
