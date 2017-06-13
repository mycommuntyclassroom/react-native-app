import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
  Text
} from 'react-native';

class Calendar extends Component {

  render() {
    const { globalStyles, app } = this.props;
    return (
      <View style={[globalStyles.container, { backgroundColor: 'violet' }]}>
        <Text style={globalStyles.title}>
          Calendar
        </Text>
      </View>
    );
  };

}

export default Calendar;
