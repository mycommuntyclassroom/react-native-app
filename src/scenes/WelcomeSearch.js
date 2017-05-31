import React, { Component } from 'react';
import { createUserWithEmailAndPassword } from '../helpers/firebase';
import {
  View,
  Text,
  TouchableHighlight,
  TextInput
} from 'react-native';

class WelcomeSearch extends Component {

  render() {
    const { style, app } = this.props;
    return (
      <View style={[style.container, { justifyContent: 'center', backgroundColor: 'pink' }]}>
        <Text>WelcomeSearch</Text>
        <TouchableHighlight
          onPress={() => {
            app.goToScene('Login', {app});
          }}>
          <Text style={style.navText}>
            Login
          </Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => {
            app.goToScene('SignUp', {app});
          }}>
          <Text style={style.navText}>
            Sign up
          </Text>
        </TouchableHighlight>
      </View>
    );
  };

}

export default WelcomeSearch;
