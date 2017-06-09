import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView
} from 'react-native';

import Carousel from 'react-native-snap-carousel';
import RequestFriendButton from '../RequestFriendButton';
import Link from '../Link';
import { deviceDimensions } from '../../styles';

class BrowseHostsOutput extends Component {

  render () {

    const props = this.props;
    console.log('BrowseHostsOutput props: ', props)
    const { app } = props;
    console.log('BrowseHostsOutput app: ', app);
    const eventData = app.props.events || [' '];

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
        console.log('this is the teaserData: ', teaserData)
        const { gid, hostName, title, image, startTime, finishTime } = teaserData;
        const ageRange = teaserData.ageRange || [];
        eventHostName = hostName;

              // <img src={image} alt={title} />
        teaserElement =
          <View className="teaser-container" id={teaser} key={teaser}>
            <View className="event-image" onClick={ () => browserHistory.push(`/event-details/${gid}/${teaser}`) }>
            </View>
            <View className="event-View">
              { 
                // toggleSeatBooking && 
                // <View onClick={ () => toggleSeatBooking() } className="add-item-button drop-off">
                //   <FaChild/>
                // </View>
              }
              <RequestFriendButton {...props} gid={gid} requester={{displayName: hostName, uid: gid}} />
              <Text>{title}</Text>
              <View className="tags">
                { 
                  ageRange.map((item) => {
                    return <Text className="tag-item" key={`${teaser}${item}`}>{item}</Text>
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
                      return <Text key={`${teaser}${item}`}>{stringDate}</Text>
                    }
                    else if(index === 0 || index === 1) {
                      return <Text key={`${teaser}${item}`}>{item}</Text>
                    } else{
                      return <Text key={`${teaser}${item}`}>/{item}</Text>
                    }
                  })
                }
              </View>
              <View className="time"><Text>{startTime} - {finishTime}</Text></View>
            </View>
          </View>
        teaserOutput.push(teaserElement);
      }
      // <Link to={`/guardian/${teaserGroup}`} className="host-name">{eventHostName}</Link> 
      hostEventsOutput.push(
        <View className="event-container" key={`${teaserGroup}`}>
          <Carousel
            className="host-events"
            ref={(carousel) => { this._carousel = carousel; }}
            sliderWidth={deviceDimensions.deviceWidth}
            itemWidth={50}
          >
            {teaserOutput}
          </Carousel>
        </View>
      )
    }

    // if hostEventsOutput is empty after the array, fill it with an empty string value
    // this is to prevent the react-slick slider from throwing an undefined error
    hostEventsOutput = hostEventsOutput === [] ? [' '] : hostEventsOutput;
  

    // OUTPUT THE EVENTS
    // 
    // 
    return (
      <ScrollView style={{ backgroundColor: 'wheat', paddingBottom: 91 }}>
        { hostEventsOutput }
      </ScrollView>
    )
  }
}

export default BrowseHostsOutput;
