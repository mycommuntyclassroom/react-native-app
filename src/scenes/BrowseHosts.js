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
    const { globalStyles, app } = props;

    return (
      <View style={globalStyles.container}>
        <BrowseHostsOutput {...props} />
      </View>
    );
  };

}

export default BrowseHosts;

