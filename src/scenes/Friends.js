import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
  Text
} from 'react-native';

class Friends extends Component {

  constructor() {
    super();

    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    this.props.app.goToScene('loading', { sup: true });
    // this.props.app.goToScene('Friends', { hostID: 123 });
  }

  componentDidMount() {
    console.log('mounted Friends', this.props);
  }

  render() {
    const { globalStyles, app } = this.props;
    return (
      <View style={[globalStyles.container, { backgroundColor: 'powderblue' }]}>
        <Text style={globalStyles.title}>
          Friends
        </Text>
      </View>
    );
  };

}

export default Friends;
