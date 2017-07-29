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
import { checkRelationship } from '../../helpers/user';

class CirclesTeaser extends Component {
  static PropTypes={
    circlesData: PropTypes.object,
    title: PropTypes.str,
    path: PropTypes.str
  };

  render(){ 

    const props = this.props;
    const { globalStyles, app, title, path } = props;
    let circlesData = props.circlesData || [' '];

    // check the viewer is a friend
    friendStatus = checkRelationship('friend', app.props, props.gid);

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
          <View style={style.noChildBooked}>
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
    if (circlesData && friendStatus || props.gid === app.props.auth.uid) 
    {
      generateCircles();   
    } 
    else 
    {
      circlesOutput = nullOutput
    }

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

    return(
      <View style={[style.container, props.customStyles || {}] }>
        { (title && friendStatus) && <Text style={style.title}>{title}</Text> }
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
              <TouchableHighlight onPress={ () => app.goToScene('CreateChild', {app})}>
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
          }
        </View>
      </View>
    )
  } 
};

export default CirclesTeaser;