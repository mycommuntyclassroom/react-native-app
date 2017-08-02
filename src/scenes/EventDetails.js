import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
  Text
} from 'react-native';

import Header from '../components/Header';
import EventDetailsView from '../components/EventDetailsView';

class EventDetails extends Component {

  constructor() {
    super();
  }

  render() {
    const props = this.props
    const { globalStyles, app } = props;

    return (
      <View>
        <Header backOption={true} scene="BrowseHosts" { ...props } />
        <EventDetailsView {...props} />
      </View>
    );
  };

}

export default EventDetails;

