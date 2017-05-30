import React, { Component } from 'react';
import { createUserWithEmailAndPassword } from '../helpers/firebase';
import {
  View,
  Text,
  TouchableHighlight,
  TextInput
} from 'react-native';

class Login extends Component {

  constructor() {
    super();

    this.state = {
      email: '',
      password: ''
    }
  }

  submitForm(state) {
    console.log('submitForm CALLED')
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

    const { style, app } = this.props;
    return (
      <View style={[style.container, { justifyContent: 'center', backgroundColor: 'gray' }]}>
        <Text>
          Welcome Seach Page
        </Text>
        { signUpView }
        <TouchableHighlight
          onPress={() => {
            app.goToScene('Settings', {app});
          }}>
          <Text style={style.navText}>
            Search your area
          </Text>
        </TouchableHighlight>
      </View>
    );
  };

}

export default Login;
