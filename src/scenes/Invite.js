import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
  Text
} from 'react-native';

class Invite extends Component {

  constructor() {
    super();

    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    this.props.app.goToScene('loading', { sup: true });
    // this.props.app.goToScene('Invite', { hostID: 123 });
  }

  componentDidMount() {
    console.log('mounted Invite', this.props);
  }

  render() {
    const { globalStyles, app } = this.props;
    return (
      <View style={[globalStyles.container, { backgroundColor: 'violet' }]}>
        <Text style={globalStyles.title}>
          Invite
        </Text>
      </View>
    );
  };

}

export default Invite;
