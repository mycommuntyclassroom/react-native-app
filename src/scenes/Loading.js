import React, { Component } from 'react';
import {
  View,
  Animated,
  Easing,
  TouchableHighlight,
  Text
} from 'react-native';

class Loading extends Component {

  constructor() {
    super();

    this.state = {
      spinValue: new Animated.Value(0),  // Initial value for opacity: 0
    }

    this.runAnimation = this.runAnimation.bind(this);
  }

  componentDidMount() {
    console.log('mounted Loading', this.props);
    this.runAnimation();
  }

  runAnimation() {
    console.log('runAnimation Called!')
    Animated.timing(
      this.state.spinValue,
      {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear
      }
    ).start()
  }

  render() {
    const { globalStyles, app } = this.props;
    const spin = this.state.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    })

    return (
      <View style={[globalStyles.container, { backgroundColor: 'aqua' }]}>
        <Animated.Image
          style={{transform: [{rotate: spin}] }}
          source={require('../../images/logo.png')} 
          resizeMode='contain'
        />
      </View>
    );
  };

}

export default Loading;
