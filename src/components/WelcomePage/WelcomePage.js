import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
  Text,
  Image
} from 'react-native';

import Button from '../Button';
// styles particular for the WelcomePage
import style from './style';

class WelcomePage extends Component {


  componentDidMount() {
    console.log('mounted WelcomePage', this.props);
  }

  render() {
    const { globalStyles, app } = this.props;

    return (
      <View style={ style.container } >
        <View>
          <Image source={require('../../../images/logo.png')} resizeMode='contain' style={{width: 80, height: 80}}/>
        </View>
        <View>
          <Text> Welcome </Text>
          <Text>
            Easily connect with like minded families & manage everything homeschool in one place!
          </Text>
        </View>
        <Image source={require('../../../images/welcome-family-page.jpg')} resizeMode='cover' style={{ height: 200}}/>
        <Button 
          text='Search your area'
          onPress={() => app.goToScene('WelcomeSearch', {app}) }>
        </Button>
        <Button 
          text='Login'
          onPress={() => app.goToScene('Login', {app}) }>
        </Button>
      </View>
    );
  };

}

export default WelcomePage;
