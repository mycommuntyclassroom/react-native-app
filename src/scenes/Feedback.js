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

  componentDidMount() {
    console.log('mounted Feedback', this.props);
  }

  render() {
    const { style, app } = this.props;

    return (
      <View style={[style.container, { backgroundColor: 'hotpink' }]}>
        <Text style={style.title}>
          Feedback
        </Text>
      </View>
    );
  };

}

export default Feedback;
