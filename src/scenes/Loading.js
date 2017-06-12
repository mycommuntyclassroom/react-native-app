import React, { Component } from 'react';
import {
  View,
  ActivityIndicator,
  TouchableHighlight,
  Text
} from 'react-native';

class Loading extends Component {

  constructor() {
    super();

    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    this.props.app.goToScene('welcome', { sup: true });
    // this.props.app.goToScene('hosts', { hostID: 123 });
  }

  componentDidMount() {
    console.log('mounted Loading', this.props);
  }

  render() {
    const { globalStyles, app } = this.props;
    return (
      <View style={[globalStyles.container, { backgroundColor: 'aqua' }]}>
        <Text style={globalStyles.title}>
          Loading
        </Text>
        <ActivityIndicator
          animating={true}
          style={globalStyles.loader}
          size="large"
          color="purple" />
      </View>
    );
  };

}

export default Loading;
