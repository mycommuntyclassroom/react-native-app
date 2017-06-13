import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
  Text,
  TextInput,
  Image
} from 'react-native';

import Button from '../Button';
import BackButton from '../BackButton';
import Link from '../Link';
// styles particular for the WelcomeSearchPage
import style from './style';

class WelcomeSearchPage extends Component {

  render() {
    const props = this.props
    const { globalStyles, app } = props;

    return (
      <View style={ style.container } >
        <BackButton scene='Welcome' {...props} />
        <Image 
          source={require('../../../images/mountain-icon.png')} 
          resizeMode='contain' 
          style={style.headerIcon}
        />
        <Text style={[globalStyles.title, style.title]}> Congratulations </Text>
        <Image source={require('../../../images/sf-map.jpg')} resizeMode='cover' style={ style.welcomeImage }/>
        <Button 
          text='Sign up'
          extraStyle={style.button}
          onPress={() => app.goToScene('SignUp', {app}) }>
        </Button>
        <View style={ style.signIn }>
          <Text style={ style.signInCopy }> Already have an account? </Text>
          <Link 
            text='Login'
            textStyles={style.signInLink}
            onClick={() => app.goToScene('Login', {app}) } />
        </View>
      </View>
    );
  };

}

export default WelcomeSearchPage;
