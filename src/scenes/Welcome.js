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
        <View style={{flex: 2, alignItems: 'center'}}>
          <Image source={require('../../images/logo.png')} resizeMode='contain' style={{width: 80}}/>
          <Text style={style.title}> Welcome </Text>
          <Text>
            Easily connect with like minded families & manage everything homeschool in one place!
          </Text>
        </View>
        <Image source={require('../../images/welcome-family-page.jpg')} resizeMode='contain' style={{flex: 2, width: '90%', height: 100}}/>
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
