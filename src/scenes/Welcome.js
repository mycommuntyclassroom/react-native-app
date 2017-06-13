import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
  Text,
  Image
} from 'react-native';

import WelcomePage from '../components/WelcomePage'

class Welcome extends Component {

  componentDidMount() {
    console.log('mounted Welcome', this.props);
  }

  render() {
    const props = this.props;
    const { globalStyles } = props;
    return (
      <View style={globalStyles.container}>
        <WelcomePage {...props} />
      </View>
    );
  };

}

export default Welcome;
