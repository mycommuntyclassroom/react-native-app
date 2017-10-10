import React, { Component } from 'react';
import { signInHandler } from '../../helpers/user';
import {
  View,
  Text,
  TouchableHighlight,
  TextInput,
  AsyncStorage
} from 'react-native';

import actions from '../../redux/actions';
import store from '../../redux/store';

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
      code:'',
      invalidEmail: false,
      emailInUse: false,
      invalidPassword: false,
      passwordMismatch: false,
      codeMismatch:false
    }
  }

  verifyPasswordMatch(state) {
    if(state.password == state.confirmPassword)
    {
      this.setState({passwordMismatch:false});
      if(state.code.includes("108"))
      {
        this.setState({codeMismatch:false});
        this.submitForm(state);
      }
      else {
        this.setState({codeMismatch:true});
      }
    }
    else
    {
      this.setState({passwordMismatch:true})
    }
  }

  formValidation(result) {
    const stateObj = this.state;
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
          placeholderTextColor='white'
          onChangeText={(email) => this.setState({email})}
        />
        <TextInput
          style={globalStyles.textInput}
          placeholder="Password"
          placeholderTextColor='white'
          secureTextEntry={true}
          onChangeText={(password) => this.setState({password})}
        />
        <TextInput
          style={globalStyles.textInput}
          placeholder="Confirm Password"
          placeholderTextColor='white'
          secureTextEntry={true}
          onChangeText={(confirmPassword) => this.setState({confirmPassword})}
        />
         <TextInput
           style={globalStyles.textInput}
           placeholder="Access Code"
           placeholderTextColor='white'
           secureTextEntry={true}
           onChangeText={(code) => this.setState({code})}
         />
        {
          this.state.emailInUse &&
            <View style={{flexDirection: 'row'}}>
              <Text style={[style.errorText]}>This email address is already in use by another account. 
              <Link 
                onClick={() => app.goToScene('Login', {app})}
                extraStyle={{width: 80, height: 15}}
                textStyles={{textDecorationLine: 'underline'}}
                text=' Sign in?' /></Text>      
            </View>
        }

        { this.state.invalidEmail && <Text style={style.errorText}> Invalid email address </Text> }
        { this.state.invalidPassword && <Text style={style.errorText}> Password should be at least 6 characters </Text> }
        { this.state.passwordMismatch && <Text style={style.errorText}> The passwords that you entered do not match </Text> }
        { this.state.codeMismatch && <Text style={style.errorText}> The code that you entered is invalid </Text> }


         <Button extraStyle={style.submit} text='Submit' onPress={ () => this.verifyPasswordMatch(this.state) }> </Button>
      </View>
    );
  };

}

export default SignUpForm;
