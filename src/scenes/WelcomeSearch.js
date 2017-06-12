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
    const { globalStyles, app } = this.props;
    return (
      <View style={[globalStyles.container, { justifyContent: 'center', backgroundColor: 'pink' }]}>
        <Text>WelcomeSearch</Text>
        <TouchableHighlight
          onPress={() => {
            app.goToScene('Login', {app});
          }}>
          <Text style={globalStyles.navText}>
            Login
          </Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => {
            app.goToScene('SignUp', {app});
          }}>
          <Text style={globalStyles.navText}>
            Sign up
          </Text>
        </TouchableHighlight>
      </View>
    );
  };

}

export default WelcomeSearch;
