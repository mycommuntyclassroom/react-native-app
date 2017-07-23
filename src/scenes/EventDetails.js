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
    console.log('EventDetails constructor');
  }

  componentDidMount() {
    console.log('mounted EventDetails', this.props);
  }

  render() {
    const props = this.props
    const { globalStyles, app } = props;

    return (
      <View style={{marginBottom: 90, backgroundColor: 'white'}}>
        <Header backOption={true} { ...props } />
        <EventDetailsView {...props} />
      </View>
    );
  };

}

export default EventDetails;

