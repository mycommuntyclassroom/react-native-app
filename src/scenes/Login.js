import React, { Component } from 'react';
import { createUserWithEmailAndPassword } from '../helpers/firebase';
import {
  View,
  Text,
  TouchableHighlight,
  TextInput
} from 'react-native';
import style from '../style';

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
    createUserWithEmailAndPassword(email, password);
  }

  render() {

    console.log('this.state in RENDER: ', this.state);
    // view for the sign up with your ('X') account
    const signUpView = (
      <View className="register-form">
        <TextInput
          style={{width: 200, height: 40}}
          placeholder="Email"
          onChangeText={(email) => this.setState({email})}
        />
        <TextInput
          style={{ width: 200, height: 40}}
          placeholder="Password"
          onChangeText={(password) => this.setState({password})}
        />
        <TouchableHighlight onPress={ () => this.submitForm(this.state) }>
          <Text>
            Submit
          </Text>
        </TouchableHighlight>
      </View>
    );

    const props = this.props;
    const { auth, app } = props;
    const { status } = auth;

    return (
      <View style={[style.container, { justifyContent: 'center', backgroundColor: 'gray' }]}>
        { status === 'ANONYMOUS' && signUpView }
        { status === 'SIGNED_IN' && app.goToScene('Dashboard', {app}) } 
      </View>
    );
  };

}

export default Login;
