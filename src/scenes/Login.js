import React, { Component } from 'react';
import { signInWithEmailAndPassword } from '../helpers/firebase';
import {
  View,
  Text,
  TouchableHighlight,
  TextInput
} from 'react-native';

import LoginForm from '../components/LoginForm';

class Login extends Component {

  render() {

    const props = this.props;
    const { globalStyles, auth, app } = props;
    const { status } = auth;

    return (
      <View style={[globalStyles.container]}>
        { status === 'ANONYMOUS' && <LoginForm {...props} /> }
        { status === 'SIGNED_IN' && app.goToScene('Dashboard', {app}) } 
      </View>
    );
  };

}

export default Login;
