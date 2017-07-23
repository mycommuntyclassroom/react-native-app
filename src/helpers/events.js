import React, {Component} from 'react';
import {
  View,
  TouchableHighlight,
  Text
} from 'react-native';

import { database } from './firebase';
import actions from '../redux/actions';
import store from '../redux/store';

import Carousel from 'react-native-snap-carousel';
import Link from '../components/Link';
import RequestFriendButton from '../components/RequestFriendButton';
import { deviceDimensions } from '../styles';

const { deviceWidth, deviceHeight } = deviceDimensions;


// GET ALL CLASSROOM EVENTS
// 
// grab all of the hosted class events
// and set a watch for data changes to the tree
// on any change to the data, trigger an update the store
// 
export function getHostEvents () {
  // grab all of the user's notifications and store them in the Redux store
  database
  .ref('hostEvents')
  .on('value', snapshot => {
    store.dispatch(actions.setHostEvents(snapshot.val()));
  })
}


// BROWSE HOSTS TEASERS
// 
// generate event teasers based on the data passed to this function
// 
export function generateTeasers(eventData, props, handleEventIndex, toggleSeatBooking) {

  console.log('generateTeasers called')

  // this array stores the template elements ex: the event post
  let hostEventsOutput = [];
  let teaserOutput = [];
  let teaserElement;

  function slideChange (index) {
    return handleEventIndex(index)
  }

  // loop through each guardian group of events
  for (let teaserGroup in eventData) {
    teaserOutput = [];

    // set vars at this scope to be used in the hostEventsOutput
    let eventHostName;

    // iterate through each host event within the current group
    for (let teaser in eventData[teaserGroup]) {
      
      let teaserData = eventData[teaserGroup][teaser];
      const { gid, hostName, title, image, startTime, finishTime } = teaserData;
      const ageRange = teaserData.ageRange || [];
      eventHostName = hostName;

      teaserElement =
        <View className="teaser-container" id={teaser} key={teaser}>
          <View className="event-image" onClick={ () => browserHistory.push(`/event-details/${gid}/${teaser}`) }>
            <img src={image} alt={title} />
            {/*<Image 
                          source={eventImage} 
                          resizeMode='cover' 
                          style={style.teaserImage} />*/}
          </View>
          <View className="event-View">
            { toggleSeatBooking && 
              <View onClick={ () => toggleSeatBooking() } className="add-item-button drop-off">
                <Text>FaChild</Text>
              </View>
            }
            <RequestFriendButton {...props} gid={gid} requester={{displayName: hostName, uid: gid}} />
            <Text>{title}</Text>
            <View className="tags">
              { 
                ageRange.map((item) => {
                  return <View className="tag-item" key={`${teaser}${item}`}>{item}</View>
                })
              }
            </View>
            <View className="days">
              {
                teaserData.recurringDays.map((item, index) => {
                  // conditionals for handling the various output for the recurring days
                  let daysArray = teaserData.recurringDays;
                  if(daysArray.length === 1 && item === ' '){
                    let stringDate = teaserData.startDate.split(' ').slice(0,3).join(' ')
                    return <View key={`${teaser}${item}`}>{stringDate}</View>
                  }
                  else if(index === 0 || index === 1) {
                    return <View key={`${teaser}${item}`}>{item}</View>
                  } else{
                    return <View key={`${teaser}${item}`}>/{item}</View>
                  }
                })
              }
            </View>
            <View className="time">{startTime} - {finishTime}</View>
          </View>
        </View>
      teaserOutput.push(teaserElement);
    }
    hostEventsOutput.push(
      <View className="event-container" key={`${teaserGroup}`}>
        <Link to={`/guardian/${teaserGroup}`} className="host-name">{eventHostName}</Link>
        <Carousel
          className="host-events"
          ref={(carousel) => { this._carousel = carousel; }}
          sliderWidth={deviceWidth - 40} // make the sliderWidth and itemWidth equivalent to make it left align
          itemWidth={deviceWidth - 40} // subtract 40 for item's left and right padding
          onSnapToItem={(slideIndex) => { slideChange(slideIndex) }}
        >
          {teaserOutput}
        </Carousel>
      </View>
    )
  }
  // if hostEventsOutput is empty after the array, fill it with an empty string value
  // this is to prevent the react-slick slider from throwing an undefined error
  hostEventsOutput = hostEventsOutput === [] ? [' '] : hostEventsOutput;

  return hostEventsOutput;
}

// CHILD DROP-OFF
// 
// 
export function childDropOff (data, props) {

  const { gId } = props.params

  // set the new data on the students tree
  database.ref(`hostEvents/${gId}/${props.currentEventIndex}/students`)
          .set(data);

  let timestamp = (new Date()).getTime();

  let studentObj = {
    message: 'A child has been scheduled for your class!',
    seen: true,
    timestamp
  }

  // send the confirmation to the host's notifications tree
  database.ref(`guardians/${gId}/notifications`)
          .push(studentObj);
}