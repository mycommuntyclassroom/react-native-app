import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
  Text
} from 'react-native';

import BrowseHostsOutput from '../components/BrowseHostsOutput';

class BrowseHosts extends Component {

  constructor() {
    super();
    console.log('BrowseHosts constructor');
  }

  componentDidMount() {
    console.log('mounted BrowseHosts', this.props);
  }

  render() {
    const props = this.props
    const { style, app } = props;

    return (
      <View style={[style.container, { backgroundColor: 'wheat' }]}>
        <BrowseHostsOutput {...props} />
        <Text style={style.title}>
          BrowseHosts
        </Text>
      </View>
    );
  };

}

export default BrowseHosts;

