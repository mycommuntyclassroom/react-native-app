import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
  Text
} from 'react-native';

class BrowseHosts extends Component {

  constructor() {
    super();

    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    this.props.app.goToScene('loading', { sup: true });
    // this.props.app.goToScene('BrowseHosts', { hostID: 123 });
  }

  componentDidMount() {
    console.log('mounted BrowseHosts', this.props);
  }

  render() {
    const { style, app } = this.props;
    return (
      <View style={[style.container, { backgroundColor: 'green' }]}>
        <Text style={style.title}>
          BrowseHosts
        </Text>
      </View>
    );
  };

}

export default BrowseHosts;
