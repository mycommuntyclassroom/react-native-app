import React, { Component } from 'react';
import { signInWithEmailAndPassword } from '../helpers/firebase';
import {
  View,
  Text,
  TouchableHighlight,
  TextInput
} from 'react-native';

import { signInHandler } from '../helpers/user';
import SignUpForm from '../components/SignUpForm';
import CreateGuardianAccount from '../components/CreateGuardianAccount';

class SignUp extends Component {

  render() {

    const props = this.props;
    const { globalStyles, auth, app } = props;
    const { status } = auth;
    // TODO Move in after styling 
// <SignUpForm {...props} />
    return (
      <View style={[globalStyles.container]}>
        { status === 'SIGNED_IN' && app.goToScene('Dashboard', {app})}
        { status === 'ANONYMOUS' && <CreateGuardianAccount auth={auth} {...props} /> }
        { status === 'CREATING_ACCOUNT' && <CreateGuardianAccount auth={auth} {...props} /> }
      </View>
    );
  };

}

export default SignUp;
