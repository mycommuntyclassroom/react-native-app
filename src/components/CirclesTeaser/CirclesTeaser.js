import React, {Component} from 'react';
import {
  View,
  TouchableHighlight,
  Text,
  Image
} from 'react-native';

import PropTypes from 'prop-types';
import Carousel from 'react-native-snap-carousel';
import Link from '../Link';
import style from './style';
import { deviceDimensions } from '../../styles';

class CirclesTeaser extends Component {
  static PropTypes={
    circlesData: PropTypes.object,
    title: PropTypes.str,
    path: PropTypes.str
  };

  render(){ 

    const props = this.props
    let circlesData = props.circlesData || [' '];

    console.log('Here are the circlesData: ', circlesData)

    // array that stores the circle elements ex: the Children circles
    let circlesOutput = [];
    let circleElement;
    let nullOutput;
    let customClassName = '';

    console.log('here is the circlesData: ', circlesData);
    console.log('here is the circlesData[0]: ', circlesData[0]);
    console.log("here is the circlesData[0] === ' ': ", circlesData[0] === ' ');
    console.log('PROPS: ', props)

    // if the circlesData is undefined, output a null-circle element
    switch (props.circleType) {
      case 'myChildren':
        console.log('got the null outPut for the circles')
        nullOutput = 
          <View>
            <Image 
              source={require('../../../images/blank-profile-pic.png')} 
              resizeMode='contain' 
              style={{borderRadius:25, width: 50, height: 50}} 
            />
          </View>
        break;
      case 'eventDetail':
        nullOutput = 
          <View className="no-child-booked">
            There are no children booked for this event
          </View>;
        circlesData = circlesData.students || [' ']
        customClassName = 'children-event-bubble'
        break;
      default:
        // statements_def
        break;
    }
    circlesData[0] === ' '
      ? circlesOutput = nullOutput
      : generateCircles();

    // generate circles based on the data passed to this function
    function generateCircles() {
      for (let circle in circlesData) {

        // grab the profileImage from the data obj
        const { profileImage } = circlesData[circle];

        let ImageStyles = {
          backgroundImage: `url('${profileImage}')`,
          backgroundSize: 'cover'
        };

        circleElement = 
          // <View className={`circle-element ${customClassName}`} id={circle} key={circle}></View>;
          <TouchableHighlight key={circle} onPress={ () => app.goToScene('EditChild', {app, childId: circle})} >
            <Image source={require('../../../images/blank-profile-pic.png')} resizeMode='contain' style={{width: 50, height: 50}} />
          </TouchableHighlight>

        circlesOutput.push(circleElement);
      }

      // if circlesOutput is empty after the array, fill it with a value
      // this is to prevent the react-slick slider from throwing an undefined error
      circlesOutput = circlesOutput == [] ? [' '] : circlesOutput;
    }

    const { title, path, app } = props
    console.log('IN the REnder of circles teaser, props: ', props)
    console.log('IN the REnder of circles teaser, app: ', app)

    return(
      <View className="circles-teaser">
        { title && <Text className="title">{title}</Text> }
        <View className="circle-group">
          <Carousel
            ref={(carousel) => { this._carousel = carousel; }}
            sliderWidth={deviceDimensions.deviceWidth}
            itemWidth={50}
          >
            {circlesOutput}
          </Carousel>
          {
            props.hasAddButton &&
              <Link className="add-item-button add-circle" onClick={ () => app.goToScene('CreateChild', {app})} text='TiPlus' />
          }
        </View>
      </View>
    )
  } 
};

export default CirclesTeaser;