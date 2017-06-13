import React, { Component } from 'react';
import { createUserWithEmailAndPassword } from '../helpers/firebase';
import {
  View,
  Text,
  TouchableHighlight,
  TextInput
} from 'react-native';

import WelcomeSearchPage from '../components/WelcomeSearchPage'

class WelcomeSearch extends Component {

  render() {
    const props = this.props;
    const { globalStyles, app } = props;
    return (
      <View style={globalStyles.container}>
        <WelcomeSearchPage {...props} />
      </View>
    );
  };

}

export default WelcomeSearch;
