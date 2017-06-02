import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
  Text,
  Image
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Button from '../components/Button';
import { deviceDimensions } from '../styles';

class Tutorial extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nextBtnName: 'Continue',
      slideIndex: 0
    };

    this.next = this.next.bind(this)
  }

  componentDidMount() {
    // console for sanity check troubleshooting
    console.log('mounted Tutorial', this.props);
  }

  next(slideIndex) {
    const { app } = this.props;
    this.state.slideIndex === 4 
      // progress the slider by the index value
      ? app.goToScene('Dashboard', {app})
      // go to the dashboard scene
      : this._carousel.snapToNext()
  }

  render() {

    console.log('***TUT rendered***!!!: deviceDimensions: ', deviceDimensions)
    const { style, app } = this.props;

    const getSlideIndex = (slideIndex) => {
      // update the state with the index of the slider
      this.setState({slideIndex});
      slideIndex === 4 && this.setState({nextBtnName: 'Get Started'})
    }

    const imageDimensions = { width: deviceDimensions.deviceWidth, height: 500 };

    return (
      <View style={{ height:'100%', backgroundColor: '#74bcf7' }}>
        <Carousel
          ref={(carousel) => { this._carousel = carousel; }}
          sliderWidth={deviceDimensions.deviceWidth}
          itemWidth={deviceDimensions.deviceWidth}
          onSnapToItem={(slideIndex) => { getSlideIndex(slideIndex) }}
        >
          <View><Image source={require('../../images/intro-tut-card-0.png')} resizeMode='contain' style={imageDimensions} /></View>
          <View><Image source={require('../../images/intro-tut-card-1.png')} resizeMode='contain' style={imageDimensions} /></View>
          <View><Image source={require('../../images/intro-tut-card-2.png')} resizeMode='contain' style={imageDimensions} /></View>
          <View><Image source={require('../../images/intro-tut-card-3.png')} resizeMode='contain' style={imageDimensions} /></View>
          <View><Image source={require('../../images/intro-tut-card-4.png')} resizeMode='contain' style={imageDimensions} /></View>
        </Carousel>
        <Button text={this.state.nextBtnName} onPress={ (slideIndex) => {this.next(slideIndex)} }></Button>
      </View>
    );
  }
}

export default Tutorial;