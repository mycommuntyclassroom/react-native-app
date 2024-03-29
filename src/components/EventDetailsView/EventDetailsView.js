import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
  Text
} from 'react-native';

import { getHostEvents, generateTeasers } from '../../helpers/events';

import Header from '../Header';
import FooterNav from '../FooterNav';
import CirclesTeaser from '../CirclesTeaser';
import SeatBooking from '../SeatBooking';
import style from './style';

class EventDetailsView extends Component {

  constructor(props){
    super();

    this.state = {
      eventIndex: 0,
      visibility: false
    }

    // bind methods at the constructor level
    this.handleEventIndex = this.handleEventIndex.bind(this)
    this.toggleSeatBooking = this.toggleSeatBooking.bind(this)
  }

  componentDidMount() {
    // gather all of the host events
    getHostEvents()
  }

  handleEventIndex (index) {
    this.setState({ eventIndex: index })
  }

  toggleSeatBooking () {
    this.setState({ visibility: !this.state.visibility })
  }

  render() {
    const props = this.props;
    const { app, gid } = props;
    let eventDetails = app.props.events[gid] || {}; 
    let eventIndices = Object.keys(eventDetails);
    let currentEventIndex = eventIndices[this.state.eventIndex];
    let selectedEventDetails = eventDetails[currentEventIndex] || [' '];
    let summary = selectedEventDetails ? selectedEventDetails.summary : '';
    let eventGroup = {};

    // filter by the selected host 
    for(let hostId in app.props.events) {
      if (hostId === gid) {
        eventGroup[hostId] = app.props.events[hostId];
        break;
      }
    }
    
    const eventData = eventGroup || [' '];

    // // this array stores the template elements ex: the event posts
    let hostEventsOutput = [];

    // generate the list of host events
    // if the eventData is undefined, output a fallback output
    if (eventData[0] === ' ') {
      hostEventsOutput = 
        <View style={style.eventTeaserElement, style.nullTeaser}></View>;
    } else {
      // Generate the event teasers
      hostEventsOutput = generateTeasers(eventData, props, (index) => this.handleEventIndex(index), () => this.toggleSeatBooking());
    }

    return(
      <View>
        <View style={style.container}>
          { hostEventsOutput }
          <Text style={style.eventSummary}>{ summary }</Text>
          <CirclesTeaser 
            {...props}
            circlesData={selectedEventDetails} 
            circleType="eventDetail" />
          <SeatBooking 
            visibility={this.state.visibility} 
            toggleSeatBooking={this.toggleSeatBooking} 
            {...props} 
            selectedEventDetails={selectedEventDetails}
            currentEventId={currentEventIndex} />
        </View>
        <FooterNav {...props} />
      </View>
    )
  }
}

export default EventDetailsView;
