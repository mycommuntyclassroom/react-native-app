import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
  Text,
  TextInput,
  Image
} from 'react-native';

import Button from '../Button';
import Link from '../Link';
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
        <Image 
          source={require('../../../images/logo.png')} 
          resizeMode='contain' 
          style={style.logo}
        />
        <Text style={[globalStyles.title, style.title]}> Welcome </Text>
        <Text style={[style.copy]}>
          Easily connect with like minded families & manage everything homeschool in one place!
        </Text>
        <TextInput
          style={[style.zipCode]}
          placeholder='Zip Code'
          placeholderTextColor='white'
        />
        <Image source={require('../../../images/welcome-family-page.jpg')} resizeMode='cover' style={ style.welcomeImage }/>
        <Button 
          text='Search your area'
          extraStyle={style.button}
          onPress={() => app.goToScene('WelcomeSearch', {app}) }>
        </Button>
        <View style={ style.signIn }>
          <Text style={ style.signInCopy }> Already have an account? </Text>
          <Link 
            text='Login'
            textStyles={style.signInLink}
            onPress={() => app.goToScene('Login', {app}) } />
        </View>
      </View>
    );
  };

}

export default WelcomePage;
