import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
  Text,
  Image
} from 'react-native';
import { IndicatorViewPager, PagerDotIndicator } from 'rn-viewpager'
import Button from '../components/Button';
import { deviceDimensions } from '../styles';

class Tutorial extends Component {
  constructor(props) {
    super(props);
  }

  _renderDotIndicator () {
    return <PagerDotIndicator pageCount={5}
                              selectedDotStyle={{width: 13, borderRadius: 6, backgroundColor: '#fff'}}
                              dotStyle={{width:5, height:5, borderRadius:2.5,margin:5,borderWidth:1,
                              borderColor:'hsla(0,0%,100%,.5)', backgroundColor:'transparent' }}/>
  }

  render() {

    const { app } = this.props;
    const imageDimensions = { width: deviceDimensions.deviceWidth, height: 500 };

    return (
      <View style={{ height:'100%', backgroundColor: '#74bcf7', paddingTop:50, paddingBottom:20}}>
        <IndicatorViewPager
          style={{flex:0.8}}
          indicator={this._renderDotIndicator()}
        >
          <View><Image source={require('../../images/intro-tut-card-0.png')} resizeMode='contain' style={imageDimensions} /></View>
          <View><Image source={require('../../images/intro-tut-card-1.png')} resizeMode='contain' style={imageDimensions} /></View>
          <View><Image source={require('../../images/intro-tut-card-2.png')} resizeMode='contain' style={imageDimensions} /></View>
          <View><Image source={require('../../images/intro-tut-card-3.png')} resizeMode='contain' style={imageDimensions} /></View>
          <View><Image source={require('../../images/intro-tut-card-4.png')} resizeMode='contain' style={imageDimensions} />
            <View style={{ margin: 20 }}><Button text='Get Started' onPress={() => app.goToScene('Dashboard', {app}) }></Button></View>
          </View>
        </IndicatorViewPager>
      </View>
    );
  }
}

export default Tutorial;