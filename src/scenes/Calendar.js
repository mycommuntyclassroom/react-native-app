import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
  Text
} from 'react-native';

class Calendar extends Component {

  constructor() {
    super();

    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    this.props.app.goToScene('loading', { sup: true });
    // this.props.app.goToScene('Calendar', { hostID: 123 });
  }

  componentDidMount() {
    console.log('mounted Calendar', this.props);
  }

  render() {
    const { style, app } = this.props;
    return (
      <View style={[style.container, { backgroundColor: 'violet' }]}>
        <Text style={style.title}>
          Calendar
        </Text>
      </View>
    );
  };

}

export default Calendar;
