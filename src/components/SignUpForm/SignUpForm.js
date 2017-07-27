import React, { Component } from 'react';
import { signInHandler } from '../../helpers/user';
import {
  View,
  Text,
  TouchableHighlight,
  TextInput
} from 'react-native';

import Button from '../Button'
import BackButton from '../BackButton'
import style from './style';

class SignUpForm extends Component {

  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      passwordMismatch: false
    }
  }

  verifyPasswordMatch(state){
     if(state.password == state.confirmPassword)
     {
       this.setState({passwordMismatch:false});
       this.submitForm(state);
     }
     else
     {
       this.setState({passwordMismatch:true})
     }
  }

  submitForm(state) {
    signInHandler('manual', 'CREATING_ACCOUNT', state);
  }

  render() {
    const props = this.props;
    const { globalStyles, auth, app } = props;

    return (
       <View style={style.container}>
        <BackButton scene='WelcomeSearch' {...props} />
        <Text style={[globalStyles.title, style.header]}> Sign up </Text>
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
         <TextInput
           style={globalStyles.textInput}
           placeholder="Confirm Password"
           secureTextEntry={true}
           onChangeText={(confirmPassword) => this.setState({confirmPassword})}
         />
         <Text style={style.errorText}>{this.state.passwordMismatch ? 'The passwords that you entered do not match' : '' }</Text>

         <Button extraStyle={style.submit} text='Submit' onPress={ () => this.verifyPasswordMatch(this.state) }> </Button>
      </View>
    );
  };

}

export default SignUpForm;
