import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
  Text
} from 'react-native';

import Carousel from 'react-native-snap-carousel';
import Link from '../Link/Link';
// import style from './style';
import { deviceDimensions } from '../../styles';

class EventTeaser extends Component {

  constructor(props){
    super(props)

    this.goToScene = this.goToScene.bind(this);
  }

  goToScene(scene, id=0) {
    console.log('goToScene CALLED')
    const { app } = this.props;
    app.goToScene(scene, {app}, id)
  }

  render(){ 

    const props = this.props
    let userData;

    // if guardianData is passed in the props, then show guardian data 
    // instead of admin user data
    props.guardianData ? userData = props.guardianData : userData = props.user

    const teaserData = userData.hostEvents || [' '];

    console.log('teaserData: ', teaserData)
    let teaserOutput = []

    let teaserElement;
    let nullClass = '';

    console.log('THIS is the teaser data before: ', teaserData[0] === ' ');

    // if the teaserData is undefined, output a fallback element
    if (teaserData[0] === ' ') {
      teaserOutput = 
        <View className="event-teaser-element null-teaser">
          <Text>Want to host? Add an event here</Text>
          <Link onClick={ () => this.goToScene('Tutorial') } text='TiPlus' />
        </View>;
      nullClass = 'null-teaser';
    } else {
      generateTeasers();
    }

    // generate teaser based on the data passed to this function
    function generateTeasers() {
      for (let teaser in teaserData) {
        const { gid, title, image, date, startTime, finishTime } = teaserData[teaser];

        teaserElement =
          <View className="teaser-container" key={teaser}>
            <View className="event-image" onClick={ () => browserHistory.push(`/event-details/${gid}/${teaser}`) }>
              <Image source={require(image)} resizeMode='contain' />
            </View>
            <View className="event-View">
              <Link onClick={ this.goToScene('editEvent', teaser) } text='FaPencil' />
              {
               !props.guardianData &&
                  <Link onClick={ this.goToScene('addEvent') } text='FaPencil' />
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

    console.log('***teaserOutput: ', teaserOutput)

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
