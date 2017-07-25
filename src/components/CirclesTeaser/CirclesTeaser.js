import React, {Component} from 'react';
import {
  View,
  TouchableHighlight,
  Text,
  Image
} from 'react-native';

import PropTypes from 'prop-types';
import Carousel from 'react-native-snap-carousel';
import LinearGradient from 'react-native-linear-gradient';
import { deviceDimensions } from '../../styles';
import Link from '../Link';
import style from './style';
import styleVariables from '../../styles/variables'

class CirclesTeaser extends Component {
  static PropTypes={
    circlesData: PropTypes.object,
    title: PropTypes.str,
    path: PropTypes.str
  };

  render(){ 

    const props = this.props;
    const { globalStyles } = props;
    let circlesData = props.circlesData || [' '];

    // array that stores the circle elements ex: the Children circles
    let circlesOutput = [];
    let circleElement;
    let nullOutput;
    let customClassName = '';

    // if the circlesData is undefined, output a null-circle element
    switch (props.circleType) {
      case 'myChildren':
        nullOutput = 
          <View>
            <Image 
              source={require('../../../images/blank-profile-pic.png')} 
              resizeMode='cover' 
              style={style.teaserElement}
            />
          </View>
        break;
      case 'eventDetail':
        nullOutput = 
          <View className="no-child-booked">
            <Text>There are no children booked for this event</Text>
          </View>;
        circlesData = circlesData.students || false
        customClassName = 'children-event-bubble'
        break;
      default:
        // statements_def
        break;
    }

    // if there is no data for the circlesData, assign it a null output,
    // otherwise, output the circles
    !circlesData
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

        // handle the output of the image
        let elementImage = profileImage != '../../../images/blank-profile-pic.png'
          ? {uri: profileImage} 
          : require('../../../images/blank-profile-pic.png');

        circleElement = 
          <TouchableHighlight key={circle} onPress={ () => app.goToScene('EditChild', {app, childId: circle})} >
            <Image source={elementImage} resizeMode='cover' style={style.teaserElement} />
          </TouchableHighlight>

        circlesOutput.push(circleElement);
      }

      // if circlesOutput is empty after the array, fill it with a value
      // this is to prevent the react-slick slider from throwing an undefined error
      circlesOutput = circlesOutput == [] ? [] : circlesOutput;
    }

    const { title, path, app } = props

    return(
      <View style={style.container}>
        { title && <Text style={style.title}>{title}</Text> }
        <View style={style.circleGroup}>
          <Carousel
            ref={(carousel) => { this._carousel = carousel; }}
            sliderWidth={35}
            itemWidth={35}
            inactiveSlideScale={1}
          >
            {circlesOutput}
          </Carousel>
          {
            props.hasAddButton &&
              <LinearGradient
                colors={[styleVariables.mc2purpleElectric, styleVariables.mc2BlueElectric]} 
                style={[globalStyles.addItem, style.addItem]}
              >
                <Link textStyles={[style.addItemText]} onClick={ () => app.goToScene('CreateChild', {app})} text='+' />
              </LinearGradient>
          }
        </View>
      </View>
    )
  } 
};

export default CirclesTeaser;