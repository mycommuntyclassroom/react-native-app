import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView
} from 'react-native';

import Carousel from 'react-native-snap-carousel';
import LinearGradient from 'react-native-linear-gradient';
import RequestFriendButton from '../RequestFriendButton';
import Link from '../Link';
import { deviceDimensions } from '../../styles';
import styleVariables from '../../styles/variables'
import style from './style'

class BrowseHostsOutput extends Component {

  render () {

    const props = this.props;
    const { app } = props;
    const { deviceWidth, deviceHeight } = deviceDimensions;
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
      let gid = '';

      // iterate through each host event within the current group
      for (let teaser in eventData[teaserGroup]) {
        
        let teaserData = eventData[teaserGroup][teaser];
        const { hostName, title, image, startTime, finishTime } = teaserData;

        // set the gid for the scope above
        gid = teaserData.gid
        const ageRange = teaserData.ageRange || [];
        eventHostName = hostName;

        // handle the output of the image
        let eventImage = image != '../../../images/blank-profile-pic.png'
          ? {uri: image} 
          : require('../../../images/blank-profile-pic.png');

        teaserElement =
          <View style={style.teaserContainer} id={teaser} key={teaser}>
            <View 
              className="event-image" 
              onClick={ () => browserHistory.push(`/event-details/${gid}/${teaser}`) }>
            </View>
            <Image 
              source={eventImage} 
              resizeMode='cover' 
              style={style.teaserImage} />
            <LinearGradient 
              style={style.eventView}
              colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.6)']} 
            >
              { 
                // toggleSeatBooking && 
                // <View onClick={ () => toggleSeatBooking() } className="add-item-button drop-off">
                //   <FaChild/>
                // </View>
              }
              <Text style={style.title}>{title}</Text>
              <View style={style.tags}>
                { 
                  ageRange.map((item) => {
                    return (
                      <View style={style.bulletAndTagItem} key={`${teaser}${item}`}>
                        <View style={style.bullet} />
                        <Text style={style.tagItem}>{item}</Text>
                      </View>
                    )
                  })
                }
              </View>
              <RequestFriendButton {...props} gid={gid} requester={{displayName: hostName, uid: gid}} browseHostsStyle={style.requestFriendButton} />
              <View style={style.dayAndTime}>
                <View style={style.days}>
                  {
                    teaserData.recurringDays.map((item, index) => {
                      // conditionals for handling the various output for the recurring days
                      let daysArray = teaserData.recurringDays;
                      if(daysArray.length === 1 && item === ' '){
                        let stringDate = teaserData.startDate.split(' ').slice(0,3).join(' ')
                        return <Text style={style.dayText} key={`${teaser}${item}`}>{stringDate}</Text>
                      }
                      else if(index === 0 || index === 1) {
                        return <Text style={style.dayText} key={`${teaser}${item}`}>{item}</Text>
                      } else{
                        return <Text style={style.dayText} key={`${teaser}${item}`}>/{item}</Text>
                      }
                    })
                  }
                </View>
                <View style={style.time}><Text style={style.timeText}>{startTime} - {finishTime}</Text></View>
              </View>
            </LinearGradient>
          </View>
        teaserOutput.push(teaserElement);
      }
      hostEventsOutput.push(
        <View className="event-container" key={`${teaserGroup}`}>
          <Link 
            onClick={() => app.goToScene('GuardianDetails', {app, gid})} 
            extraStyle={style.hostName}
            textStyles={style.hostNameText}
            text={eventHostName} /> 
          <Carousel
            className="host-events"
            ref={(carousel) => { this._carousel = carousel; }}
            sliderWidth={deviceWidth - 40} // make the sliderWidth and itemWidth equivalent to make it left align
            itemWidth={deviceWidth - 40} // subtract 40 for item's left and right padding
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
      <ScrollView style={ style.container }>
        { hostEventsOutput }
      </ScrollView>
    )
  }
}

export default BrowseHostsOutput;
