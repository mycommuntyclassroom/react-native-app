import React from 'react';
import {
  View,
  TouchableHighlight,
  Text
} from 'react-native';

const BackButton = (props) => {

  // if there is no path designated for this button, default to going back to the previous page
  let link;
  const { app } = props;

  props.path 
    ? link = () => app.goToScene(props.scene, {app})
    : link = () => app.goToScene('Dashboard', {app}) 

  return(
    <View className="back-button"> 
      <TouchableHighlight onClick={link}>
        <Text> TiArrowLeft </Text>
      </TouchableHighlight>
    </View>
  )
};

export default BackButton;
