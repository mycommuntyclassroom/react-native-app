/**
 * Created by Omkareshwar on 9/1/17.
 */

import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  TextInput
} from 'react-native';

import ResetPasswordForm from '../components/ResetPasswordForm';


class ResetPassword extends Component {

  render() {

    const props = this.props;
    const { globalStyles, auth, app } = props;

    return (
      <View style={[globalStyles.container]}>
        <ResetPasswordForm {...props} />
      </View>
    );
  };

}

export default ResetPassword;
