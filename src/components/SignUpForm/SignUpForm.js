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
import Link from '../Link'
import style from './style';

class SignUpForm extends Component {

  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      invalidEmail: false,
      emailInUse: false,
      invalidPassword: false,
      passwordMismatch: false
    }
  }

  verifyPasswordMatch(state) {
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


  formValidation(result) {
    const { code } = result;

    code === 'auth/invalid-email'
      ? this.setState({invalidEmail:true})
      : this.setState({invalidEmail:false})

    code === 'auth/weak-password'
      ? this.setState({invalidPassword:true})
      : this.setState({invalidPassword:false})

    code === 'auth/email-already-in-use'
      ? this.setState({emailInUse:true})
      : this.setState({emailInUse:false})
  
  }

  submitForm(state) {
    signInHandler('manual', 'CREATING_ACCOUNT', state, this.formValidation.bind(this))
  }

  render() {
    const props = this.props;
    const { globalStyles, auth, app } = props;

    return (
       <View style={style.container}>
        <BackButton scene='Welcome' {...props} />
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
        {
          this.state.emailInUse &&
            <View style={{flexDirection: 'row'}}>
              <Text style={[style.errorText]}>This email address is already in use by another account. 
              <Link 
                onPress={() => app.goToScene('SignIn', {app})}
                extraStyle={{width: 80, height: 15}}
                textStyles={{textDecorationLine: 'underline'}}
                text=' Sign in?' /></Text>      
            </View>
        }

        <Text style={style.errorText}>{this.state.invalidEmail ? 'Invalid email address' : '' }</Text>
        <Text style={style.errorText}>{this.state.invalidPassword ? 'Password should be at least 6 characters' : '' }</Text>
        <Text style={style.errorText}>{this.state.passwordMismatch ? 'The passwords that you entered do not match' : '' }</Text>

        <Button extraStyle={style.submit} text='Submit' onPress={ () => this.verifyPasswordMatch(this.state) }> </Button>
      </View>
    );
  };

}

export default SignUpForm;
