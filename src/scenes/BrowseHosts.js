import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
  Text
} from 'react-native';

import Header from '../components/Header';
import BrowseHostsOutput from '../components/BrowseHostsOutput';
import FooterNav from '../components/FooterNav';

class BrowseHosts extends Component {

  constructor() {
    super();
  }

  render() {
    const props = this.props
    const { globalStyles, app } = props;

    return (
      <View style={{height: '100%', backgroundColor: 'white'}}>
        <Header { ...props } />
        <BrowseHostsOutput {...props} />
        <FooterNav {...props} />
      </View>
    );
  };

}

export default BrowseHosts;

