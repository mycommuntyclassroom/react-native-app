import React, { Component } from 'react';
import { createUserWithEmailAndPassword } from '../helpers/firebase';
import {
  View,
  Text,
  TouchableHighlight,
  TextInput
} from 'react-native';

class WelcomeSearch extends Component {

  constructor() {
    super();

    this.state = {
      email: '',
      password: ''
    }
  }

  submitForm(e) {
    console.log('submitForm CALLED')
    e.preventDefault();
    const data = {...this.state};
    const { email, password } = data;
    console.log('data: ', data);
    createUserWithEmailAndPassword(email, password);
  }

  render() {

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
        <TouchableHighlight onPress={ this.submitForm }>
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

export default WelcomeSearch;
