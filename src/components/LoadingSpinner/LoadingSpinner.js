import React, { Component } from 'react';
import {
  View,
  Animated,
  Easing,
  TouchableHighlight,
  Text
} from 'react-native';

import style from './style';

class LoadingSpinner extends Component {

  constructor() {
    super();

    this.state = {
      spinValue: new Animated.Value(0),  // Initial value for opacity: 0
    }

    this.runAnimation = this.runAnimation.bind(this);
  }

  componentDidMount() {
    this.runAnimation();
  }

  runAnimation() {
    // reset the value of spinValue to zero for infinite spinning 
    this.state.spinValue.setValue(0);

    // run the spinning animation for the loading icon
    Animated.timing(
      this.state.spinValue,
      {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear
      }
    ).start(() => this.runAnimation()) // loop animation
  }

  render() {
    const { globalStyles } = this.props;
    const spin = this.state.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    })

    return (
      <View style={[style.container]}>
        <Animated.Image
          style={{transform: [{rotate: spin}], width: 300 }}
          source={require('../../../images/logo.png')} 
          resizeMode='contain'
        />
      </View>
    );
  };

}

export default LoadingSpinner;
