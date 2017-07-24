import React from 'react';
import {
  View,
  TouchableHighlight,
  Text,
  Image
} from 'react-native';

const BackButton = (props) => {
  console.log('BackButton props: ',  props)
  // if there is no path designated for this button, default to going to the Dashboard
  let link;

  const { app } = props;

  props.scene 
    ? link = () => app.goToScene(props.scene, {app})
    : link = () => app.goToScene('Dashboard', {app}) 

  return(
    <View className="back-button" style={{position: 'absolute', top:0, left: 0}}> 
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
