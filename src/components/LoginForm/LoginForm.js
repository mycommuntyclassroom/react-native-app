import React, { Component } from 'react';
import { signInWithEmailAndPassword } from '../../helpers/firebase';
import {
  View,
  Text,
  TouchableHighlight,
  TextInput
} from 'react-native';

import Button from '../Button'
import BackButton from '../BackButton'
import style from './style';

class Login extends Component {

  constructor() {
    super();

    this.state = {
      email: '',
      password: ''
    }
  }

  submitForm(state) {
    const { email, password } = state;
    signInWithEmailAndPassword(email, password);
  }

  render() {
    const props = this.props;
    const { globalStyles, auth, app } = props;

    return (
       <View style={style.container}>
        <BackButton scene='WelcomeSearch' {...props} />
        <Text style={[globalStyles.title, style.header]}> Login </Text>
        <TextInput
          style={globalStyles.textInput}
          placeholder="Email"
          onChangeText={(email) => this.setState({email})}
        />
        <TextInput
          style={globalStyles.textInput}
          placeholder="Password"
          onChangeText={(password) => this.setState({password})}
        />
        <Button extraStyle={style.submit} text='Submit' onPress={ () => this.submitForm(this.state) }> </Button>
      </View>
    );
  };

}

export default Login;
