import React, {Component} from 'react';
import {
  View,
  TouchableHighlight,
  Text,
  Image
} from 'react-native';

import Carousel from 'react-native-snap-carousel';
import LinearGradient from 'react-native-linear-gradient';

import { database } from './firebase';
import actions from '../redux/actions';
import store from '../redux/store';
import { checkRelationship } from './user';

import Link from '../components/Link';
import RequestFriendButton from '../components/RequestFriendButton';
import EventStyles from '../components/BrowseHostsOutput/style';
import styleVariables from '../styles/variables';
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

  const { app } = props;

  // this array stores the template elements ex: the event post
  let hostEventsOutput = [];
  let teaserOutput = [];
  let teaserElement;

  let isFriend = checkRelationship('friend', props, props.gid);

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
      const { hostName, title, image, startTime, finishTime } = teaserData;

      // set the gid for the scope above
      gid = teaserData.gid
      const ageRange = teaserData.ageRange || [];
      eventHostName = hostName;

      // handle the output of the image
      let eventImage = image != '../../images/blank-profile-pic.png'
        ? {uri: image} 
        : require('../../images/blank-profile-pic.png');

      teaserElement =
        <View style={EventStyles.teaserContainer} id={teaser} key={teaser}>
          <Image 
            source={eventImage} 
            resizeMode='cover' 
            style={EventStyles.teaserImage} />
          <LinearGradient 
            style={EventStyles.eventView}
            colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.6)']} 
          >
            <Text style={EventStyles.title}>{title}</Text>
            <View style={EventStyles.tags}>
              { 
                ageRange.map((item) => {
                  return (
                    <View style={EventStyles.bulletAndTagItem} key={`${teaser}${item}`}>
                      <View style={EventStyles.bullet} />
                      <Text style={EventStyles.tagItem}>{item}</Text>
                    </View>
                  )
                })
              }
            </View>
            { 
              (toggleSeatBooking && isFriend) &&
              <LinearGradient 
                colors={[styleVariables.mc2purpleElectric, styleVariables.mc2BlueElectric]}
                style={EventStyles.childDropOff}> 
                <TouchableHighlight onPress={ () => toggleSeatBooking() }>
                  <Image
                    source={require('../../images/drop-off-color.png')}
                    resizeMode='cover' 
                    style={{width: 37, height: 37}} />
                </TouchableHighlight>
              </LinearGradient>
            }
            <RequestFriendButton {...props} gid={gid} requester={{displayName: hostName, uid: gid}} browseHostsStyle={EventStyles.requestFriendButton} />
            <View style={EventStyles.dayAndTime}>
              <View style={EventStyles.days}>
                {
                  teaserData.recurringDays.map((item, index) => {
                    // conditionals for handling the various output for the recurring days
                    let daysArray = teaserData.recurringDays;
                    if(daysArray.length === 1 && item === ' '){
                      let stringDate = teaserData.startDate.split(' ').slice(0,3).join(' ')
                      return <Text style={EventStyles.dayText} key={`${teaser}${item}`}>{stringDate}</Text>
                    }
                    else if(index === 0 || index === 1) {
                      return <Text style={EventStyles.dayText} key={`${teaser}${item}`}>{item}</Text>
                    } else{
                      return <Text style={EventStyles.dayText} key={`${teaser}${item}`}>/{item}</Text>
                    }
                  })
                }
              </View>
              <View style={EventStyles.time}><Text style={EventStyles.timeText}>{startTime} - {finishTime}</Text></View>
            </View>
          </LinearGradient>
        </View>
      teaserOutput.push(teaserElement);
    }
    hostEventsOutput.push(
      <View className="event-container" key={`${teaserGroup}`}>
        <Link 
          onClick={() => app.goToScene('GuardianDetails', {app, gid})} 
          extraStyle={EventStyles.hostName}
          textStyles={EventStyles.hostNameText}
          text={eventHostName} /> 
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
  const { gid } = props

  // set the new data on the students tree
  database.ref(`hostEvents/${gid}/${props.currentEventIndex}/students`)
          .set(data);

  let timestamp = (new Date()).getTime();

  let studentObj = {
    message: 'A child has been scheduled for your class!',
    seen: true,
    timestamp
  }

  // send the confirmation to the host's notifications tree
  database.ref(`guardians/${gid}/notifications`)
          .push(studentObj);
}