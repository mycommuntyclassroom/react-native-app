import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
  Text
} from 'react-native';

class Feedback extends Component {

  constructor() {
    super();

    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    this.props.app.goToScene('loading', { sup: true });
    // this.props.app.goToScene('Feedback', { hostID: 123 });
  }

  render() {
    const { globalStyles, app } = this.props;

    return (
      <View style={[globalStyles.container, { backgroundColor: 'hotpink' }]}>
        <Text style={globalStyles.title}>
          Feedback
        </Text>
      </View>
    );
  };

}

export default Feedback;
