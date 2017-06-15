import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
  Text
} from 'react-native';

import Header from '../components/Header';
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
      <View style={{marginBottom: 90, backgroundColor: 'white'}}>
        <Header { ...props } />
        <BrowseHostsOutput {...props} />
      </View>
    );
  };

}

export default BrowseHosts;

