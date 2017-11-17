import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableHighlight,
  ScrollView
} from 'react-native';

import Carousel from 'react-native-snap-carousel';
import LinearGradient from 'react-native-linear-gradient';
import { checkRelationship, isEventInRadius } from '../../helpers/user';
import Link from '../Link';
import { deviceDimensions } from '../../styles';
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
      let guardianid = '';
      let isGuardianSponsorer = false;

      // iterate through each host event within the current group
      for (let teaser in eventData[teaserGroup]) {
        
        let teaserData = eventData[teaserGroup][teaser];
        const recurringDays = teaserData.recurringDays || []
        const { hostName, title, image, startTime, finishTime, gid, latlong = { lat: 90.000, lng:0.000 }, sponsored = false } = teaserData;
        guardianid = gid;
        isGuardianSponsorer = sponsored;

        //filter out events belonging to user
        if (gid === props.auth.uid)
          continue;

        // set the gid for the scope above
        const ageRange = teaserData.ageRange || [];
        eventHostName = hostName;

        // handle the output of the image
        let eventImage;
        let imageStyle;

          if (image === '../../../images/logo.png' || image === '') {
           eventImage = require('../../../images/logo.png'); 
           imageStyle = {width: 150, height: 150}
          } else {
            eventImage = {uri: image}
            imageStyle = style.teaserImage
          }

        teaserElement =
          <View style={style.teaserContainer} id={teaser} key={teaser}>
            <TouchableHighlight
              onPress={() => app.goToScene('EventDetails', {app, gid})}
            >
              <Image 
                source={eventImage} 
                resizeMode='cover' 
                style={imageStyle} />
            </TouchableHighlight>
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
              <View style={style.dayAndTime}>
                <View style={style.days}>
                  {
                    recurringDays.map((item, index) => {
                      // conditionals for handling the various output for the recurring days
                      if(recurringDays.length === 1 && item === ' '){
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
        if((teaserData.privacy != 'private' || checkRelationship('friend', props, gid)) && (isEventInRadius(latlong, app.props.user.latlong ) || sponsored))
          teaserOutput.push(teaserElement);
      }

      if (teaserOutput.length > 0) {
        isGuardianSponsorer ? hostEventsOutput.unshift(
          <View className="event-container" key={`${teaserGroup}`}>
            <Link
              onClick={() => app.goToScene('GuardianDetails', {app, gid:guardianid})}
              extraStyle={style.hostName}
              textStyles={style.hostNameText}
              text={eventHostName}/>
            <Carousel
              className="host-events"
              ref={(carousel) => { this._carousel = carousel; }}
              sliderWidth={deviceWidth - 40} // make the sliderWidth and itemWidth equivalent to make it left align
              itemWidth={deviceWidth - 40} // subtract 40 for item's left and right padding
            >
              {teaserOutput}
            </Carousel>
          </View>
        ) :
        hostEventsOutput.push(
          <View className="event-container" key={`${teaserGroup}`}>
            <Link
              onClick={() => app.goToScene('GuardianDetails', {app, gid:guardianid})}
              extraStyle={style.hostName}
              textStyles={style.hostNameText}
              text={eventHostName}/>
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
    }

    // if hostEventsOutput is empty after the array, fill it with an empty string value
    // this is to prevent the react-slick slider from throwing an undefined error
    hostEventsOutput = hostEventsOutput === [] ? [' '] : hostEventsOutput;
  

    // OUTPUT THE EVENTS
    // 
    // 
    return (
      <ScrollView style={ style.container }>
        { hostEventsOutput.length > 0 ? hostEventsOutput : <View style={{marginTop:50,justifyContent:'center',
        alignItems:'center', flexDirection:'column'}}>
          <Text style={{color: 'black', fontFamily: 'AvenirNext-UltraLight', fontSize:16, alignSelf:'center'}}>
            No Hosts currently in your area,</Text>
          <Link
          onClick={ () => this.props.app.goToScene('Invite', {app : this.props.app}) }
          textStyles={{color: 'blue', fontFamily: 'AvenirNext-UltraLight', fontSize:16}}
          text='click here'/><Text style={{color: 'black', fontFamily: 'AvenirNext-UltraLight', fontSize:16, textAlign:'center'}}>
          to share the app to potential hosts to build our community in your area!</Text>
        </View> }
      </ScrollView>
    )
  }
}

export default BrowseHostsOutput;
