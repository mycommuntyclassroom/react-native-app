import React, { Component } from 'react';
import { signInWithEmailAndPassword } from '../../helpers/firebase';
import {
  View,
  Text,
  TouchableHighlight,
  TextInput,
  AsyncStorage
} from 'react-native';

import Button from '../Button'
import BackButton from '../BackButton'
import style from './style';

class Login extends Component {

  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      invalidEmail: false,
      invalidPassword: false,
      incorrectPassword: false,
      noMatch: false
    }
  }

  formValidation(result) {

    console.log('Log in formValidation, result: ', result);

    // if the result is true, log the user in
    result && AsyncStorage.setItem('type', 'SIGN_IN');

    console.log('type after the result: ', type)

    const { code } = result;

    code === 'auth/invalid-email'
      ? this.setState({invalidEmail:true})
      : this.setState({invalidEmail:false})

    code === 'auth/weak-password'
      ? this.setState({invalidPassword:true})
      : this.setState({invalidPassword:false})

    code === 'auth/wrong-password'
      ? this.setState({incorrectPassword:true})
      : this.setState({incorrectPassword:false})

    code === 'auth/user-not-found'
      ? this.setState({noMatch:true})
      : this.setState({noMatch:false})

  }

  submitForm(state) {
    const { email, password } = state;
    signInWithEmailAndPassword(email, password, this.formValidation.bind(this));
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
          secureTextEntry={true}
          onChangeText={(password) => this.setState({password})}
        />

        { this.state.invalidEmail && <Text style={style.errorText}>Invalid email address </Text> }
        { this.state.invalidPassword && <Text style={style.errorText}>Password should be at least 6 characters </Text> }
        { this.state.incorrectPassword && <Text style={style.errorText}>The password is invalid  </Text> }
        { this.state.noMatch && <Text style={style.errorText}>The email and password do not match, please recheck your email and password  </Text> }

        <Button extraStyle={style.submit} text='Submit' onPress={ () => this.submitForm(this.state) }> </Button>
      </View>
    );
  };

}

export default Login;
