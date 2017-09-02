/**
 * Created by Omkareshwar on 9/1/17.
 */
import React, { Component } from 'react';
import { resetPassword } from '../../helpers/firebase';
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
import Toast, { DURATION } from 'react-native-easy-toast'

class ResetPasswordForm extends Component {

  constructor() {
    super();

    this.state = {
      email: '',
    }
  }

  formValidation(result) {
    const { message } = result;
    this.refs.toast.show(message, 3500);
  }

  submitForm(state) {
    const { email } = state;
    resetPassword(email, this.formValidation.bind(this));
  }

  render() {
    const props = this.props;
    const { globalStyles } = props;

    return (
      <View style={style.container}>
        <BackButton scene='Login' {...props} />
        <Text style={[globalStyles.title, style.header]}> Reset Password </Text>
        <TextInput
          style={globalStyles.textInput}
          placeholder="Email"
          onChangeText={(email) => this.setState({email})}
        />

        <Button extraStyle={style.submit} text='Send Password Reset Email' onPress={ () => this.submitForm(this.state) }> </Button>
        <Toast ref="toast" position='center' opacity={0.9} fadeOutDuration={500} textStyle={{
                fontSize:16,
                fontFamily: 'AvenirNext-Regular',
                fontWeight:'400',
                color:'white',
                textAlign:'center'
        }}/>
      </View>
    );
  };

}

export default ResetPasswordForm;
