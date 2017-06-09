import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
  Text
} from 'react-native';

import BrowseHostsOutput from '../components/BrowseHostsOutput';
import { getHostEvents } from '../helpers/events';

class BrowseHosts extends Component {

  componentDidMount() {
    console.log('mounted BrowseHosts', this.props);

    // gather all of the host events
    getHostEvents()
  }

  render() {
    const props = this.props;
    return (
      <BrowseHostsOutput {...props} />
    );
  };

}

export default BrowseHosts;
