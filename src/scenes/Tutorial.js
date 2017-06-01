import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
  Text,
  Image
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Button from '../components/Button';

import Dimensions from 'Dimensions';

class Tutorial extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nextBtnName: 'Continue'
    };

    this.next = this.next.bind(this)
  }

  componentDidMount() {
    console.log('mounted Tutorial', this.props);
  }

  next() {
    // progress the slider by the index value
    this.slider.slickNext();
  }

  render() {
    let tutorial   = this;
    const { style, app } = this.props;
    const settings = {
      dots          : true,
      dotsClass     : 'pager',
      arrows        : false,
      infinite      : false,
      speed         : 500,
      slidesToShow  : 1,
      slidesToScroll: 1,
      beforeChange  : function (currentSlide, nextSlide) {
        var totalSlides = tutorial.slider.innerSlider.state.slideCount;
        // Navigate to dashboard on the last slide
        if(currentSlide !== 0 && currentSlide === nextSlide) {
          console.log(browserHistory.push('/dashboard'));
        }
        // Change text on second to last slide
        if(currentSlide !== 0 && nextSlide === (totalSlides - 1)) {
          tutorial.setState({nextBtnName: 'Get Started'})
        } else {
          tutorial.setState({nextBtnName: 'Continue'})
        }

      }
    };

    const deviceWidth = Dimensions.get('window').width;
    const deviceHeight = Dimensions.get('window').height;
    const imageDimensions = {width: deviceWidth, height: deviceHeight };
    console.log('deviceWidth: ', deviceWidth)
    console.log('deviceHeight: ', deviceHeight)

    return (
      <View style={{ backgroundColor: 'white' }}>
          <Text>HELLO</Text>
        <Carousel
          ref={(carousel) => { this._carousel = carousel; }}
          sliderWidth={deviceWidth}
          itemWidth={deviceWidth}
          style={{ display: 'none', justifyContent: 'flex-start', alignItems: 'flex-start'}}
        >
          <View><Image source={require('../../images/intro-tut-card-0.png')} resizeMode='contain' style={imageDimensions} /></View>
          <View><Image source={require('../../images/intro-tut-card-1.png')} resizeMode='contain' style={imageDimensions} /></View>
          <View><Image source={require('../../images/intro-tut-card-2.png')} resizeMode='contain' style={imageDimensions} /></View>
          <View><Image source={require('../../images/intro-tut-card-3.png')} resizeMode='contain' style={imageDimensions} /></View>
          <View><Image source={require('../../images/intro-tut-card-4.png')} resizeMode='contain' style={imageDimensions} /></View>
          <Button text={this.state.nextBtnName} onPress={ () => {this.next} }></Button>
        </Carousel>
      </View>
    );
  }
}

export default Tutorial;