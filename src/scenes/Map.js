import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
  Text
} from 'react-native';

class Map extends Component {

  constructor() {
    super();

    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    this.props.app.goToScene('loading', { sup: true });
    // this.props.app.goToScene('Map', { hostID: 123 });
  }

  componentDidMount() {
    console.log('mounted Map', this.props);
  }

  render() {
    const { style, app } = this.props;
    return (
      <View style={[style.container, { backgroundColor: 'burlywood' }]}>
        <Text style={style.title}>
          Map
        </Text>
      </View>
    );
  };

}

export default Map;
