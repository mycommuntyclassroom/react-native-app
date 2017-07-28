import React from 'react';
import {
  View,
  TouchableHighlight,
  Text,
  Image
} from 'react-native';

import style from './style';

const BackButton = (props) => {
  // if there is no path designated for this button, default to going to the Dashboard
  let link;

  const { app, customStyles } = props;

  props.scene 
    ? link = () => app.goToScene(props.scene, {app})
    : link = () => app.goToScene('Dashboard', {app}) 

  return(
    <View style={[ style.container, customStyles || {}]}> 
      <TouchableHighlight onPress={link}>
        <Image
          source={require('../../../images/back-arrow.png')}
          resizeMode='contain' 
          style={{width:60, height: 30}} />
      </TouchableHighlight>
    </View>
  )
};

export default BackButton;
