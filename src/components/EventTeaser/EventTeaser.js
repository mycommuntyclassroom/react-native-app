import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
  Text,
  Image
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import Carousel from 'react-native-snap-carousel';
import Link from '../Link';
import { deviceDimensions } from '../../styles';
import style from './style';
import styleVariables from '../../styles/variables'

class EventTeaser extends Component {

  constructor(props){
    super(props)

  }

  render(){ 

    const props = this.props
    const { globalStyles, app, guardianData } = props;
    const { deviceWidth, deviceHeight } = deviceDimensions;
    let userData;

    // if guardianData is passed in the props, then show guardian data 
    // instead of admin user data
    guardianData ? userData = guardianData : userData = app.props.user

    const teaserData = userData.hostEvents || [' '];
    let teaserOutput = []
    let teaserElement;
    let nullClass = '';

    // TODO: Check if generateTeasers within the Render method is causing excessive calls
    // 
    // if the teaserData is undefined, output a fallback element
    if (teaserData[0] === ' ') {
      teaserOutput = 
        <View style={{justifyContent: 'center', width: deviceWidth - 40, height: 50}}>
          <Text>
            Want to host? Add an event here
          </Text>
          <View style={{top: -6, right: 0}}>
            <TouchableHighlight onPress={ () => app.goToScene('CreateEvent') }>
              <LinearGradient
                colors={[styleVariables.mc2purpleElectric, styleVariables.mc2BlueElectric]} 
                style={[globalStyles.addItem, style.addItem]}
              >
                <Image 
                  source={require('../../../images/plus-sign-white.png')}
                  resizeMode='cover' 
                  style={{top: 2, left: 1, width: 40, height: 40}} />
              </LinearGradient>
            </TouchableHighlight>
          </View>
        </View>;
      nullClass = 'null-teaser';
    } else {
      generateTeasers();
    }

    // generate teaser based on the data passed to this function
    function generateTeasers() {
      for (let teaser in teaserData) {
        const { gid, title, image, date, startTime, finishTime } = teaserData[teaser];
        const recurringDays = teaserData[teaser].recurringDays || []

        // handle the output of the image
        let eventImage = image != '../../../images/logo.png'
          ? {uri: image}
          : require('../../../images/logo.png');

        teaserElement =
          <View style={style.teaserElement} key={teaser}>
            <TouchableHighlight className="event-image" onPress={() => app.goToScene('EventDetails', {app, gid}) }>
              <Image 
                source={eventImage} 
                resizeMode='cover' 
                style={style.teaserImage} />
            </TouchableHighlight>
            <View style={style.addEventContainer}>

              {
                !guardianData &&
                <LinearGradient
                  colors={[styleVariables.mc2purpleElectric, styleVariables.mc2BlueElectric]} 
                  style={[globalStyles.addItem, style.editItem]}
                >
                  <TouchableHighlight onPress={ () => app.goToScene('EditEvent', {app, eventId: teaser}) }>
                    <Image
                      source={require('../../../images/edit.png')}
                      resizeMode='cover' 
                      style={{width: 40, height: 40}} />
                  </TouchableHighlight>
                </LinearGradient>
              }

              {
               !guardianData &&
                <LinearGradient
                  colors={[styleVariables.mc2purpleElectric, styleVariables.mc2BlueElectric]} 
                  style={[globalStyles.addItem, style.addItem]}
                >
                  <TouchableHighlight onPress={ () => app.goToScene('CreateEvent') }>
                    <Image
                      source={require('../../../images/plus-sign-white.png')}
                      resizeMode='cover' 
                      style={{position: 'relative', top: 2, left: 1, width: 35, height: 30}} />
                  </TouchableHighlight>
                </LinearGradient>
              }
            </View>
            <View style={style.eventView}>
              <Text style={style.eventTitle}>{title}</Text>
              <View style={style.eventTags}>
                { 
                  teaserData[teaser].ageRange &&
                    teaserData[teaser].ageRange.map((item) => {
                      return (
                        <View className="tag-item" key={`${teaser}${item}`}>
                          <Text style={style.tagItemCopy}>{item}</Text>
                        </View>
                      )
                    })
                }
              </View>
              <View style={style.eventDays}>
                {
                  // develop the view for recurring days ex: M/W/F
                  // if there are no recurring days, show the date of the event
                  recurringDays.map((item, index) => {
                    if(recurringDays.length === 1 && item === ' ') {
                      let stringDate = teaserData[teaser].startDate.split(' ').slice(0,3).join(' ')
                      return <View key={`${teaser}${item}`}><Text style={style.eventDay}>{stringDate}</Text></View>
                    }
                    else if(index === 0 || index === 1) {
                      return <View key={`${teaser}${item}`}><Text style={style.eventDay}>{item}</Text></View>
                    } else {
                      return <View key={`${teaser}${item}`}><Text style={style.eventDay}>/{item}</Text></View>
                    }
                  })
                }
              </View>
              <View className="time"><Text>{startTime} - {finishTime}</Text></View>
            </View>
          </View>
        teaserOutput.push(teaserElement);
      }

      // if teaserOutput is empty after the array, fill it with an empty string value
      // this is to prevent the react-slick slider from throwing an undefined error
      teaserOutput = teaserOutput == [] ? [' '] : teaserOutput;
    }


    return(
      <View style={style.teaserContainer}>

        <Carousel
          ref={(carousel) => { this._carousel = carousel; }}
          sliderWidth={deviceWidth - 40} // make the sliderWidth and itemWidth equivalent to make it left align
          itemWidth={deviceWidth - 40} // subtract 40 for item's left and right padding
        >
          { teaserOutput }
        </Carousel>

      </View>
    )
  }
}

export default EventTeaser;
