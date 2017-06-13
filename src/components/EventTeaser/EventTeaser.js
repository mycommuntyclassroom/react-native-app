import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
  Text
} from 'react-native';

import Carousel from 'react-native-snap-carousel';
import Link from '../Link';
// import style from './style';
import { deviceDimensions } from '../../styles';

class EventTeaser extends Component {

  constructor(props){
    super(props)

  }

  render(){ 

    const props = this.props
    const { app } = this.props;
    let userData;

    // if guardianData is passed in the props, then show guardian data 
    // instead of admin user data
    props.guardianData ? userData = props.guardianData : userData = app.props.user

    const teaserData = userData.hostEvents || [' '];
    let teaserOutput = []
    let teaserElement;
    let nullClass = '';

    // if the teaserData is undefined, output a fallback element
    if (teaserData[0] === ' ') {
      teaserOutput = 
        <View className="event-teaser-element null-teaser">
          <Text>Want to host? Add an event here</Text>
          <Link onClick={ () => app.goToScene('CreateEvent') } text='TiPlus' />
        </View>;
      nullClass = 'null-teaser';
    } else {
      generateTeasers();
    }

    // generate teaser based on the data passed to this function
    function generateTeasers() {
      for (let teaser in teaserData) {
        const { gid, title, image, date, startTime, finishTime } = teaserData[teaser];

              // <Image source={require(image)} resizeMode='contain' />
        teaserElement =
          <View className="teaser-container" key={teaser}>
            <TouchableHighlight className="event-image" onPress={ () => app.goToScene('EventDetails') }>
              <Text>IMAGE</Text>
            </TouchableHighlight>
            <View className="event-View">
              <Link onClick={ () => app.goToScene('EditEvent', {app, eventId: teaser}) } text='FaPencil' />
              {
               !props.guardianData &&
                  <Link onClick={ () => app.goToScene('CreateEvent') } text='FaPlus' />
              }
              <Text>{title}</Text>
              <View className="tags">
                { 
                  teaserData[teaser].ageRange.map((item) => {
                    return <View className="tag-item" key={`${teaser}${item}`}><Text>{item}</Text></View>
                  })
                }
              </View>
              <View className="days">
                {
                  // develop the view for recurring days ex: M/W/F
                  // if there are no recurring days, show the date of the event
                  teaserData[teaser].recurringDays.map((item, index) => {
                    let daysArray = teaserData[teaser].recurringDays;

                    if(daysArray.length === 1 && item === ' ') {
                      let stringDate = teaserData[teaser].startDate.split(' ').slice(0,3).join(' ')
                      return <View key={`${teaser}${item}`}><Text>{stringDate}</Text></View>
                    }
                    else if(index === 0 || index === 1) {
                      return <View key={`${teaser}${item}`}><Text>{item}</Text></View>
                    } else {
                      return <View key={`${teaser}${item}`}><Text>/{item}</Text></View>
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
      <View className={`event-teasers`}>

        <Carousel
          ref={(carousel) => { this._carousel = carousel; }}
          sliderWidth={deviceDimensions.deviceWidth}
          itemWidth={250}
        >
          { teaserOutput }
        </Carousel>

      </View>
    )
  }
}

export default EventTeaser;
